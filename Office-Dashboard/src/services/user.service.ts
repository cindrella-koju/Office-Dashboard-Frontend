import type { ToastType } from "../components/Toast";
import { CREATE_USER, DELETE_USER, RETRIEVE_ROLE_ID_NAME, RETRIEVE_ROLE_ID_NAME_NOT_IN_EVENT, RETRIEVE_USERS, UPDATE_USER } from "../constants/urls"
import type { Round } from "../type/group.type";
import type { AddUser, UserDetail } from "../type/user.type";
import { authFetch } from "./authHeaders";


export const getUser = async (): Promise<UserDetail[]> => {
    try {
        const response = await authFetch(RETRIEVE_USERS);
        if (!response.ok) {
            throw new Error(`Retrieve User Request Failed`);
        }
        return (await response.json()) as UserDetail[];
    } catch (err) {
        console.error("Error fetching users:", err);
        throw err;
    }
};

export const getRoleNotInEvent = async():Promise<Round[]> => {
    const response = await authFetch(RETRIEVE_ROLE_ID_NAME_NOT_IN_EVENT)
    if(!response.ok){
        throw new Error("Retrieve Round Not In Event Request Failed")
    }
    return response.json()
}

export const getRoleInEvent = async() => {
    const response = await authFetch(RETRIEVE_ROLE_ID_NAME)
    if(!response.ok){
        throw new Error("Retrieve Role In Event Request Failed")
    }
    return response.json()
}

export const createUser = async (
  payload: AddUser,
  showToast: (msg: string, type?: ToastType) => void
) => {
  try {
    const response = await authFetch(CREATE_USER, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.detail || "Failed to create user";
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

export const updateUser = async (id: string, payload: Partial<AddUser>, showToast: (msg: string, type?: ToastType) => void) => {
  try {
    const res = await authFetch(`${UPDATE_USER(id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    const data = await res.json()

    if (!res.ok) {
      const message = data?.detail || "Failed to update user";
      showToast(message, "error");
      return Promise.reject(new Error(message));
    }

    showToast(data?.message || "User updated successfully!", "success");
    return data;
  } catch (error) {
    showToast((error as Error).message, "error");
    throw error;
  }
};


export const deleteUser = async( id : string, showToast: (msg: string, type?: ToastType)=> void) => {
  try {
    const res = await authFetch(`${DELETE_USER(id)}`, {
      method: "DELETE",
    });

    const data = await res.json()

    if (!res.ok) {
      const message = data?.detail || "Failed to Delete user";
      showToast(message, "error");
      return Promise.reject(new Error(message));
    }

    showToast(data?.message || "User Deleted successfully!", "success");
    return data;
  } catch (error) {
    showToast((error as Error).message, "error");
    throw error;
  }
}