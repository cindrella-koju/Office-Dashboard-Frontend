import { useEffect, useState } from "react"
import type { RoundData } from "../../type/round.type"
import { getRound, createRounds, updateRounds, deleteRounds } from "../../services/round.service"
import extractHeaders from "../../utils/extractHeader"
import { useToast } from "../../context/ToastContext"

export const useRound = () => {
    const eventId = localStorage.getItem("eventId");
    const { showToast } = useToast()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [rounds, setRounds] = useState<RoundData[]>()
    const [tablehead, setTableHead] = useState<string[]>([])
    const [editRound, setEditRound] = useState<RoundData | undefined>(undefined)

    const fetchRounds = async( eventId : string ) => {
        try{
            setLoading(true);
            const data = await getRound(eventId);
            setTableHead(extractHeaders(data))
            setRounds(data)
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const createRound = async( payload : RoundData, eventId : string) => {
        await createRounds(payload, eventId,showToast)
        fetchRounds(eventId)
    }

    const updateRound = async( eventId : string,roundId: string, payload:Partial<RoundData> ) => {
        await updateRounds(roundId, payload, showToast)
        fetchRounds(eventId)
    }

    const deleteRound = async(id:string) => {
        if(!eventId) return;
        await deleteRounds(id, showToast)
        fetchRounds(eventId)
    }
    useEffect(() => {
        if(!eventId) return;

        fetchRounds(eventId)
    },[])

    return{
        rounds,
        setRounds,
        loading,
        error,
        tablehead,
        editRound,
        setEditRound,
        createRound,
        updateRound,
        deleteRound
    }
}