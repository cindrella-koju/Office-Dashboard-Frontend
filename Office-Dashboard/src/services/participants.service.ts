import type { User } from "../components/Model/ParticipantsModel";
import type { ToastType } from "../components/Toast";
import { ADD_PARTICIPANTS, DELETE_PARTICIPANTS, RETRIEVE_NOT_PARTICIPANTS, RETRIEVE_PARTICIPANTS } from "../constants/urls";
import type { EventParticipants } from "../pages/event/eventdetailpages/participants";
import { authFetch } from "./authHeaders";

export const getParticipants = async(eventId : string):Promise<EventParticipants> => {
    try{
        const response = await authFetch(RETRIEVE_PARTICIPANTS(eventId))
        if(!response.ok){
            throw new Error("Retrieve Participants Request Failed")
        }
        return (await response.json()) as EventParticipants
    } catch(err){
        console.error("Error fetching Participants Detail:", err);
        throw err;
    }
}

export const getNotParticipants = async(eventID : string):Promise<User[]> => {
    try{
        const response = await authFetch(RETRIEVE_NOT_PARTICIPANTS(eventID))
        if(!response.ok){
            throw new Error("Retrieve User that are not Participants Request Failed")
        }
        return (await response.json()) as User[]
    } catch(err){
        console.error("Error fetching User That are not Participants Detail:", err);
        throw err;
    }
}

export interface ParticipantsPayload{
    user_id : string[]
}
export const createParticipants = async( eventID : string, payload : ParticipantsPayload, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const response = await authFetch(ADD_PARTICIPANTS(eventID),{
            method : "POST",
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if(!response.ok){
            const message = data?.detail || data?.message || "Failed to create Participants";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }
        showToast(data?.message || "Participants created successfully!", "success");
        return data;
    } catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
}

export const deleteParticipants = async(eventID : string, userID : string, showToast: (msg: string, type?: ToastType)=> void) => {
    try{
        const res = await authFetch(`${DELETE_PARTICIPANTS(eventID, userID)}`,{
            method : "DELETE",
        });

        const data = await res.json()

        if (!res.ok) {
          const message = data?.detail || "Failed to Delete Participants";
          showToast(message, "error");
          return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Participants Deleted successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}