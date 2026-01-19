import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import { type EventResponse, type EventStatus } from "./event.type";
import FilterComponent from "../../components/Filters";
import { usePermissions } from "../../hooks/userPermission";
import Table from "../../components/Tables";
import useFetch from "../../hooks/useFetch";
import { RETRIEVE_EVENT } from "../../constants/urls";
import extractHeaders from "../../utils/extractHeader";
import EventModel from "./Components/EventModel";



export default function EventPage() {

    const { data: retrieve_events, loading, error } = useFetch<EventResponse[]>(RETRIEVE_EVENT);
    const [tablehead,setTablehead] = useState<string[]>([])
    const [eventMode, setEventMode] = useState<'create' | 'edit' | null>(null)
    const permissions = usePermissions('event')
    const [events, setEvents] = useState<any[]>([]);
    const [eachEventDetail, setEachEventDetail] = useState<EventResponse>()
    const filters:string[] = ["All","Active","Completed","Draft"];
    const [filter, setFilter] = useState<"All" | EventStatus>("All");
    
    useEffect(() => {
        if (retrieve_events) {
            const headers = extractHeaders(retrieve_events);
            setTablehead(headers)
            setEvents(retrieve_events)
        }
    }, [retrieve_events]);


    return(
        <div className="flex min-h-screen bg-gray-100">
            <NavBar />
            <main className="flex-1 p-6 md:p-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">📅 Events</h1>
                    {
                        permissions.canCreate && (
                            <button
                                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                                onClick={() => setEventMode("create")}
                            >
                                Create Event
                            </button>
                        )
                    }
                </div>

                <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-6">
                    <FilterComponent filters={filters} filter={filter} setFilter={setFilter} />
                </div> 

                <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg mt-10 h-170 overflow-y-auto">
                    <Table tabledata={events} tablehead={tablehead} resource="event" setMode={setEventMode} setValue={setEachEventDetail}/>
                </div>

                <EventModel eventMode={eventMode} setEventMode={setEventMode} editEventData={eachEventDetail}/>

            </main>
        </div>
    )
}