import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import type { Event, EventResponse } from "../../type/event.type";
import * as eventService from "../../services/event.service";
import extractHeaders from "../../utils/extractHeader";

export interface StatusProps {
    id: string;
    name: string;
}

export const useEvent = () => {
    const { showToast } = useToast();

    const [events, setEvents] = useState<EventResponse | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tablehead, setTableHead] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(1);

    const [status, setStatus] = useState<StatusProps | null>(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await eventService.getEvent(currentPage, limit);

            setTableHead(extractHeaders(data.items));
            setEvents(data);
            setTotalPage(data.total_pages);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchEventByStatus = async () => {
        if (!status) return;

        try {
            setLoading(true);
            const data = await eventService.getEventByStatus(
                status.name.toLowerCase(),
                currentPage,
                limit
            );

            setTableHead(extractHeaders(data.items));
            setEvents(data);
            setTotalPage(data.total_pages);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (status) {
            fetchEventByStatus();
        } else {
            fetchEvents();
        }
    }, [currentPage, limit, status]);


    const createEvent = async (payload: Event) => {
        await eventService.createEvent(payload, showToast);
        fetchEvents();
    };

    const updateEvent = async (id: string, payload: Partial<Event>) => {
        await eventService.updateEvent(id, payload, showToast);
        fetchEvents();
    };

    const deleteEvent = async (id: string) => {
        await eventService.deleteEvent(id, showToast);
        fetchEvents();
    };

    return {
        events,
        setEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        loading,
        error,
        tablehead,
        currentPage,
        limit,
        totalPage,
        setCurrentPage,
        setLimit,
        setStatus,
    };
};
