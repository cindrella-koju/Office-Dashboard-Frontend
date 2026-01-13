import { FaCalendarAlt, FaArrowLeft, FaTrophy } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TableCheck from "../../../components/TableCheck";
import NavBar from "../../../components/Navbar";
import { eventHistory, ongoingMatches } from "../event.data";
import { useState } from "react";
import type { TabType } from "./detail.type";



export default function DetailEvent() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>("Overall Tiesheet");
    
    const tablehead = ["date", "time", "game vs", "status"];
    const tabledata = [
        {
            id: 1,
            date: "Jan 6, 2026",
            time: "10:20 am",
            "game vs": "Team A vs Team B",
            status: "Completed"
        },
        {
            id: 2,
            date: "Jan 6, 2026",
            time: "2:30 pm",
            "game vs": "Team C vs Team D",
            status: "Ongoing"
        },
        {
            id: 3,
            date: "Jan 7, 2026",
            time: "9:00 am",
            "game vs": "Team E vs Team F",
            status: "Upcoming"
        }
    ];



    const eventHistoryTableHead = ["date", "match", "winner", "round"];
    const eventHistoryTableData = eventHistory.map(match => {
        const isUser1Winner = match.winner === match.user1;
        const isUser2Winner = match.winner === match.user2;
        
        return {
            id: match.id,
            date: (
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-indigo-500 text-sm" />
                    <span className="text-gray-700 font-medium">{match.date}</span>
                    <span className="text-gray-500 text-sm">({match.time})</span>
                </div>
            ),
            match: (
                <div className="flex items-center justify-start gap-2 flex-wrap">
                    <span className={`font-semibold ${isUser1Winner ? 'text-green-600' : 'text-gray-700'}`}>
                        {match.user1}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-sm font-bold ${
                        isUser1Winner ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                        {match.user1Score}pt
                    </span>
                    <span className="text-gray-400 font-bold">-</span>
                    <span className={`px-2.5 py-1 rounded-md text-sm font-bold ${
                        isUser2Winner ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                        {match.user2Score}pt
                    </span>
                    <span className={`font-semibold ${isUser2Winner ? 'text-green-600' : 'text-gray-700'}`}>
                        {match.user2}
                    </span>
                </div>
            ),
            winner: (
                <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-500 text-sm" />
                    <span className="font-semibold text-gray-800">{match.winner}</span>
                </div>
            ),
            round: (
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                    {match.round}
                </span>
            )
        };
    });

    const tabs: TabType[] = ["Overall Tiesheet", "Event History", "Todays Game", "Ongoing Game", "Event Image"];

    const event = {
        title: "Table Tennis Tournament",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quia illum eius veniam? Laudantium quia reiciendis et enim! Quas unde dolores voluptates animi iste rerum tempore nihil veniam illum laudantium? Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        startDate: "Jan 25, 2026",
        endDate: "Jan 26, 2026",
        status: "Active" as const
    };

    const statusColors = {
        Active: "bg-green-100 text-green-700",
        Completed: "bg-blue-100 text-blue-700",
        Draft: "bg-yellow-100 text-yellow-700"
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <NavBar />
            <main className="flex-1 p-6 md:p-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/event")}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition"
                >
                    <FaArrowLeft />
                    <span className="font-medium">Back to Events</span>
                </button>

                {/* Event Header Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <MdEmojiEvents className="text-indigo-600 text-3xl" />
                                <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 lg:items-end">
                            <div className="flex items-center gap-2 text-gray-700">
                                <FaCalendarAlt className="text-indigo-500" />
                                <span className="font-medium">
                                    {event.startDate} - {event.endDate}
                                </span>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusColors[event.status]}`}>
                                {event.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeTab === tab
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === "Overall Tiesheet" && (
                            <div className="overflow-x-auto">
                                <TableCheck tablehead={tablehead} tabledata={tabledata} resource="event" />
                            </div>
                        )}
                        {activeTab === "Event History" && (
                            <div className="overflow-x-auto">
                                {eventHistoryTableData.length > 0 ? (
                                    <div className="space-y-2">
                                        <TableCheck 
                                            tablehead={eventHistoryTableHead} 
                                            tabledata={eventHistoryTableData} 
                                            resource={null}
                                            showHeader={false}
                                            minimal={true}
                                            alternateRows={true}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <MdEmojiEvents className="text-6xl text-gray-300 mb-4" />
                                        <p className="text-lg">No event history available</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "Todays Game" && (
                            <div>
                                {tabledata.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <TableCheck tablehead={tablehead} tabledata={tabledata} resource="event" />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <FaCalendarAlt className="text-6xl text-gray-300 mb-4" />
                                        <p className="text-lg">No games scheduled for today</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "Ongoing Game" && (
                            <div>
                                {ongoingMatches.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                        {ongoingMatches.map((match) => (
                                            <div
                                            key={match.id}
                                            className="group relative bg-white rounded-2xl shadow-md p-6 border 
                                                        transition-all duration-300 
                                                        hover:shadow-2xl hover:-translate-y-1"
                                            >
                                            {/* Gradient Accent */}
                                            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" />

                                            <div className="text-center space-y-4">
                                                {/* Sport Title */}
                                                <h3 className="text-lg font-extrabold text-gray-800 tracking-wide">
                                                Table Tennis
                                                </h3>

                                                {/* Players */}
                                                <div className="space-y-2">
                                                <p className="text-base font-semibold text-gray-700 group-hover:text-indigo-600 transition">
                                                    {match.player1}
                                                </p>

                                                {/* VS Badge */}
                                                <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full
                                                                bg-gradient-to-r from-gray-600 to-gray-800 shadow">
                                                    VS
                                                </span>

                                                <p className="text-base font-semibold text-gray-700 group-hover:text-pink-600 transition">
                                                    {match.player2}
                                                </p>
                                                </div>
                                            </div>
                                            </div>

                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <MdEmojiEvents className="text-6xl text-gray-300 mb-4" />
                                        <p className="text-lg">No ongoing games at the moment</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "Event Image" && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                    No images
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}