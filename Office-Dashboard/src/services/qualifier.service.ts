import type { User } from "../components/Model/ParticipantsModel";
import type { ToastType } from "../components/Toast";
import { ADD_QUALIFIER, DELETE_QUALIFIER, RETRIEVE_QUALIFIER_BY_EVENT, RETRIEVE_QUALIFIER_BY_ROUND, RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER } from "../constants/urls";
import type { TiesheetQualifierResponse } from "../hooks/tiesheet/useTiesheet";
import type { Participant, QualifierPayload, QualifierResponse } from "../type/qualifier.type";
import { authFetch } from "./authHeaders";

export const getQualifier = async(eventId : string):Promise<QualifierResponse[]> => {
    try{
        const response = await authFetch(RETRIEVE_QUALIFIER_BY_EVENT(eventId))
        if(!response.ok){
            throw new Error("Retrieve Qualifier Request Failed")
        }
        return (await response.json()) as QualifierResponse[]
    } catch(err){
        console.error("Error fetching Qualifier Detail:", err)
        throw err; 
    }
}

export const getQualifierByRound = async(roundID : string) : Promise<TiesheetQualifierResponse[]> => {
    try{
        const response = await authFetch(RETRIEVE_QUALIFIER_BY_ROUND(roundID))
        if(!response.ok){
            throw new Error("Retrieve Qualifier By Round Request Failed")
        }
        return (await response.json()) as TiesheetQualifierResponse[]
    } catch(err){
        console.error("Error fetching Qualifier By Round Detail:", err)
        throw err; 
    }
}

export const getUserNotInQualifier = async(eventId : string, roundID : string) :Promise<User[]> => {
    try{
        const response = await authFetch(RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER(eventId, roundID))
        if(!response.ok){
            throw new Error("Retrieve User Not In Qualifier Request Failed")
        }
        return (await response.json()) as User[]
    } catch(err){
        console.error("Error fetching User Not In Qualifier Detail:", err)
        throw err; 
    }
}

export const createQualifier = async(eventId : string, roundId : string, payload : QualifierPayload, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const response = await authFetch(ADD_QUALIFIER(eventId, roundId),{
            method : "POST",
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if(!response.ok){
            const message = data?.detail || data?.message || "Failed to create Qualifier";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Qualifier created successfully!", "success");
        return data;
    } catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
}

export const deleteQualifier = async(qualifier_id : string,showToast: (msg: string, type?: ToastType)=> void) => {
    try {
        const res = await authFetch(`${DELETE_QUALIFIER(qualifier_id)}`, {
            method: "DELETE",
        });
    
        const data = await res.json()
    
        if (!res.ok) {
            const message = data?.detail || "Failed to Delete Qualifier";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }
    
        showToast(data?.message || "Qualifier Deleted successfully!", "success");
        return data;
        } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
        }
}