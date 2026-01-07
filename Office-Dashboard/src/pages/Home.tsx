import type { IconType } from "react-icons";
import NavBar from "../components/Navbar";
import { HiUsers } from "react-icons/hi";
import { MdEmojiEvents } from "react-icons/md";
import { MdEventNote } from "react-icons/md";

export default function Home() {
    const loggedUserName = "Dummy User"

    return ( 
        <div className="md:flex">
            <NavBar />
            <main className="flex-1 overflow-y-auto h-screen">
                <HomeDetail loggedUserName={loggedUserName} role="Admin"/>
            </main>
        </div>
    );
}

type HomeDetailProps = {
  loggedUserName: string;
  role : "Admin" | "SuperAdmin" | "Member"
};


const HomeDetail = ({ loggedUserName, role }: HomeDetailProps) => {
    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-8">
            <div className="bg-white rounded-2xl px-8 py-6 mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shadow">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">
                        Welcome Back {loggedUserName}
                    </h2>
                    <span className="mt-4 text-xl text-red-600">Admin</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard Icon={HiUsers} label="Total Users" value="111" icon_color="#234d96"/>
                <StatCard Icon={MdEmojiEvents} label="Total Events" value="55" icon_color="#db9e35"/>
                <StatCard Icon={MdEventNote} label="Active Events" value="22" icon_color="#cf1b2d"/>
            </div>

            <div className="bg-white rounded-2xl shadow px-8 mt-10 lg:h-160 h-100 overflow-y-auto">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 mt-8">
                    Recent Activities
                </h3>

                <div className={`hidden sm:grid ${role === "Member" ? 'grid-cols-[2fr_1fr_1fr_1fr]' : 'grid-cols-[2fr_1fr_1fr]'} py-5`}>
                    <p className="font-bold text-gray-800 sm:text-sm">Title</p>
                    <p className="font-bold text-gray-800 sm:text-sm">Duration</p>
                    <p className="font-bold text-gray-800 sm:text-sm">Status</p>
                    {role === "Member" && (
                        <p className="font-bold text-center text-gray-800 sm:text-sm">Action</p>
                    )}
                </div>

                <Event title="Table Tennis Tournament" status="Active" duration="2020-11-9 :: 2021-12-3" role={role}/>
                <Event title="Annual Marathon" status="Upcoming" duration="2020-11-9 :: 2021-12-3" role={role}/>
                <Event title="Chess Championship" status="Completed" duration="2020-11-9 :: 2021-12-3" role={role}/>
                <Event title="Coding Hackathon" status="Active" duration="2020-11-9 :: 2021-12-3" role={role}/>
                <Event title="Art Competition" status="Upcoming" duration="2020-11-9 :: 2021-12-3" role={role}/>
            </div>
        </div>
    )
}

const StatCard = ({
    Icon,
    label,
    value,
    icon_color
}:{
    Icon: IconType;
    label: string;
    value: string;
    icon_color: string;
}) =>(

    <div className="bg-white rounded-2xl shadow p-8 hover:-translate-y-1 transition">
        <div className="text-3xl mb-3"><Icon style={{ color: icon_color, fontSize: '30px' }}/></div>
        <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
    </div>
)


const Event = ({
    title,
    status,
    duration,
    role
}:{
    title: string;
    status: "Active" | "Upcoming" | "Completed"; 
    duration : string,
    role : "Admin" | "SuperAdmin" | "Member"

}) => {
    const colors = {
        Active : "bg-green-100 text-green-800",
        Upcoming : "bg-yellow-100 text-yellow-800",
        Completed : "bg-blue-100 text-blue-800"
    }

    return(
        <div className={`grid ${role === "Member"
            ? 'grid-rows-[1fr_1fr_1fr_1fr] sm:grid-rows-none sm:grid-cols-[2fr_1fr_1fr_1fr]'
            : 'grid-rows-[1fr_1fr_1fr] sm:grid-rows-none sm:grid-cols-[2fr_1fr_1fr]'
            } 
        py-4 border-b last:border-none`}>
            <p className="font-medium text-gray-800 sm:text-sm">{title}</p>
            <p className="text-left">{duration}</p>
            <div className={`px-3 py-1 justify-center`}>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status]} flex-1`}>{status}</span>
            </div>
        </div>
    )
}