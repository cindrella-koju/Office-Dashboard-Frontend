import type { IconType } from "react-icons";
import NavBar from "../components/Navbar";
import { HiUsers, HiCalendar, HiEye, HiClock } from "react-icons/hi";
import { MdEmojiEvents, MdEventNote } from "react-icons/md";
import { useHome } from "../hooks/useHome";
import type {
  HomePageEventResponse,
  HomePageResponse,
  StatusEnum,
} from "../type/home.type";

export default function Home() {
  const { event, pagedetail, loading, error } = useHome();

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="md:flex">
        <NavBar />
        <main className="flex-1 overflow-y-auto h-screen flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  // Show error state if data fetch failed
  if (error || !pagedetail) {
    return (
      <div className="md:flex">
        <NavBar />
        <main className="flex-1 overflow-y-auto h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-2">Failed to load dashboard</p>
            <p className="text-gray-500">{error || "Unable to fetch user data"}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="md:flex">
      <NavBar />
      <main className="flex-1 overflow-y-auto h-screen">
        <HomeDetail
          loggedUserName={pagedetail.username}
          role={pagedetail.role}
          event={event}
          pagedetail={pagedetail}
        />
      </main>
    </div>
  );
}

type HomeDetailProps = {
  loggedUserName: string;
  role: string;
  event: HomePageEventResponse[];
  pagedetail: HomePageResponse;
};

const HomeDetail = ({
  loggedUserName,
  role,
  event,
  pagedetail,
}: HomeDetailProps) => {
  const normalizedRole = role.toLowerCase();

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl px-8 py-6 mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome Back {loggedUserName}
          </h2>
          <span className="mt-4 text-xl text-red-600">{role}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          Icon={HiUsers}
          label="Total Users"
          value={pagedetail.total_users}
          icon_color="#234d96"
        />
        <StatCard
          Icon={MdEmojiEvents}
          label="Total Events"
          value={pagedetail.total_events}
          icon_color="#db9e35"
        />
        <StatCard
          Icon={MdEventNote}
          label="Active Events"
          value={pagedetail.active_events}
          icon_color="#cf1b2d"
        />
      </div>

      {/* Events */}
      <div className="bg-white rounded-2xl shadow-lg mt-10 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <HiClock className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Recent Activities
              </h3>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {event.length} events
            </span>
          </div>
        </div>

        <div className="px-8 lg:max-h-[500px] max-h-[400px] overflow-y-auto">
          {/* Table Header */}
          <div
            className={`hidden sm:grid ${
              normalizedRole === "member"
                ? "grid-cols-[2fr_1fr_1fr_1fr]"
                : "grid-cols-[2fr_1fr_1fr]"
            } py-4 border-b border-gray-100 sticky top-0 bg-white`}
          >
            <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
              Event Title
            </p>
            <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
              Duration
            </p>
            <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
              Status
            </p>
            {normalizedRole === "member" && (
              <p className="font-semibold text-center text-gray-500 text-xs uppercase tracking-wider">
                Action
              </p>
            )}
          </div>

          {/* Events List */}
          {event.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <MdEventNote className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">No recent events available</p>
              <p className="text-sm">Events will appear here once created</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {event.map((e, index) => {
                const formattedDuration = `${new Date(
                  e.startdate
                ).toLocaleDateString()} - ${new Date(
                  e.enddate
                ).toLocaleDateString()}`;

                return (
                  <Event
                    key={`${e.title}-${index}`}
                    title={e.title}
                    status={e.status}
                    duration={formattedDuration}
                    role={role}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  Icon,
  label,
  value,
  icon_color,
}: {
  Icon: IconType;
  label: string;
  value: number;
  icon_color: string;
}) => (
  <div className="bg-white rounded-2xl shadow p-8 hover:-translate-y-1 transition">
    <div className="text-3xl mb-3">
      <Icon style={{ color: icon_color, fontSize: "30px" }} />
    </div>
    <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">
      {label}
    </p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const Event = ({
  title,
  status,
  duration,
  role,
}: {
  title: string;
  status: StatusEnum;
  duration: string;
  role: string;
}) => {
  const normalizedRole = role.toLowerCase();

  const statusConfig: Record<
    StatusEnum,
    { bg: string; text: string; dot: string; icon: string }
  > = {
    draft: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      dot: "bg-gray-500",
      icon: "📝",
    },
    active: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
      icon: "🟢",
    },
    completed: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-500",
      icon: "✅",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`group grid ${
        normalizedRole === "member"
          ? "grid-rows-[auto_auto_auto_auto] sm:grid-rows-1 sm:grid-cols-[2fr_1fr_1fr_1fr]"
          : "grid-rows-[auto_auto_auto] sm:grid-rows-1 sm:grid-cols-[2fr_1fr_1fr]"
      } py-4 px-2 -mx-2 rounded-xl hover:bg-gray-50 transition-all duration-200 items-center gap-2 sm:gap-0`}
    >
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
          <HiCalendar className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
            {title}
          </p>
          <p className="sm:hidden text-xs text-gray-500">{duration}</p>
        </div>
      </div>

      {/* Duration - Hidden on mobile (shown under title) */}
      <p className="hidden sm:block text-sm text-gray-600">{duration}</p>

      {/* Status Badge */}
      <div className="flex items-center">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
        >
          <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Action Button */}
      {normalizedRole === "member" && (
        <div className="flex items-center justify-center sm:justify-center">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200 group-hover:shadow-sm">
            <HiEye className="w-4 h-4" />
            View
          </button>
        </div>
      )}
    </div>
  );
};
