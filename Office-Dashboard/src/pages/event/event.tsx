import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import { type EventAction, type EventStatus } from "./event.type";
import FilterComponent from "../../components/Filters";
import { usePermissions } from "../../hooks/userPermission";
import Table from "../../components/Tables";
import { DynamicInserPopUp } from "../../components/popup";
import useFetch from "../../hooks/useFetch";
import { CREATE_EVENT_FORM, RETRIEVE_EVENT } from "../../constants/urls";

export default function EventPage() {
    const {data : eventPage, loading, error} = useFetch(CREATE_EVENT_FORM);
    const {data : retrieve_events} = useFetch(RETRIEVE_EVENT)
    const permissions = usePermissions('event')
    const filters:string[] = ["All","Active","Completed","Draft"];
    const tablehead:string[] = ["title", "startdate","enddate", "status"];
    const [events, setEvents] = useState<any[]>([]);
    const [eventName,setEventName] = useState<EventAction | null >(null);
    const [filter, setFilter] = useState<"All" | EventStatus>("All");
    
    console.log("Retrieve /data:",retrieve_events,"exist event:",events)

    useEffect(() => {
    if (retrieve_events) {
        setEvents(retrieve_events);
    }
    }, [retrieve_events]);

    useEffect(() => {
        console.log("Event:",eventPage)
    },[eventName])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return(
        <div className="flex min-h-screen bg-gray-100">
            <NavBar />
            <main className="flex-1 p-6 md:p-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">📅 Events</h1>
                    {
                        permissions.canCreate && (
                            <button
                                onClick={() => setEventName("create")}
                                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
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
                    <Table tabledata={events} tablehead={tablehead} resource="event"/>
                </div>

                {
                    eventName != null && (
                        <>
                            <DynamicInserPopUp eventPage={eventPage} title="Create Event"/>
                        </>
                        )
                }

            </main>
        </div>
    )
}