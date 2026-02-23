import type { ToastType } from "../components/Toast";
import { CHANGE_PASSWORD, PROFILE_PAGE } from "../constants/urls"
import type { ChangePasswordDetail, ProfileDetail, ProfileEditdetail } from "../pages/ProfilePage";
import { authFetch } from "./authHeaders"

export const getProfilePage = async():Promise<ProfileDetail> => {
    try{
        const response = await authFetch(PROFILE_PAGE);
        if(!response.ok){
            throw new Error("Retrieve Profile Detail Request Failed")
        }
        return (await response.json()) as ProfileDetail
    } catch(err){
        console.error("Error fetching Profile Detail:",err)
        throw err;
    }
}

export const updateProfile = async(payload:ProfileEditdetail, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await authFetch(PROFILE_PAGE, {
            method : "PUT",
            body: JSON.stringify(payload)
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update profile";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Profile updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}

export const changePasswordService = async(payload : ChangePasswordDetail,showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await authFetch(CHANGE_PASSWORD,{
            method : "PATCH",
            body : JSON.stringify(payload)
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to change password";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Password Changed successfully!", "success");
        return data;
    }  catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}