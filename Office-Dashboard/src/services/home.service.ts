import { RETRIEVE_HOME, RETRIEVE_RECENT_FIVE_EVENT } from "../constants/urls";
import type { HomePageEventResponse, HomePageResponse } from "../type/home.type";

import { authFetch } from "./authHeaders";

export const getHomePage = async() : Promise<HomePageResponse> => {
    try{
        const response = await authFetch(RETRIEVE_HOME);
        if(!response.ok){
            throw new Error("Retrieve home data request failed")
        }
        return (await response.json()) as HomePageResponse
    } catch(err){
        console.error("Error fetching Home Detail:", err)
        throw err;
    }
}

export const getHomePageEvent = async() : Promise<HomePageEventResponse[]> => {
    try{
        const response = await authFetch(RETRIEVE_RECENT_FIVE_EVENT);
        if(!response.ok){
            throw new Error("Retrieve home data request failed")
        }
        return (await response.json()) as HomePageEventResponse[]
    } catch(err){
        console.error("Error fetching Home Detail:", err)
        throw err;
    }
}