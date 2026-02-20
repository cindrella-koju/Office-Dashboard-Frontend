import type { ToastType } from "../components/Toast";
import { CREATE_EVENT_ROLE, DELETE_EVENT_ROLE, EDIT_EVENT_ROLE, RETRIEVE_EVENT_ROLE, RETRIEVE_EVENT_ROLE_BY_ROLEID } from "../constants/urls"
import type { EventRole, EventRoleResponse } from "../type/eventrole.type";
import { authFetch } from "./authHeaders"

export const getEventRole = async(eventId : string):Promise<EventRoleResponse[]> => {
    try{
        const response = await authFetch(RETRIEVE_EVENT_ROLE(eventId));
        if(!response.ok){
            throw new Error("Retrieve Event Role Request Failed")
        }
        return (await response.json()) as EventRoleResponse[];
    } catch(err){
        console.error("Error fetching Event Role:", err)
        throw err;
    }
}

export const getEventRoleByRoleId = async(eventId : string, roleId : string):Promise<EventRoleResponse[]> => {
    try{
        const response = await authFetch(RETRIEVE_EVENT_ROLE_BY_ROLEID(eventId, roleId));
        if(!response.ok){
            throw new Error("Retrieve Event Role Request Failed")
        }
        return (await response.json()) as EventRoleResponse[];
    } catch(err){
        console.error("Error fetching Event Role:", err)
        throw err;
    }
}

export const createEventRole = async(payload:EventRole,eventId : string, showToast: (msg: string, type?: ToastType) => void ) => {
    try{
        const response = await authFetch(CREATE_EVENT_ROLE(eventId),{
            method : "POST",
            body : JSON.stringify(payload)
        })
        const data = await response.json()
        if(!response.ok){
            const message = data?.detail || "Failed to create Event Role";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Event created successfully!", "success");
        return data;
    } catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
}

export const editEventRole = async(payload : Partial<EventRole>, eventRoleID : string, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await authFetch(`${EDIT_EVENT_ROLE(eventRoleID)}`,{
            method: "PUT",
            body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update Event Role";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Event Role updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}

export const deleteEventRole = async(eventRoleId : string, showToast: (msg: string, type?: ToastType) => void) => {
     try{
        const res = await authFetch(`${DELETE_EVENT_ROLE(eventRoleId)}`,{
            method: "DELETE",
        })

        const data = await res.json()
    
        if (!res.ok) {
            const message = data?.detail || "Failed to Delete Event Role";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }
    
        showToast(data?.message || "Event Role Deleted successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}