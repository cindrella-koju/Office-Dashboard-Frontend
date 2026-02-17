import type { ToastType } from "../components/Toast";
import { CREATE_ROUND, DELETE_ROUND, EDIT_ROUND, GET_ROUNDS_BY_EVENT, GET_ROUNDS_BY_EVENT_WITH_COLUMN, RETRIEVE_ROUNDS } from "../constants/urls";
import type { Round } from "../type/group.type";
import type { RoundData } from "../type/round.type";


export const getRound = async(eventId:string):Promise<RoundData[]> => {
    try{
        const response = await fetch(RETRIEVE_ROUNDS(eventId));
        if(!response.ok){
            throw new Error("Retrieve Round Request Failed")
        }
        return (await response.json()) as RoundData[];

    } catch(err){
        console.error("Error fetching Rounds:", err)
        throw err;
    }
}

export const createRounds = async(payload : RoundData, eventId:string, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const response = await fetch(CREATE_ROUND(eventId), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const data = await response.json()
        if(!response.ok){
            const message = data?.detail || "Failed to create round";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Round created successfully!", "success");
        return data;
    } catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
}

export const updateRounds = async(round_id : string, payload:Partial<RoundData>, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await fetch(`${EDIT_ROUND(round_id)}`,{
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update Round";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Round updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}

export const deleteRounds = async(round_id : string, showToast: (msg: string, type?: ToastType)=> void) => {
    try{
        const res = await fetch(`${DELETE_ROUND(round_id)}`,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json()
    
        if (!res.ok) {
          const message = data?.detail || "Failed to Delete Round";
          showToast(message, "error");
          return Promise.reject(new Error(message));
        }
    
        showToast(data?.message || "Round Deleted successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
      }
}

export const getRoundByEvent = async(eventId: string) :Promise<Round[]> => {
    try{
        const response = await fetch(GET_ROUNDS_BY_EVENT(eventId))
        if(!response.ok){
            throw new Error("Retrieve Round By Event Request Failed")
        }
        return (await response.json()) as Round[];
    } catch(err){
        console.error("Error fetching Round By Event:", err)
        throw err;
    }
}

export const getRoundByEventWithColumn = async(eventId: string) :Promise<Round[]> => {
    try{
        const response = await fetch(GET_ROUNDS_BY_EVENT_WITH_COLUMN(eventId))
        if(!response.ok){
            throw new Error("Retrieve Round By Event With Column Request Failed")
        }
        return (await response.json()) as Round[];
    } catch(err){
        console.error("Error fetching Round By Event With Column:", err)
        throw err;
    }
}