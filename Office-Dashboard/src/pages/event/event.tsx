import { useState } from "react";
import NavBar from "../../components/Navbar";
import { DUMMY_EVENT_DATA } from "./event.data"
import { type EventAction, type EventStatus } from "./event.type";
import FilterComponent from "../../components/Filters";
import React from "react";
import { usePermissions } from "../../hooks/userPermission";
import Table from "../../components/Tables";



export default function EventPage() {
    const permissions = usePermissions('event')
    const filters:string[] = ["All","Active","Completed","Draft"];
    const allMember:string[] = ["John Doe","Anna Doe"]
    const tablehead:string[] = ["title", "startdate","enddate", "status"];
    const [events,setEvents] = useState(DUMMY_EVENT_DATA)
    const [eventName,setEventName] = useState<EventAction | null >(null);
    const [filter, setFilter] = useState<"All" | EventStatus>("All");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);



    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );

        setSelectedUsers(options);
    };

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
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                        {eventName === "create"
                                            ? "Create Event"
                                            : eventName === "edit"
                                            ? "Edit Event"
                                            : "Event"
                                        }
                                    </h2>
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Event Title
                                            </label>
                                            <input
                                                name="title"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                placeholder="Enter event title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <input
                                                name="title"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                placeholder="Enter event Description"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Note
                                            </label>
                                            <textarea
                                                name="note"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
                                                placeholder="Add a note"
                                                rows={2}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Start Date
                                                </label>
                                                <input
                                                name="startdate"
                                                type="date"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                End Date
                                                </label>
                                                <input
                                                name="enddate"
                                                type="date"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="active">Active</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                                Participants
                                            </label>
                                            <select
                                                multiple
                                                name="participants"
                                                value={selectedUsers}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                            >
                                                {
                                                    allMember.map((participant) => (
                                                        <option
                                                            value={participant}
                                                        >
                                                            {participant}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Selected: {selectedUsers.join(", ") || "None"}
                                            </p>
                                        </div>
                                        <div className="flex justify-end gap-3 mt-6">
                                            <button
                                            onClick={() => setEventName(null)}
                                            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                            >
                                            Cancel
                                            </button>
                                            <button
                                            // onClick={handleSubmit}
                                            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                            >
                                            Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }

            </main>
        </div>
    )
}