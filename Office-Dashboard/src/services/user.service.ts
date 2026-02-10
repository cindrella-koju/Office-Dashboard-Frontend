import type { ToastType } from "../components/Toast";
import { CREATE_USER, DELETE_USER, RETRIEVE_ROLE_ID_NAME, RETRIEVE_ROLE_ID_NAME_NOT_IN_EVENT, RETRIEVE_USERS, UPDATE_USER } from "../constants/urls"
import type { Round } from "../type/group.type";
import type { AddUser, UserDetail } from "../type/user.type";

export const getUser = async():Promise<UserDetail[]> => {
    const response = await fetch(RETRIEVE_USERS);
    if (!response.ok) {
        throw new Error("Retrieve User Request Fail")
    }
    return response.json()
}

export const getRoleNotInEvent = async():Promise<Round[]> => {
    const response = await fetch(RETRIEVE_ROLE_ID_NAME_NOT_IN_EVENT)
    if(!response.ok){
        throw new Error("Retrieve Round Not In Event Request Failed")
    }
    return response.json()
}

export const getRoleInEvent = async() => {
    const response = await fetch(RETRIEVE_ROLE_ID_NAME)
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
    const response = await fetch(CREATE_USER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const res = await fetch(`${UPDATE_USER(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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
    const res = await fetch(`${DELETE_USER(id)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
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