import NavBar from "../components/Navbar";
import { HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getProfilePage } from "../services/profile.service";
import EmptyMessage from "../components/ui/EmptyMessage";
import { RiAdminFill } from "react-icons/ri";

type EventStatus = "Active" | "Completed" | "Draft";

export interface ProfileDetail {
  id: string;
  username: string;
  fullname: string;
  email: string;
  roles: string | string[];
  event_history: EventHistory[];
}

interface EventHistory {
  title: string;
  rolename: string;
}


const Loading = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center py-12 text-red-500">{message}</div>
);

export default function ProfilePage() {
  const [profileDetail, setProfileDetail] = useState<ProfileDetail | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileDetail = async () => {
    try {
      setLoading(true);
      const data = await getProfilePage();
      setProfileDetail(data);
    } catch (err: any) {
      setError(err.detail || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileDetail();
  }, []);

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
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => console.log(profileDetail?.id)}
              >
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
                Change Password
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="max-h-[500px] lg:max-h-[800px] overflow-y-auto">
            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : profileDetail ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h2 className="font-semibold text-gray-700">Username:</h2>
                  <p className="text-gray-900">{profileDetail.username}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-700">Fullname:</h2>
                  <p className="text-gray-900">{profileDetail.fullname}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-700">Email:</h2>
                  <p className="text-gray-900">{profileDetail.email}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-700">Role:</h2>
                  <p className="text-gray-900">
                    {Array.isArray(profileDetail.roles)
                      ? profileDetail.roles.join(", ")
                      : profileDetail.roles}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Event Participation History */}
          <div>
            <h2 className="text-3xl font-bold border-b pb-2 mb-4">
              Event Participation History
            </h2>

            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : profileDetail && profileDetail.event_history.length > 0 ? (
              <>
                {/* Table Header */}
                <div className="sm:grid sm:grid-cols-2 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                  <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    Event Title
                  </p>
                  <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    Role in Event
                  </p>
                </div>

                {/* Event Rows */}
                <div className="max-h-[500px] lg:max-h-[800px] overflow-y-auto">
                  {profileDetail.event_history.map((eh, index) => (
                    <div
                      key={index}
                      className="sm:grid sm:grid-cols-2 py-4 border-b border-gray-100"
                    >
                      <p className="text-gray-900 text-sm">{eh.title}</p>
                      <p className="text-gray-900 text-sm">{eh.rolename}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <EmptyMessage
                message="No Event Participation Yet"
                submessage="Join an event to see participation history"
                icon={<RiAdminFill size={80} />}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}