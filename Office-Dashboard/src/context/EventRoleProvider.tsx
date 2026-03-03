import { useEffect, useState, useCallback, useRef } from "react";
import { getPermissionWithinEvent, getPermissionWithinEventByUser } from "../services/eventprovider.service";
import { EventRoleContext } from "./EventRoleContext";

const EVENT_ROLE_REFRESH_INTERVAL = 30000;

export const EventRoleProvider = ({children} : { children: React.ReactNode }) => {
    const [eventRoleDetail, setEventRoleDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const isRequestInProgressRef = useRef(false);
    const isTabVisibleRef = useRef(true);

    const fetchEventRoleDetail = useCallback(async () => {
        const userId = localStorage.getItem("user_id");
        const eventId = localStorage.getItem("eventId");

        if (!userId) {
            setLoading(false);
            return;
        }

        if (isRequestInProgressRef.current) return;
        isRequestInProgressRef.current = true;

        try {
            let data;
            if (eventId) {
                data = await getPermissionWithinEvent(userId, eventId);
            } else {
                data = await getPermissionWithinEventByUser(userId);
            }
            setEventRoleDetail(data);
        } catch (error) {
            console.error("Failed to fetch event role detail:", error);
            setEventRoleDetail(null);
        } finally {
            setLoading(false);
            isRequestInProgressRef.current = false;
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchEventRoleDetail();
    }, [fetchEventRoleDetail]);

    // Periodic refresh - only when tab is visible
    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;

        const initialCheck = setTimeout(() => {
            fetchEventRoleDetail();
        }, 3000);

        const intervalId = setInterval(() => {
            if (isTabVisibleRef.current) {
                fetchEventRoleDetail();
            }
        }, EVENT_ROLE_REFRESH_INTERVAL);

        return () => {
            clearTimeout(initialCheck);
            clearInterval(intervalId);
        };
    }, [fetchEventRoleDetail]);

    // Track tab visibility - don't poll when tab is hidden
    useEffect(() => {
        const handleVisibilityChange = () => {
            isTabVisibleRef.current = document.visibilityState === 'visible';
            if (isTabVisibleRef.current) {
                const userId = localStorage.getItem("user_id");
                if (userId) fetchEventRoleDetail();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [fetchEventRoleDetail]);

    // Listen for storage events and role updates
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'eventId' || e.key === 'user_id' || e.key === 'role_id') {
                fetchEventRoleDetail();
            }
        };

        const handleRoleUpdate = () => {
            fetchEventRoleDetail();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('roleUpdated', handleRoleUpdate);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('roleUpdated', handleRoleUpdate);
        };
    }, [fetchEventRoleDetail]);

    if (loading) return null;

    return(
        <EventRoleContext.Provider value={eventRoleDetail}>
            {children}
        </EventRoleContext.Provider>
    )
}