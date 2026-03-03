import { useEffect, useState, useCallback } from "react"
import{ type HomePageResponse, type HomePageEventResponse } from "../type/home.type"
import { getHomePage, getHomePageEvent } from "../services/home.service"

export const useHome = () => {
    const [event,setEvent] = useState<HomePageEventResponse[]>([])
    const  [pagedetail, setPageDetail] = useState<HomePageResponse>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHomeDetail = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getHomePage();
            setPageDetail(data);
            setError(null);
        } catch (err: any) {
            setError(err.detail || err.message || "Failed to load page details");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchHomeEventDetail = useCallback(async () => {
        try {
            const data = await getHomePageEvent();
            setEvent(data);
        } catch (err: any) {
            setError(err.detail || err.message || "Failed to load events");
        }
    }, []);

    useEffect(() => {
        Promise.all([
            fetchHomeDetail(),
            fetchHomeEventDetail()
        ]);
    }, [fetchHomeDetail, fetchHomeEventDetail]);

    return {
        event,
        pagedetail,
        loading,
        error
    }
}   