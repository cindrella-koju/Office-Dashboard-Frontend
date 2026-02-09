import { LOGIN } from "../constants/urls";

export interface LoginData{
    username : string;
    password : string;
}

export const LoginServices = async(data:LoginData) => {
    const response = await fetch(LOGIN, {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data),
    })

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.detail || "Login failed");
    }

    sessionStorage.setItem("access_token", result.access_token);
    localStorage.setItem("refresh_token", result.refresh_token);

    return result
}