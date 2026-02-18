import { useEffect, useState } from "react"
import{ type HomePageResponse, type HomePageEventResponse } from "../type/home.type"
import { getHomePage, getHomePageEvent } from "../services/home.service"

export const useHome = () => {
    const [event,setEvent] = useState<HomePageEventResponse[]>([])
    const  [pagedetail, setPageDetail] = useState<HomePageResponse>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHomeDetail = async() => {
        try {
            setLoading(true)
            const data = await getHomePage();
            setPageDetail(data);
        } catch (err:any) {
            setError(err.detail)
        } finally{
            setLoading(false)
        }
    }
    const fetchHomeEventDetail = async() => {
        try {
            setLoading(true)
            const data = await getHomePageEvent();
            setEvent(data);
        } catch (err:any) {
            setError(err.detail)
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchHomeDetail()
        fetchHomeEventDetail()
    },[])

    return{
        event,
        pagedetail,
        loading,
        error
    }
}   