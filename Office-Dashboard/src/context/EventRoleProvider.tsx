import { useEffect, useState } from "react";
import { getPermissionWithinEvent, getPermissionWithinEventByUser } from "../services/eventprovider.service";
import { EventRoleContext } from "./EventRoleContext";

export const EventRoleProvider = ({children} : { children: React.ReactNode }) => {
    const [eventRoleDetail, setEventRoleDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        const eventId = localStorage.getItem("eventId");

        console.log("EventRole Provider Working:");

        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchEventRoleDetail = async () => {
            try {
                let data;
                if (eventId) {
                    data = await getPermissionWithinEvent(userId, eventId);
                } else {
                    data = await getPermissionWithinEventByUser(userId);
                }
                setEventRoleDetail(data);
                console.log("EventDetail:", data);
            } catch (error) {
                console.error("Failed to fetch event role detail:", error);
                setEventRoleDetail(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEventRoleDetail();
    }, []);

    if (loading) return null;

    return(
        <EventRoleContext.Provider value={eventRoleDetail}>
            {children}
        </EventRoleContext.Provider>
    )
}