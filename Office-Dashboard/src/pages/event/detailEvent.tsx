import { useState } from "react";
import Table from "../../components/Tables";
// import { DisplayType } from "./event.type";

export default function DetailEvent() {
    const [activeTab, setActiveTab] = useState("Overall Tiesheet");
    const [todisplay,setToDisplay] = useState('overalltiesheet')
    const tablehead = ["date","time","game vs","status"]
    const tabledata = [
        {
            "date" : "Jan 6, 2026",
            "time" : "10:20 am",
            "game vs" : "dfsdfsfs",
            "status": "completed"

        }
    ]

    const tabs = ["Overall Tiesheet", "Event History", "Todays Game", "Ongoing Game", "Event Image"];

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center py-12 gap-12">
            <div className="w-[90%] max-w-[80%] bg-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col md:flex-row gap-6 md:gap-12 shadow-lg border border-white/20">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-4">Table Tennis</h1>
                    <p className="text-white/80 leading-relaxed">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quia illum eius veniam? Laudantium quia reiciendis et enim! Quas unde dolores voluptates animi iste rerum tempore nihil veniam illum laudantium? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, temporibus vel doloribus et in rem vitae aspernatur est, nostrum amet ducimus unde perspiciatis tenetur delectus doloremque deserunt, distinctio itaque libero.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem aliquam itaque modi quos, sint eum quibusdam nobis necessitatibus velit, nam explicabo corrupti. Veniam voluptate cumque autem placeat error debitis dicta.
                    </p>
                </div>
 
                <div className="flex flex-col justify-between text-white/90 text-lg font-medium">
                    <span>Duration: Jan 25 - Jan 26</span>
                    <span className="mt-4 md:mt-0 text-green-400 font-semibold">Status: Ongoing</span>
                </div>
            </div>

            <div className="w-[90%] max-w-[80%] h-[65vh] bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20">
                <div className="flex gap-2 text-white text-lg">
                    {tabs.map((tab, index) => (
                    <span key={tab} className="flex items-center">
                        <span
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer ${
                            activeTab === tab ? "underline font-semibold" : ""
                        }`}
                        >
                        {tab}
                        </span>
                        {/* Add separator except for the last item */}
                        {index !== tabs.length - 1 && <span className="mx-2">|</span>}
                    </span>
                    ))}
                </div>

                {/* Content based on active tab */}
                <div className="mt-6 text-white">
                    {activeTab === "Overall Tiesheet" && <Table tablehead={tablehead} tabledata={tabledata} resource="event"/>}
                    {activeTab === "Event History" && <div>Event History content</div>}
                    {activeTab === "Today game" && <div>Today game content</div>}
                    {activeTab === "Onling game" && <div>Onling game content</div>}
                    {activeTab === "Event Image" && <div>Event Image content</div>}
                </div>
                </div>
        </div>
    );
}

function TableTemplate(){
    return(
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Game VS</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">jan 5 , 2026</td>
                    <td className="px-6 py-4">11.00 am</td>
                    <td className="px-6 py-4">user1 vs user2</td>
                    <td className="px-6 py-4">Completed</td>
                </tr>
            </tbody>
        </table>
    )
}
