import { useEffect, useState } from "react";
import type { Event } from "../../pages/event/event.type";

export const useEventForm = (initial?:Event) => {
    const [eventDetail, setEventDetail] = useState<Event>({
        id: "",
        title: "",
        description: "",
        startdate: "",
        enddate: "",
        status: "draft",
        progress_note: "",
    });

    const [originalEvent, setOriginalEvent] = useState<Event | null>(null);

    useEffect(() => {
        if(initial) {
            setOriginalEvent(initial)
            setEventDetail({
                id : initial.id,
                title : initial.title,
                description : initial.description,
                startdate : initial.startdate,
                enddate : initial.enddate,
                status : initial.status,
                progress_note : initial.progress_note
            })
        }
    },[initial])

    const getChangedFields = () => {
        if (!originalEvent) return {};

        const changed: Partial<typeof eventDetail> = {};

        (Object.keys(eventDetail) as (keyof typeof eventDetail)[]).forEach((key) => {
            if (key !== "id" && eventDetail[key] !== (originalEvent as any)[key]) {
            changed[key] = eventDetail[key] as any;
            }
        });

        return changed;
    };

    const closeFunction = () => {
        setEventDetail({
            id: "",
            title: "",
            description: "",
            startdate: "",
            enddate: "",
            status: "draft",
            progress_note: "",
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEventDetail((prev) => ({ ...prev, [name]: value }));
    };

    return {
        eventDetail, setEventDetail, getChangedFields, closeFunction, handleChange
    }
}