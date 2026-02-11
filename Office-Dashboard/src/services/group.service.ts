import type { ToastType } from "../components/Toast";
import { UPDATE_GROUP_TABLE } from "../constants/urls"

export const updateGroupTable = async( groupId : string, payload : any, showToast: (msg: string, type?: ToastType) => void ) => {
    try{
        const res = await fetch(`${UPDATE_GROUP_TABLE(groupId)}`,{
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update Group Table Data";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Group Table Data updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}