import type { ToastType } from "../components/Toast";
import {
  CREATE_ROLE_WITH_PERMISSION,
  DELETE_ROLE,
  EDIT_DETAIL_FOR_ROLE_MANAGEMENT,
  RETRIEVE_ALL_ROLE_ID_NAME,
  RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT,
  RETRIEVE_ROLE_DETAIL,
} from "../constants/urls";
import { authFetch } from "./authHeaders";

export interface RolePayload {
  id?: string
  rolename: string;
  can_edit: boolean;
  can_create: boolean;
  can_delete: boolean;
  can_edit_events: boolean;
  can_create_events: boolean;
  can_delete_events: boolean;
  can_edit_users: boolean;
  can_create_users: boolean;
  can_delete_users: boolean;
  can_edit_roles: boolean;
  can_create_roles: boolean;
  can_delete_roles: boolean;
  roleaccessdetail: Record<string, boolean>;
}

export const roleService = {
    async getRole(filterfor: string){
        try{
            const response = await authFetch(RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT(filterfor));
            if(!response.ok){
                throw new Error("Retrieve Role Permission Failed")
            }
            return response.json()
        }catch(err){
            console.error("Error fetching Role permission:", err)
            throw err;
        }
    },

    async getAllRole(){
        try{
            const response = await authFetch(RETRIEVE_ALL_ROLE_ID_NAME);
            if(!response.ok){
                throw new Error("Retrieve All Role Failed")
            }
            return response.json()
        }catch(err){
            console.error("Error fetching All Role:", err)
            throw err;
        }
    },

    async getRoleDetail(roleId: string){
        try{
            const response = await authFetch(RETRIEVE_ROLE_DETAIL(roleId));
            if(!response.ok){
                throw new Error("Retrieve Role Detail Failed")
            }
            return response.json()
        }catch(err){
            console.error("Error fetching role detail:", err)
            throw err;
        }
    },

    async createRole(payload: RolePayload,  showToast: (msg: string, type?: ToastType) => void ) {
        try{
            const response = await authFetch(CREATE_ROLE_WITH_PERMISSION, {
                method: "POST",
                body: JSON.stringify(payload),
            });

            const data = await response.json()
            if (!response.ok) {
                const message = data?.detail || "Failed to create Role with Permission";
                showToast(message, "error");
                return Promise.reject(new Error(message));
            }

            showToast(data?.message || "Role with Permission created successfully!", "success");
            return data;
        } catch (error) {
            const errMsg = (error as Error).message || "Something went wrong";
            showToast(errMsg, "error");
            throw error;
        }
    },

    async updateRole(id: string, payload : Partial<RolePayload>, showToast: (msg: string, type?: ToastType) => void) {
        try{
            const response = await authFetch(
                EDIT_DETAIL_FOR_ROLE_MANAGEMENT(id),
                {
                    method: "PUT",
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json()
            if(!response.ok){
                const message = data?.detail || "Failed to update Role Permission";
                showToast(message, "error");
                return Promise.reject(new Error(message));
            }

            showToast(data?.message || "Role Permssion updated successfully!", "success");
            return data;
        } catch (error) {
            showToast((error as Error).message, "error");
            throw error;
        }
    },

    async deleteRole(id : string, showToast: (msg: string, type?: ToastType)=> void){
        try{
            const res = await authFetch(`${DELETE_ROLE(id)}`,{
                method : "DELETE",
            });

            const data = await res.json()

            if (!res.ok) {
                const message = data?.detail || "Failed to Delete Role";
                showToast(message, "error");
                return Promise.reject(new Error(message));
            }
            showToast(data?.message || "Event Deleted successfully!", "success");
            return data;
        }catch (error) {
            showToast((error as Error).message, "error");
            throw error;
        }
    }
};
