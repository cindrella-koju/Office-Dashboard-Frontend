import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import NavBar from "../../../components/Navbar";
import { MdEmojiEvents } from "react-icons/md";
import { DUMMY_EVENT, oneEventInfo, ongoingMatches, overallTiesheetTableData, overallTiesheetTableHead, roundDetailData, roundDetailHead, statusColors, todayGameTableData, todayGameTableHead} from "./detail.data";
import type { TabType } from "./detail.type";
import { useState } from "react";
import Table from "../../../components/Tables";
import { usePermissions } from "../../../hooks/userPermission";
import { DynamicInserPopUp } from "../../../components/popup";

const eventPage = {
    "title" : "string",
    "description" : "string",
    "note" : "string",
    "start date" : new Date(),
    "end date" : new Date(),
    // "status" : ["completed","upcoming","Draft"],
    "participants": [
        { id: 1, name: "user1" },
        { id: 2, name: "user2" },
        { id: 3, name: "user3" },
        { id: 4, name: "user4" },
        { id: 5, name: "user5" },
    ]
}

export default function DetailEvent() {
    const permissions = usePermissions("eventdetail")

    const [activeTab, setActiveTab] = useState<TabType>("Overall Tiesheet");
    const tabs: TabType[] = ["Overall Tiesheet", "Event History", "Todays Game", "Ongoing Game", "Event Image"];
    const [viewDetail, setViewDetail] = useState<boolean>(true)
    return(
        <div className="flex min-h-screen bg-gray-100">
            <NavBar/>
            <main className="flex-1 p-6 md:p-10">
                <div className="flex justify-between items-center mb-8">
                    <button 
                        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition"
                    >
                        <FaArrowLeft />
                        <span className="font-medium">Back to Events</span>
                    </button>
                    {
                        permissions.canCreate && (
                            <button
                                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                            >
                                Create Tiesheet
                            </button>
                        )
                    }

                </div>


                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <MdEmojiEvents className="text-indigo-600 text-3xl" />
                                <h1 className="text-3xl font-bold text-gray-800">{DUMMY_EVENT.title}</h1>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {DUMMY_EVENT.description}
                            </p>
                        </div>

                        <div className="flex flex-col lg:items-end">
                            <div className="flex items-center gap-2 text-gray-700">
                                <FaCalendarAlt className="text-indigo-500"/>
                                <span className="font-medium">
                                    {DUMMY_EVENT.startDate} - {DUMMY_EVENT.endDate}
                                </span>
                            </div>
                            <span className={`px-4 py-1.5 mt-10 rounded-full text-sm font-semibold ${statusColors[DUMMY_EVENT.status]}`}>
                                {DUMMY_EVENT.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 h-[75%]">
                    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
                        {
                            tabs.map((tab) => (
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
                            ))
                        }
                    </div>

                    <div className="min-h-[400px]">
                        {
                            activeTab === "Overall Tiesheet" && (
                                <div className="overflow-x-auto">
                                    <Table tablehead={overallTiesheetTableHead} tabledata={overallTiesheetTableData} resource="eventdetail" isOverAllTieSheet/>
                                </div>
                            )
                        }
                        {
                            activeTab === "Event History" && (
                                <div className="overflow-y-auto">
                                    <h1>All event history</h1>
                                </div>
                            )
                        }
                        {
                            activeTab === "Todays Game" && (
                                <div>
                                    {
                                        todayGameTableHead.length > 0 ? (
                                            <div className="overflow-x-auto">
                                                <Table tablehead={todayGameTableHead} tabledata={todayGameTableData} resource="eventdetail"/>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                                <FaCalendarAlt className="text-6xl text-gray-300 mb-4" />
                                                <p className="text-lg">No games scheduled for today</p>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            activeTab === "Ongoing Game" && (
                                ongoingMatches.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                        <div
                                        className="group relative bg-white rounded-2xl shadow-md p-6 border 
                                                    transition-all duration-300 
                                                    hover:shadow-2xl hover:-translate-y-1"
                                        >
                                            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" />

                                            <div className="text-center space-y-4">
                                                <h3 className="text-lg font-extrabold text-gray-800 tracking-wide">
                                                    Table Tennis
                                                </h3>
                                                <div className="space-y-2">
                                                    <p className="text-base font-semibold text-gray-700 group-hover:text-indigo-600 transition">
                                                        Player 1
                                                    </p>
                                                    <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full
                                                                bg-gradient-to-r from-gray-600 to-gray-800 shadow">
                                                        VS
                                                    </span>

                                                    <p className="text-base font-semibold text-gray-700 group-hover:text-pink-600 transition">
                                                        Player 2
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <MdEmojiEvents className="text-6xl text-gray-300 mb-4" />
                                        <p className="text-lg">No ongoing games at the moment</p>
                                    </div>
                                )
                            )
                        }
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

            {
                viewDetail && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-fadeIn max-h-[80vh] flex flex-col">
                            <div className="flex items-center justify-between border-b px-6 py-4 flex-shrink-0">
                                <h1 className="text-xl font-semibold text-gray-800 uppercase">
                                    {oneEventInfo.title}
                                </h1>

                                <button
                                    onClick={() => setViewDetail(false)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    aria-label="Close modal"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="px-6 py-5 text-sm text-gray-700 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                                <div>
                                <p className="font-medium text-gray-500">Event Date</p>
                                <p className="text-gray-800">{oneEventInfo["Event date"]}</p>
                                </div>

                                <div>
                                <p className="font-medium text-gray-500">Time</p>
                                <p className="text-gray-800">{oneEventInfo.time}</p>
                                </div>

                                <div>
                                <p className="font-medium text-gray-500">Player 1:</p>
                                <p className="text-gray-800">{oneEventInfo.playerone}</p>
                                </div>

                                <div>
                                <p className="font-medium text-gray-500">Player 2:</p>
                                <p className="text-gray-800">{oneEventInfo.playertwo}</p>
                                </div>

                                <div>
                                <p className="font-medium text-gray-500">Winner</p>
                                <p className="font-semibold text-green-600">{oneEventInfo.winner}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className="mb-3 text-base font-semibold text-gray-800">
                                Round Details
                                </h2>

                                <div className="overflow-y-auto max-h-64">
                                <Table
                                    tablehead={roundDetailHead}
                                    tabledata={oneEventInfo.rounds}
                                    resource={null}
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>


                )
            }
        </div>
    )
}
