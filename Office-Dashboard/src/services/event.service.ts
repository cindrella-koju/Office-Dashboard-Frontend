import type { ToastType } from "../components/Toast";
import { CREATE_EVENT, DELETE_EVENT, RETRIEVE_EVENT, UPDATE_EVENT } from "../constants/urls"
import type { Event, EventResponse } from "../type/event.type";
import { authFetch } from "./authHeaders";

export const getEvent = async():Promise<EventResponse[]> => {
    try{
        const response = await authFetch(RETRIEVE_EVENT);
        if(!response.ok){
            throw new Error("Retrieve Event Request Failed")
        }
        return (await response.json())as EventResponse[];
    } catch(err){
        console.error("Error fetching Events:", err)
        throw err;
    }
}

export const createEvent = async( payload : Event, showToast: (msg: string, type?: ToastType) => void ) => {
    try{
        const response = await authFetch(CREATE_EVENT, {
            method: "POST",
            body: JSON.stringify(payload),
        })

        const data = await response.json()
        if(!response.ok){
            const message = data?.detail || "Failed to create event";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "User created successfully!", "success");
        return data;
    } catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
};

export const updateEvent = async(id: string, payload:Partial<Event>, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await authFetch(`${UPDATE_EVENT(id)}`,{
            method: "PATCH",
            body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update event";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Event updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}

export const deleteEvent = async(id : string, showToast: (msg: string, type?: ToastType)=> void) => {
      try {
        const res = await authFetch(`${DELETE_EVENT(id)}`, {
          method: "DELETE",
        });
    
        const data = await res.json()
    
        if (!res.ok) {
          const message = data?.detail || "Failed to Delete Event";
          showToast(message, "error");
          return Promise.reject(new Error(message));
        }
    
        showToast(data?.message || "Event Deleted successfully!", "success");
        return data;
      } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
      }
}