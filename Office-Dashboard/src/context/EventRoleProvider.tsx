import { RETRIEVE_PERMISSION_WITHIN_EVENT, RETRIEVE_PERMISSION_WITHIN_EVENT_BY_USER_ID } from "../constants/urls"
import useFetch from "../hooks/useFetch"
import { EventRoleContext } from "./EventRoleContext"

export const EventRoleProvider = ({children} : { children: React.ReactNode }) => {
    const userId = localStorage.getItem("user_id")
    const eventId = localStorage.getItem("eventId")

    console.log("EventRole Provider Working:")


    const url = userId ? (eventId ? RETRIEVE_PERMISSION_WITHIN_EVENT(userId, eventId) : RETRIEVE_PERMISSION_WITHIN_EVENT_BY_USER_ID(userId)) : ""
    const {data : eventRoleDetail, loading, error } = useFetch(url) 
    if (loading) return null;
    if (error) return null;

    console.log("EventDetail:",eventRoleDetail)
    return(
        <EventRoleContext.Provider value={eventRoleDetail}>
            {children}
        </EventRoleContext.Provider>
    )
}