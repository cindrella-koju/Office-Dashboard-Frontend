import { useEffect, useState } from "react"
import { type Round } from "../../type/group.type"
import { getRoundByEvent } from "../../services/round.service";

export const useGroup = () => {
    const eventId = localStorage.getItem("eventId");
    const [rounds, setRounds] = useState<Round[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRoundByEvent = async() => {
        if (!eventId) return;

        try{
            setLoading(true);
            const data = await getRoundByEvent(eventId);
            setRounds(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRoundByEvent()
    },[])

    return{
        rounds,
        loading,
        error
    }
}