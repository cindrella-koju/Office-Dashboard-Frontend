import type { ToastType } from "../components/Toast";
import { CREATE_EVENT, DELETE_EVENT, RETRIEVE_EVENT, UPDATE_EVENT } from "../constants/urls"
import type { Event, EventResponse } from "../pages/event/event.type";

export const getEvent = async():Promise<EventResponse[]> => {
    try{
        const response = await fetch(RETRIEVE_EVENT);
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
        const response = await fetch(CREATE_EVENT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        const res = await fetch(`${UPDATE_EVENT(id)}`,{
             method: "PATCH",
            headers: { "Content-Type": "application/json" },
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
        const res = await fetch(`${DELETE_EVENT(id)}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
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