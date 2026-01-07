import { useState } from "react";
import NavBar from "../components/Navbar";

type EventStatus = "active" | "completed" | "draft";

type Event = {
  id: number;
  title: string;
  location: string;
  dates: string;
  status: EventStatus;
};

const INITIAL_EVENTS: Event[] = [
  {
    id: 1,
    title: "Tech Conference 2026",
    location: "San Francisco",
    dates: "Jan 15 - Jan 17, 2026",
    status: "active",
  },
  {
    id: 2,
    title: "Product Launch Webinar",
    location: "Online",
    dates: "Feb 5, 2026",
    status: "active",
  },
  {
    id: 3,
    title: "Summer Workshop Series",
    location: "Boston",
    dates: "Jun 10 - Jun 15, 2026",
    status: "draft",
  },
];

const statusStyles: Record<EventStatus, string> = {
  active: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  draft: "bg-gray-200 text-gray-600",
};

const emptyEvent: Event = {
  id: 0,
  title: "",
  location: "",
  dates: "",
  status: "draft",
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [filter, setFilter] = useState<"all" | EventStatus>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<Event>(emptyEvent);

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((e) => e.status === filter);

  /* ---------- CRUD HANDLERS ---------- */

  const openCreateModal = () => {
    setMode("create");
    setFormData(emptyEvent);
    setModalOpen(true);
  };

  const openEditModal = (event: Event) => {
    setMode("edit");
    setFormData(event);
    setModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.location || !formData.dates) return;

    if (mode === "create") {
      setEvents((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    } else {
      setEvents((prev) =>
        prev.map((e) => (e.id === formData.id ? formData : e))
      );
    }

    setModalOpen(false);
  };

  const deleteEvent = (id: number) => {
    if (confirm("Delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  /* ---------- UI ---------- */

  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBar />

      <main className="flex-1 p-6 md:p-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📅 Events</h1>
          <button
            onClick={openCreateModal}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            ➕ Create Event
          </button>
        </div>

        {/* FILTER */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <div className="flex gap-2 flex-wrap">
            {["all", "active", "completed", "draft"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm
                  ${
                    filter === s
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                  Dates
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
              {filteredEvents.map((event) => (
                <tr key={event.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </td>
                  <td className="px-6 py-4">📅 {event.dates}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${statusStyles[event.status]}`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CREATE / EDIT MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                {mode === "create" ? "Create Event" : "Edit Event"}
              </h2>

              <div className="space-y-4">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Event Title
    </label>
    <input
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="w-full border rounded-lg px-4 py-2"
      placeholder="Enter event title"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Location
    </label>
    <input
      name="location"
      value={formData.location}
      onChange={handleChange}
      className="w-full border rounded-lg px-4 py-2"
      placeholder="Enter location"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Dates
    </label>
    <input
      name="dates"
      value={formData.dates}
      onChange={handleChange}
      className="w-full border rounded-lg px-4 py-2"
      placeholder="Jan 15 - Jan 17, 2026"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Status
    </label>
    <select
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="w-full border rounded-lg px-4 py-2"
    >
      <option value="draft">Draft</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  </div>
</div>


              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  {mode === "create" ? "Create" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Events;