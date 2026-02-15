import { RETRIEVE_PERMISSION_WITHIN_EVENT, RETRIEVE_PERMISSION_WITHIN_EVENT_BY_USER_ID } from "../constants/urls"

export const getPermissionWithinEvent = async(userId : string, eventId : string) => {
    try{
        const response = await fetch(RETRIEVE_PERMISSION_WITHIN_EVENT(userId, eventId));
        if(!response.ok){
            throw new Error("Retrieve Permission Within Event Failed")
        }
        return response.json()
    } catch(err){
        console.error("Error fetching Permission By Event:", err)
        throw err;
    }
}

export const getPermissionWithinEventByUser = async(userId: string) => {
    try{
        const response = await fetch(RETRIEVE_PERMISSION_WITHIN_EVENT_BY_USER_ID(userId));
        if(!response.ok){
            throw new Error("Retrieve Permission By User Failed")
        }
        return response.json()
    } catch(err){
        console.error("Error fetching permission by user:", err)
        throw err;
    }
}