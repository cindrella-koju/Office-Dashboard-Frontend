import { useEffect, useState, useCallback } from "react";
import { getPermissionWithinEvent, getPermissionWithinEventByUser } from "../services/eventprovider.service";
import { EventRoleContext } from "./EventRoleContext";

const EVENT_ROLE_REFRESH_INTERVAL = 15000; // Refresh every 15 seconds for faster updates

export const EventRoleProvider = ({children} : { children: React.ReactNode }) => {
    const [eventRoleDetail, setEventRoleDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchEventRoleDetail = useCallback(async () => {
        const userId = localStorage.getItem("user_id");
        const eventId = localStorage.getItem("eventId");

        if (!userId) {
            setLoading(false);
            return;
        }

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
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchEventRoleDetail();
    }, [fetchEventRoleDetail]);

    // Periodic refresh to catch permission changes
    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;

        // Initial check after a short delay
        const initialCheck = setTimeout(() => {
            fetchEventRoleDetail();
        }, 2000);

        const intervalId = setInterval(() => {
            fetchEventRoleDetail();
        }, EVENT_ROLE_REFRESH_INTERVAL);

        return () => {
            clearTimeout(initialCheck);
            clearInterval(intervalId);
        };
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