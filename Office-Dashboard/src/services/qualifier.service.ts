import type { ToastType } from "../components/Toast";
import { ADD_QUALIFIER, RETRIEVE_QUALIFIER_BY_EVENT, RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER } from "../constants/urls";
import type { Participant, QualifierPayload, QualifierResponse } from "../type/qualifier.type";

export const getQualifier = async(eventId : string):Promise<QualifierResponse[]> => {
    try{
        const response = await fetch(RETRIEVE_QUALIFIER_BY_EVENT(eventId))
        if(!response.ok){
            throw new Error("Retrieve Qualifier Request Failed")
        }
        return (await response.json()) as QualifierResponse[]
    } catch(err){
        console.error("Error fetching Qualifier Detail:", err)
        throw err; 
    }
}

export const getUserNotInQualifier = async(eventId : string, roundID : string) :Promise<Participant[]> => {
    try{
        const response = await fetch(RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER(eventId, roundID))
        if(!response.ok){
            throw new Error("Retrieve User Not In Qualifier Request Failed")
        }
        return (await response.json()) as Participant[]
    } catch(err){
        console.error("Error fetching User Not In Qualifier Detail:", err)
        throw err; 
    }
}

export const createQualifier = async(eventId : string, roundId : string, payload : QualifierPayload, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const response = await fetch(ADD_QUALIFIER(eventId, roundId),{
            method : "POST",
            headers: { "Content-Type": "application/json" },
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