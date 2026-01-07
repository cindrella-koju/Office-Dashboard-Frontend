import { useState } from "react";
import NavBar from "../components/Navbar";
import FilterComponent from "../components/Filters";


type EventStatus = "Active" | "Completed" | "Draft";

type Event = {
  id: number;
  title: string;
  discription: string;
  startsat: string;
  endsat: string;
  status: EventStatus;
};

const INITIAL_EVENTS: Event[] = [
  {
    id: 1,
    title: "Tech Conference 2026",
    discription: "San Francisco",
    startsat : "Jan 15 ",
    endsat : "Jan 17, 2026",
    status: "Active",
  },
  {
    id: 2,
    title: "Product Launch Webinar",
    discription: "Online",
    startsat : "Jan 15 ",
    endsat : "Jan 17, 2026",
    status: "Active",
  },
  {
    id: 3,
    title: "Summer Workshop Series",
    discription : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptatibus recusandae dolorum labore exercitationem perspiciatis corrupti? Culpa quae, numquam aperiam ratione repudiandae reprehenderit. Eius, eum sunt vitae voluptate magnam ad!",
    startsat : "Jan 15 ",
    endsat : "Jan 17, 2026",
    status: "Draft",
  },
];

const statusStyles: Record<EventStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Draft: "bg-gray-200 text-gray-600",
};

export default function EventPageeeeee() {
    const participants = ["userA","userB","userC","userD","userE","userF"]
    const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (e:any) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedUsers(options);
  };
    const filters = ["All","Active","Completed","Draft"]
    const [filter, setFilter] = useState<"All" | EventStatus>("All");
    const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
    const [viewEvent, setViewEvent] = useState(false)
    const [editEvent, setEditEvent] = useState(false)
    const [deleteEvent, setDeleteEvent] = useState(false)
    const [participateEvent, setParticipateEvent] = useState(false)
    const userRole : string = "Admin"

    const filteredEvents =
        filter === "All"
        ? events
        : events.filter((e) => e.status === filter);
    return (
    <div className="flex min-h-screen bg-gray-100">
        <NavBar />
        <main className="flex-1 p-6 md:p-10">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">📅 Events</h1>
            {
                userRole === "Admin" && (
                    <button
                        // onClick={openCreateModal}
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
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                        Event
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                        Starts At:
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                        Ends At:
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                        Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                        Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            filteredEvents.map((event) => (
                                <tr key={event.id} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-semibold">{event.title}</p>
                                    </td>
                                    <td className="px-6 py-4">{event.startsat}</td>
                                    <td className="px-6 py-4">{event.endsat}</td>
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
                                                userRole === "Admin" && (
                                                    <>
                                                        <button 
                                                            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white"
                                                            onClick={() => setEditEvent(true)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button className="px-4 py-2 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white">
                                                            Delete
                                                        </button>
                                                    </>
                                                )
                                            }
                                            <button className="px-4 py-2 bg-green-100 rounded-lg hover:bg-green-600 hover:text-white">
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

{editEvent && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Event
      </h2>
      <div className="space-y-5">
        {/* Event Title */}
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
            name="description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="Enter event description"
          />
        </div>


        {/* Note */}
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

        {/* Dates */}
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

        {/* Status */}
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

        {/* Participants */}
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
            {participants.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Selected: {selectedUsers.join(", ") || "None"}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setEditEvent(false)}
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
)}

        </main>
    
    </div>
  );
}