import NavBar from "../components/Navbar";
import { HiUser } from "react-icons/hi";
import { useState } from "react";

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
]

export default function ProfilePage() {
    const [event,setEvent] = useState<Event[]>(INITIAL_EVENTS)

  const user = {
    username: "John Doe",
    fullname: "Johndoe",
    email: "johndoe@gmail.com",
    role: "Member",
  };



  // Function to get status color
  const getStatusColor = (status : EventStatus) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Completed":
        return "text-yellow-600";
      case "Draft":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-1 p-6 md:p-10">
        <div className="w-full h-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-8">
          {/* Profile Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <HiUser className="text-blue-500 text-4xl" />
              <h1 className="text-3xl font-bold">Profile Information</h1>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
                Change Password
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold text-gray-700">Username:</h2>
              <p className="text-gray-900">{user.username}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Fullname:</h2>
              <p className="text-gray-900">{user.fullname}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Email:</h2>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Role:</h2>
              <p className="text-gray-900">{user.role}</p>
            </div>
          </div>

          {/* Event Participation History */}
          <div>
            <h2 className="text-3xl font-bold border-b pb-2 mb-4">
              Event Participation History
            </h2>
            {
                event.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Event Title</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Statrt Date</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">End Date</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.map((event, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                              <td className="py-3 px-6">{event.title}</td>
                              <td className="py-3 px-6">{event.startsat}</td>
                              <td className="py-3 px-6">{event.endsat}</td>
                              <td className={`py-3 px-6 font-semibold ${getStatusColor(event.status)}`}>
                                {event.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                ) : (
                    <h1 className="italic ">Haven't Participated in any Event</h1>
                )

            }
          </div>
        </div>
      </main>
    </div>
  );
}
