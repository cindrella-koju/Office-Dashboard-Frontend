import type { SelectedMatch } from "../components/Model/TiesheetModel";
import type { ToastType } from "../components/Toast";
import { CREATE_MATCH, CREATE_TIESHEET, DELETE_MATCH, DELETE_TIESHEET, EDIT_MATCH, GET_TIESHEET_BY_ID, RETRIEVE_MATCH, RETRIEVE_MATCH_BY_TIESHEET_ID, RETRIEVE_OVERALL_TIESHEET, RETRIEVE_OVERALL_TIESHEET_BY_ROUND, RETRIEVE_STANDING_COLUMN, RETRIEVE_TIESHEET, RETRIEVE_TIESHEET_BY_STAGE, RETRIEVE_TODAY_TIESHEET, UPDATE_TIESHEET } from "../constants/urls"
import type { StandingColumnType } from "../type/standingcolumn.type";
import type { AddMatchProps, TiesheetType } from "../type/tiesheet.type";
import { authFetch } from "./authHeaders";

export const getTiesheet = async(eventId : string):Promise<TiesheetType[]> => {
    try{
        const response = await authFetch(RETRIEVE_TIESHEET(eventId));
        if(!response.ok){
            throw new Error("Retrieve Tiesheet Request Failed")
        }
        return (await response.json()) as TiesheetType[];
    }  catch(err){
        console.error("Error fetching Tiesheet:", err)
        throw err;
    }
}

export const getTiesheetByStage = async(eventId : string, stageId : string):Promise<TiesheetType[]> => {
    try{
        const response = await authFetch(RETRIEVE_TIESHEET_BY_STAGE(eventId, stageId));
        if(!response.ok){
            throw new Error("Retrieve Tiesheet Request Failed")
        }
        return (await response.json()) as TiesheetType[];
    }  catch(err){
        console.error("Error fetching Tiesheet:", err)
        throw err;
    }
}

export const getTodayTiesheet = async(eventId : string):Promise<TiesheetType[]> => {
    try{
        const response = await authFetch(RETRIEVE_TODAY_TIESHEET(eventId));
        if(!response.ok){
            throw new Error("Retrieve Today Tiesheet Request Failed")
        }
        return (await response.json()) as TiesheetType[];
    }  catch(err){
        console.error("Error fetching Today Tiesheet:", err)
        throw err;
    }
}

export const getMatchByTiesheetId = async(tiesheetId : string) => {
    try{
        const response = await authFetch(RETRIEVE_MATCH_BY_TIESHEET_ID(tiesheetId))
        if(!response.ok){
            throw new Error("Retrieve Match By Tiesheet Id Request Failed")
        }
        return await response.json();
    }  catch(err){
        console.error("Error fetching Match By Tiesheet Id :", err)
        throw err;
    }
}

export const getTiesheetById = async(matchId : string) => {
    try{
        const response = await authFetch(GET_TIESHEET_BY_ID(matchId));
        if(!response.ok){
            throw new Error("Retrieve Tiesheet by Id Request Failed")
        }
        return response.json();
    }  catch(err){
        console.error("Error fetching  Tiesheet by Id:", err)
        throw err;
    }
}

export const getMatch = async(tiesheetId : string) => {
    try{
        const response = await authFetch(RETRIEVE_MATCH(tiesheetId));
        if(!response.ok){
            throw new Error("Retrieve Match Request Failed")
        }
        return response.json();
    }  catch(err){
        console.error("Error fetching Match:", err)
        throw err;
    }
}

export const getStandingColumn = async(roundId : string):Promise<StandingColumnType[]> => {
    try{
        const response = await authFetch(RETRIEVE_STANDING_COLUMN(roundId));
        if(!response.ok){
            throw new Error("Retrieve Standing Column Request Failed")
        }
        return (await response.json()) as StandingColumnType[];
    }  catch(err){
        console.error("Error fetching Standing Column:", err)
        throw err;
    }
}

export const getOverallTiesheet = async(eventId : string,page : number, limit : number, roundId?: string) => {
    try{
        const url = roundId 
            ? RETRIEVE_OVERALL_TIESHEET_BY_ROUND(eventId, roundId, page,limit)
            : RETRIEVE_OVERALL_TIESHEET(eventId, page, limit);
        const response = await authFetch(url);
        if(!response.ok){
            throw new Error("Retrieve Overall Tiesheet Request Failed")
        }
        return await response.json();
    }  catch(err){
        console.error("Error fetching Overall Tiesheet:", err)
        throw err;
    }
}

export const createTiesheet = async( payload : SelectedMatch,  showToast: (msg: string, type?: ToastType) => void  ) => {
    try{
        const response = await authFetch(CREATE_TIESHEET,{
            method: "POST",
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

export const createMatch = async( payload : AddMatchProps, showToast: (msg: string, type?: ToastType) => void ) => {
    try{
        const response = await authFetch(CREATE_MATCH,{
            method: "POST",
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if(!response.ok){
            const message = data?.detail || data?.message || "Failed to create Match";
            showToast(message,"error")
            return Promise.reject(new Error(message));
        }
        showToast(data?.message || "Match created successfully!", "success");
        return data;
    } catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
}

export const updateTiesheet = async(matchId : string, payload : SelectedMatch,showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await authFetch(`${UPDATE_TIESHEET(matchId)}`,{
            method: "PUT",
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

export const deleteTiesheet = async(id : string, showToast: (msg: string, type?: ToastType)=> void) => {
    try{
        const res = await authFetch(`${DELETE_TIESHEET(id)}`,{
            method: "DELETE",
        })

        const data = await res.json()
    
        if (!res.ok) {
          const message = data?.detail || "Failed to Delete Tiesheet";
          showToast(message, "error");
          return Promise.reject(new Error(message));
        }
    
        showToast(data?.message || "Tiesheet Deleted successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}

export const deleteMatch = async(id : string, showToast: (msg: string, type?: ToastType)=> void) => {
    try{
        const res = await authFetch(`${DELETE_MATCH(id)}`,{
            method: "DELETE",
        })

        const data = await res.json()
    
        if (!res.ok) {
          const message = data?.detail || "Failed to Delete Match";
          showToast(message, "error");
          return Promise.reject(new Error(message));
        }
    
        showToast(data?.message || "Match Deleted successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}

export const updateMatch = async(payload : AddMatchProps,showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await authFetch(EDIT_MATCH,{
            method: "PUT",
            body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update Match";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Match updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}