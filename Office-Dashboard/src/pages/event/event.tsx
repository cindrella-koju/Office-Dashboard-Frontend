import { useState } from "react";
import NavBar from "../../components/Navbar";
import { DUMMY_LOGGED_USER } from "../users/user.data";
import { DUMMY_EVENT_DATA } from "./event.data"
import { type EventViewAction, type EventAction, type EventStatus } from "./event.type";
import FilterComponent from "../../components/Filters";
import React from "react";

const statusStyles: Record<EventStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Draft: "bg-gray-200 text-gray-600",
};

export default function EventPage() {
    const filters:string[] = ["All","Active","Completed","Draft"];
    const allMember:string[] = ["John Doe","Anna Doe"]
    const tablehead:string[] = ["Title", "Start Date","End Date", "Status", "Actions"];
    const [eventName,setEventName] = useState<EventAction | null >(null);
    const [eventView,setEventView] = useState<EventViewAction | null>(null)
    const [filter, setFilter] = useState<"All" | EventStatus>("All");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedEvent,setSelectedEvent] = useState<number | null>(null)


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
                        DUMMY_LOGGED_USER.role === "Superadmin" && (
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
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {tablehead.map((event, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase"
                                    >
                                        {event}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {
                                DUMMY_EVENT_DATA.map((event) => (
                                    <tr key={event.id} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold">{event.title}</p>
                                        </td>
                                        <td className="px-6 py-4">{event.startdate}</td>
                                        <td className="px-6 py-4">{event.enddate}</td>
                                        <td className="px-6 py-4">
                                            <span
                                            className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${statusStyles[event.status]}`}
                                            >
                                            {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {
                                                    (DUMMY_LOGGED_USER.role === "Admin" || DUMMY_LOGGED_USER.role === "Superadmin") && (
                                                        <>
                                                            <button 
                                                                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white"
                                                                onClick={() => 
                                                                    {
                                                                        setEventName("edit") ;
                                                                        setSelectedEvent(event.id);
                                                                    }
                                                                }
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="px-4 py-2 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white">
                                                                Delete
                                                            </button>
                                                        </>
                                                    )
                                                }   
                                                <button className="px-4 py-2 bg-green-100 rounded-lg hover:bg-green-600 hover:text-white" onClick={() => {setEventView("view"); setSelectedEvent(event.id)}}>
                                                    View
                                                </button>  
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
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
                {
                    eventView != null && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
                                
                                {/* Close (X) button */}
                                <button
                                    onClick={() => setEventView(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                                    aria-label="Close"
                                >
                                    &times;
                                </button>

                                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                    Event Detail
                                </h2>

                                {
                                    DUMMY_EVENT_DATA.map((event) => (
                                        event.id === selectedEvent && (
                                            <div
                                                key={event.id}
                                                className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4"
                                            >
                                                <h1 className="text-3xl font-bold text-gray-800">
                                                    {event.title}
                                                </h1>

                                                <div>
                                                    Status:
                                                    <span
                                                        className={`inline-block px-4 py-1 ml-2 rounded-full text-xs font-semibold uppercase tracking-wide ${statusStyles[event.status]}`}
                                                    >
                                                        {event.status}
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 text-lg">
                                                    Description : {event.description}
                                                </p>

                                                <div className="flex gap-6 text-sm text-gray-500">
                                                    <div>
                                                        <span className="font-semibold text-gray-700">Start:</span>{" "}
                                                        {event.startdate}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-700">End:</span>{" "}
                                                        {event.enddate}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                                        Participants
                                                    </h2>
                                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                        {event.participants.map((participant) => (
                                                            <li key={participant.id}>
                                                                {participant.fullname}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {event.note && (
                                                    <div className="bg-gray-100 p-4 rounded-lg text-gray-700">
                                                        <span className="font-semibold">Note:</span>
                                                        {event.note
                                                            .split('.')
                                                            .map(sentence => sentence.trim())
                                                            .filter(Boolean)
                                                            .map((sentence, index) => (
                                                                <span key={index}>
                                                                    <br />
                                                                    {sentence}.
                                                                </span>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

            </main>
        </div>
    )
}