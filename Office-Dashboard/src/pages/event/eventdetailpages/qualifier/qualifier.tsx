import { useState } from "react";
import EventNavBar from "../../../../components/EventNavbar";
import { usePermissions } from "../../../../hooks/userPermission";
import { getInitials } from "../participants/participants";
import QualifierModule from "./QualifierModel";
import useFetch from "../../../../hooks/useFetch";
import { RETRIEVE_QUALIFIER_BY_EVENT } from "../../../../constants/urls";

interface EachQualifier{
    user_id : number,
    username : string
}

interface QualifierResponse{
    round_name : string
    qualifier :  EachQualifier[]
}


const getColor = (id: number) => {
    const colors = [
        'bg-gradient-to-br from-blue-400 to-blue-600',
        'bg-gradient-to-br from-purple-400 to-purple-600',
        'bg-gradient-to-br from-pink-400 to-pink-600',
        'bg-gradient-to-br from-green-400 to-green-600',
        'bg-gradient-to-br from-yellow-400 to-yellow-600',
        'bg-gradient-to-br from-red-400 to-red-600',
        'bg-gradient-to-br from-indigo-400 to-indigo-600',
        'bg-gradient-to-br from-teal-400 to-teal-600',
    ];
    return colors[(id - 1) % colors.length];
};


export default function Qualifier(){
    const eventID = localStorage.getItem("eventId")
    const permissions = usePermissions("qualifier")
    const {data : qualifier} = useFetch<QualifierResponse[]>(eventID ? RETRIEVE_QUALIFIER_BY_EVENT(eventID) : "")
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [viewQualifier, setViewQualifier] = useState<boolean>(false)

    return(
         <div className="flex min-h-screen bg-gray-100">
            <EventNavBar/>
            <main className="flex-1 p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Qualifier</h1>
                    {permissions.canCreate && (
                        <button className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                        onClick={() => setViewQualifier(true)}
                        >
                            + Add Qualifier
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1 relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by username or ID..."
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                                    viewMode === "grid"
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                                    viewMode === "list"
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    {   qualifier &&
                        qualifier.map((qua) => (
                            <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center mt-10 first:mt-0">
                                {qua.round_name}
                            </h2>
                            {
                                viewMode === "grid" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {
                                            qua.qualifier.map((q,index) => (
                                                <div 
                                                    key={q.user_id} 
                                                    className="relative group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-200"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className={`${getColor(index)} rounded-full w-14 h-14 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                                            {getInitials(q.username)}
                                                        </div>
                                                        
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
                                                                {q.username}
                                                            </p>
                                                        </div>
                                                        <div className="mt-3 flex items-center justify-between">
                                                            <button
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors duration-200"
                                                                title="Remove qualifier"
                                                            >
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
    
                                                </div>  
                                            ))
                                        }
                                    </div>
                                ):(
                                    <div className="space-y-3">
                                        {
                                            qua.qualifier.map((q,index) => (
                                                <div 
                                                    key={q.user_id} 
                                                    className="relative group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-200"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className={`${getColor(index)} rounded-full w-14 h-14 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                                            {getInitials(q.username)}
                                                        </div>
                                                        
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
                                                                {q.username}
                                                            </p>
                                                        </div>
                                                        <div className="mt-3 flex items-center justify-between">
                                                            <button
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors duration-200"
                                                                title="Remove qualifier"
                                                            >
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
    
                                                </div>  
                                            ))
                                        }
                                    </div>
                                )

                            }

                            </>
                        ))
                    }
                </div>
            </main>

            {
                viewQualifier &&

                <QualifierModule eventID={eventID}/>
            }
        </div>
    )
}