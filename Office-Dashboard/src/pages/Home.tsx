import type { IconType } from "react-icons";
import NavBar from "../components/Navbar";
import { HiUsers } from "react-icons/hi";
import { MdEmojiEvents, MdEventNote } from "react-icons/md";
import { useHome } from "../hooks/useHome";
import type {
  HomePageEventResponse,
  HomePageResponse,
  StatusEnum,
} from "../type/home.type";

export default function Home() {
  const { event, pagedetail } = useHome();

  return (
    pagedetail && (
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
    )
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
      <div className="bg-white rounded-2xl shadow px-8 mt-10 lg:h-160 h-100 overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 mt-8">
          Recent Activities
        </h3>

        {/* Table Header */}
        <div
          className={`hidden sm:grid ${
            normalizedRole === "member"
              ? "grid-cols-[2fr_1fr_1fr_1fr]"
              : "grid-cols-[2fr_1fr_1fr]"
          } py-5`}
        >
          <p className="font-bold text-gray-800 sm:text-sm">Title</p>
          <p className="font-bold text-gray-800 sm:text-sm">Duration</p>
          <p className="font-bold text-gray-800 sm:text-sm">Status</p>
          {normalizedRole === "member" && (
            <p className="font-bold text-center text-gray-800 sm:text-sm">
              Action
            </p>
          )}
        </div>

        {/* Events List */}
        {event.length === 0 ? (
          <p className="text-gray-500 py-6 text-center">
            No recent events available.
          </p>
        ) : (
          event.map((e, index) => {
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
          })
        )}
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

  const colors: Record<StatusEnum, string> = {
    draft: "bg-gray-100 text-gray-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
  };

  return (
    <div
      className={`grid ${
        normalizedRole === "member"
          ? "grid-rows-[1fr_1fr_1fr_1fr] sm:grid-rows-none sm:grid-cols-[2fr_1fr_1fr_1fr]"
          : "grid-rows-[1fr_1fr_1fr] sm:grid-rows-none sm:grid-cols-[2fr_1fr_1fr]"
      } py-4 border-b last:border-none`}
    >
      <p className="font-medium text-gray-800 sm:text-sm">{title}</p>

      <p className="text-left sm:text-sm">{duration}</p>

      <div className="px-3 py-1">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status]}`}
        >
          {status}
        </span>
      </div>

      {normalizedRole === "member" && (
        <div className="flex items-center justify-center">
          <button className="text-sm text-blue-600 hover:underline">
            View
          </button>
        </div>
      )}
    </div>
  );
};
