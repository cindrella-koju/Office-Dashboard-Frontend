import { RETRIEVE_PERMISSION_WITHIN_EVENT } from "../constants/urls"
import useFetch from "../hooks/useFetch"
import { EventRoleContext } from "./EventRoleContext"

const eventId = "9416e4bc-c260-45c4-a5ed-d453b58c1bf6"
const userId = "ae347041-c28c-43ea-aee2-16b7ebecc7b0"
export const EventRoleProvider = ({children} : { children: React.ReactNode }) => {
    const {data : eventRoleDetail, loading, error } = useFetch(RETRIEVE_PERMISSION_WITHIN_EVENT(userId, eventId)) 
    if (loading) return null;
    if (error) return null;

    console.log("EventDetail:",eventRoleDetail)
    return(
        <EventRoleContext.Provider value={eventRoleDetail}>
            {children}
        </EventRoleContext.Provider>
    )
}