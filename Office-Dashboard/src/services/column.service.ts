import type { ColumnDetail } from "../components/Model/StandingColumnModel";
import type { ToastType } from "../components/Toast";
import { ADD_STANDING_COLUMN, DELETE_STANDING_COLUMN, EDIT_STANDING_COLUMN } from "../constants/urls";
import { authFetch } from "./authHeaders";

export const createStandingColumn = async( payload : ColumnDetail, showToast: (msg: string, type?: ToastType) => void ) => {
    try{
        const response = await authFetch(ADD_STANDING_COLUMN,{
            method : "POST",
            body: JSON.stringify(payload),
        })

        const data = await response.json()
        if(!response.ok){
            const message = data.detail || "Failed to create Column";
            showToast(message, "error");
            return Promise.reject(new Error(message))
        }

        showToast(data.message || "Column created successfully","success");
        return data;
    } catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
}

export const updateStandingColumn = async(columnId : string, payload : ColumnDetail,showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await authFetch(`${EDIT_STANDING_COLUMN(columnId)}`,{
            method : "PATCH",
            body: JSON.stringify(payload)
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update Column Detail";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Column Detail updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}

export const deleteStandingColumn = async(columnId : string, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await authFetch(`${DELETE_STANDING_COLUMN(columnId)}`,{
            method : "DELETE",
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to delete Column";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Column deleted successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}