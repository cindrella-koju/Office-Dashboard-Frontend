import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext"
import type { Event, EventResponse } from "../../pages/event/event.type";
import * as eventService from "../../services/event.service";
import extractHeaders from "../../utils/extractHeader";

export const useEvent = () => {
    const { showToast } = useToast();
    const [events, setEvents] = useState<EventResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tablehead, setTableHead ] = useState<string[]>([])

    const fetchEvents = async() => {
        try{
            setLoading(true);
            const data = await eventService.getEvent();
            setEvents(data)
            setTableHead(extractHeaders(data))
        }catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const createEvent = async(payload : Event) => {
        await eventService.createEvent(payload, showToast);
        fetchEvents();
    }

    const updateEvent = async(id : string, payload:Partial<Event>) => {
        await eventService.updateEvent(id, payload, showToast);
        fetchEvents();
    }

    const deleteEvent = async(id : string) => {
        await eventService.deleteEvent(id, showToast);
        fetchEvents()
    }

    useEffect(() => {
        fetchEvents()
    },[])

    return {
        events,
        setEvents,
        createEvent,
        updateEvent,
        loading,
        error, 
        tablehead,
        deleteEvent
    }
}