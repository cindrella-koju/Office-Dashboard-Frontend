import { PROFILE_PAGE } from "../constants/urls"
import type { ProfileDetail } from "../pages/ProfilePage";
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