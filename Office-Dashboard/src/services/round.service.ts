import type { ToastType } from "../components/Toast";
import { CREATE_ROUND, DELETE_ROUND, EDIT_ROUND, RETRIEVE_ROUNDS } from "../constants/urls";
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