import type { ToastType } from "../components/Toast";
import { CREATE_GROUP, DELETE_GROUP, DELETE_GROUP_MEMBER, GET_QUALIFIER_NOT_IN_GROUP, GET_QUALIFIER_NOT_IN_GROUP_FOR_EDIT, RETRIEVE_GROUP_AND_MEMBERS, UPDATE_GROUP, UPDATE_GROUP_TABLE } from "../constants/urls"
import type { Participant, PayloadType, Stage } from "../type/group.type";

export const getGroup = async(eventId : string ):Promise<Stage[]> => {
    try{
        const response = await fetch(RETRIEVE_GROUP_AND_MEMBERS(eventId));
        if(!response.ok){
            throw new Error("Retrieve Group Detail Request Failed")
        }
        return (await response.json()) as Stage[]
    } catch(err){
        console.error("Error fetching Group Detail:", err)
        throw err; 
    }
}

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

export const getQualifierNotInGroup = async(eventId : string, roundId : string):Promise<Participant[]> => {
    try{
        const response = await fetch(GET_QUALIFIER_NOT_IN_GROUP(eventId, roundId));
        if(!response.ok){
            throw new Error("Retrieve Qualifier Not In Group Request Failed")
        }
        return (await response.json())as Participant[];
    } catch(err){
        console.error("Error fetching Qualifier Not In Group:", err)
        throw err;
    }
}

export const getQualifierNotInGroupForEdit = async(eventId : string, roundId : string, groupId : string):Promise<Participant[]> => {
    try{
        const response = await fetch(GET_QUALIFIER_NOT_IN_GROUP_FOR_EDIT(eventId, roundId, groupId));
        if(!response.ok){
            throw new Error("Retrieve Qualifier Not In Group For Edit Request Failed")
        }
        return (await response.json())as Participant[];
    } catch(err){
        console.error("Error fetching Qualifier Not In Group For Edit:", err)
        throw err;
    }
}

export const createGroup = async(eventId : string, payload : PayloadType, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const response = await fetch(CREATE_GROUP(eventId),{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if(!response.ok){
            const message = data?.detail || "Failed to create group";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Group created successfully!", "success");
        return data;
    }catch (error) {
        const errMsg = (error as Error).message || "Something went wrong";
        showToast(errMsg, "error");
        throw error;
    }
}

export const updateGroup = async(groupID : string, payload : PayloadType, showToast: (msg: string, type?: ToastType) => void) => {
    try{
        const res = await fetch(`${UPDATE_GROUP(groupID)}`,{
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (!res.ok) {
            const message = data?.detail || "Failed to update group";
            showToast(message, "error");
            return Promise.reject(new Error(message));
        }

        showToast(data?.message || "Group updated successfully!", "success");
        return data;
    } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
    }
}

export const deleteGroup = async(group_id : string, showToast: (msg: string, type?: ToastType)=> void) => {
      try {
        const res = await fetch(`${DELETE_GROUP(group_id)}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await res.json()
    
        if (!res.ok) {
          const message = data?.detail || "Failed to Delete Group";
          showToast(message, "error");
          return Promise.reject(new Error(message));
        }
    
        showToast(data?.message || "Group Deleted successfully!", "success");
        return data;
      } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
      }
}

export const deleteGroupMember = async(user_id : string, group_id : string, showToast: (msg: string, type?: ToastType)=> void) => {
      try {
        const res = await fetch(`${DELETE_GROUP_MEMBER(user_id, group_id)}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await res.json()
    
        if (!res.ok) {
          const message = data?.detail || "Failed to Delete Group";
          showToast(message, "error");
          return Promise.reject(new Error(message));
        }
    
        showToast(data?.message || "Group Deleted successfully!", "success");
        return data;
      } catch (error) {
        showToast((error as Error).message, "error");
        throw error;
      }
}