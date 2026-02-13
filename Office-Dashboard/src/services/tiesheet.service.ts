import type { SelectedMatch } from "../components/Model/TiesheetModel";
import type { ToastType } from "../components/Toast";
import { CREATE_TIESHEET, GET_TIESHEET_BY_ID, RETRIEVE_STANDING_COLUMN, RETRIEVE_TIESHEET, UPDATE_TIESHEET } from "../constants/urls"
import type { StandingColumnType } from "../type/standingcolumn.type";
import type { TiesheetType } from "../type/tiesheet.type";

export const getTiesheet = async(eventId : string):Promise<TiesheetType[]> => {
    try{
        const response = await fetch(RETRIEVE_TIESHEET(eventId));
        if(!response.ok){
            throw new Error("Retrieve Tiesheet Request Failed")
        }
        return (await response.json()) as TiesheetType[];
    }  catch(err){
        console.error("Error fetching Tiesheet:", err)
        throw err;
    }
}

export const getTiesheetById = async(matchId : string) => {
    try{
        const response = await fetch(GET_TIESHEET_BY_ID(matchId));
        if(!response.ok){
            throw new Error("Retrieve Tiesheet by Id Request Failed")
        }
        return response.json();
    }  catch(err){
        console.error("Error fetching  Tiesheet by Id:", err)
        throw err;
    }
}
export const getStandingColumn = async(roundId : string):Promise<StandingColumnType[]> => {
    try{
        const response = await fetch(RETRIEVE_STANDING_COLUMN(roundId));
        if(!response.ok){
            throw new Error("Retrieve Standing Column Request Failed")
        }
        return (await response.json()) as StandingColumnType[];
    }  catch(err){
        console.error("Error fetching Standing Column:", err)
        throw err;
    }
}

export const createTiesheet = async( payload : SelectedMatch,  showToast: (msg: string, type?: ToastType) => void  ) => {
    try{
        const response = await fetch(CREATE_TIESHEET,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const data = await response.json()
        if(!response.ok){
            const message = data?.detail || "Failed to create Tiesheet";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Tiesheet created successfully!", "success");
        return data;
    } catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
}

export const updateTiesheet = async(matchId : string, payload : SelectedMatch,showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await fetch(`${UPDATE_TIESHEET(matchId)}`,{
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update Tiesheet";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Tiesheet updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}