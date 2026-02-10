import { RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT } from "../constants/urls"

export const getPermissionForRoleManagement = async( id: string) => {
    try{
        const response = await fetch(`${RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT(id)}`);
        if(!response.ok){
                throw new Error("Retrieve Role Management Detail Failed")
            }
            return response.json();
    } catch(err){
        console.error("Error fetching Retrieve Role Management:", err)
        throw err;
    }
}