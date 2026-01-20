// import EventNavBar from "../../../../components/EventNavbar";
// import { useState } from "react";

// // Dummy data in the format received from backend - 5 rounds
// const dummyRoundsData = [
//     {
//         roundNumber: 1,
//         roundName: "Preliminary Round",
//         qualifiers: [
//             { id: 1, username: "john_doe" },
//             { id: 2, username: "jane_smith" },
//             { id: 3, username: "alex_jones" },
//             { id: 4, username: "emily_brown" },
//         ]
//     },
//     {
//         roundNumber: 2,
//         roundName: "Quarter Finals",
//         qualifiers: [
//             { id: 5, username: "michael_wilson" },
//             { id: 6, username: "sarah_davis" },
//             { id: 7, username: "david_miller" },
//             { id: 8, username: "lisa_anderson" },
//             { id: 9, username: "chris_taylor" },
//             { id: 10, username: "amanda_moore" },
//         ]
//     },
//     {
//         roundNumber: 3,
//         roundName: "Semi Finals",
//         qualifiers: [
//             { id: 11, username: "robert_thomas" },
//             { id: 12, username: "maria_garcia" },
//             { id: 13, username: "james_martin" },
//             { id: 14, username: "linda_rodriguez" },
//             { id: 15, username: "william_lee" },
//         ]
//     },
//     {
//         roundNumber: 4,
//         roundName: "Finals Round 1",
//         qualifiers: [
//             { id: 16, username: "jennifer_white" },
//             { id: 17, username: "charles_harris" },
//             { id: 18, username: "patricia_clark" },
//         ]
//     },
//     {
//         roundNumber: 5,
//         roundName: "Grand Finals",
//         qualifiers: [
//             { id: 19, username: "daniel_lewis" },
//             { id: 20, username: "nancy_walker" },
//             { id: 21, username: "matthew_hall" },
//             { id: 22, username: "karen_allen" },
//         ]
//     }
// ];

// // Function to get initials from username
// const getInitials = (username: string) => {
//     const parts = username.split('_');
//     return parts.map(p => p[0].toUpperCase()).join('');
// };

// // Function to get color based on ID
// const getColor = (id: number) => {
//     const colors = [
//         'bg-gradient-to-br from-blue-400 to-blue-600',
//         'bg-gradient-to-br from-purple-400 to-purple-600',
//         'bg-gradient-to-br from-pink-400 to-pink-600',
//         'bg-gradient-to-br from-green-400 to-green-600',
//         'bg-gradient-to-br from-yellow-400 to-yellow-600',
//         'bg-gradient-to-br from-red-400 to-red-600',
//         'bg-gradient-to-br from-indigo-400 to-indigo-600',
//         'bg-gradient-to-br from-teal-400 to-teal-600',
//     ];
//     return colors[(id - 1) % colors.length];
// };

// export default function Qualifier() {
//     const [selectedRound, setSelectedRound] = useState(1); // Start with Round 1
//     const [searchTerm, setSearchTerm] = useState("");
//     const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//     const [roundsData, setRoundsData] = useState(dummyRoundsData);
    
//     const totalQualifiers = roundsData.reduce((sum, round) => sum + round.qualifiers.length, 0);
    
//     // Get current round data and apply search filter
//     const getCurrentRoundData = () => {
//         const data = roundsData[selectedRound - 1]?.qualifiers || [];
        
//         return data.filter(qualifier =>
//             qualifier.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             qualifier.id.toString().includes(searchTerm)
//         );
//     };
    
//     const currentRoundData = getCurrentRoundData();

//     const handleDelete = (qualifierId: number) => {
//         if (confirm(`Are you sure you want to remove qualifier ID ${qualifierId}?`)) {
//             setRoundsData(prevData => 
//                 prevData.map(round => ({
//                     ...round,
//                     qualifiers: round.qualifiers.filter(q => q.id !== qualifierId)
//                 }))
//             );
//         }
//     };

//     // Get qualifiers for a specific round
//     const getRoundQualifiers = (roundNumber: number) => {
//         return roundsData.find(r => r.roundNumber === roundNumber)?.qualifiers || [];
//     };
    
//     return (
//         <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//             <EventNavBar />
//             <main className="flex-1 p-6 md:p-10">
//                 {/* Header Section */}
//                 <div className="mb-8">
//                     <h1 className="text-4xl font-bold text-gray-800 mb-2">Qualifier Rounds</h1>
//                     <p className="text-gray-600">Manage and track participants across all qualification rounds</p>
//                 </div>
                
//                 {/* Round Selector Tabs - Fixed */}
//                 <div className="sticky top-0 z-10 mb-6 bg-white rounded-xl shadow-lg p-4">
//                     <div className="flex flex-wrap gap-3">
//                         {roundsData.map((round) => (
//                             <button
//                                 key={round.roundNumber}
//                                 onClick={() => setSelectedRound(round.roundNumber)}
//                                 className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
//                                     selectedRound === round.roundNumber
//                                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md scale-105'
//                                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                 }`}
//                             >
//                                 Round {round.roundNumber}
//                             </button>
//                         ))}
//                     </div>
//                 </div>


//                 {/* Search and View Toggle */}
//                 <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         {/* Search Bar */}
//                         <div className="flex-1 relative">
//                             <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                             <input
//                                 type="text"
//                                 placeholder="Search by username or ID..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
//                             />
//                         </div>

//                         {/* View Toggle */}
//                         <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
//                             <button
//                                 onClick={() => setViewMode("grid")}
//                                 className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                                     viewMode === "grid"
//                                         ? 'bg-white text-blue-600 shadow-sm'
//                                         : 'text-gray-600 hover:text-gray-800'
//                                 }`}
//                             >
//                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                                 </svg>
//                             </button>
//                             <button
//                                 onClick={() => setViewMode("list")}
//                                 className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                                     viewMode === "list"
//                                         ? 'bg-white text-blue-600 shadow-sm'
//                                         : 'text-gray-600 hover:text-gray-800'
//                                 }`}
//                             >
//                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Qualifiers Display */}
//                 <div className="bg-white rounded-xl shadow-lg p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//                         <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-3 py-1 mr-3 text-sm font-semibold">
//                             {currentRoundData.length}
//                         </span>
//                         {roundsData[selectedRound - 1]?.roundName}
//                     </h2>

//                     {viewMode === "grid" ? (
//                         /* Grid View */
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                             {currentRoundData.map((qualifier, index) => (
//                                 <div 
//                                     key={qualifier.id} 
//                                     className="relative group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-200"
//                                 >
//                                     <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md">
//                                         #{index + 1}
//                                     </div>
                                    
//                                     <div className="flex items-center space-x-4">
//                                         <div className={`${getColor(qualifier.id)} rounded-full w-14 h-14 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
//                                             {getInitials(qualifier.username)}
//                                         </div>
                                        
//                                         <div className="flex-1 min-w-0">
//                                             <p className="text-sm text-gray-500 font-medium">ID: {qualifier.id}</p>
//                                             <p className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
//                                                 {qualifier.username}
//                                             </p>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="mt-3 flex items-center justify-between">
//                                         <div className="flex items-center text-green-600 text-sm font-medium">
//                                             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                             </svg>
//                                             Qualified
//                                         </div>
//                                         <button
//                                             onClick={() => handleDelete(qualifier.id)}
//                                             className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors duration-200"
//                                             title="Remove qualifier"
//                                         >
//                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         /* List View */
//                         <div className="space-y-3">
//                             {currentRoundData.map((qualifier, index) => (
//                                 <div
//                                     key={qualifier.id}
//                                     className="group flex items-center justify-between bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
//                                 >
//                                     <div className="flex items-center space-x-4 flex-1 min-w-0">
//                                         <div className={`${getColor(qualifier.id)} rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300`}>
//                                             {getInitials(qualifier.username)}
//                                         </div>

//                                         <div className="flex-1 min-w-0">
//                                             <p className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
//                                                 {qualifier.username}
//                                             </p>
//                                             <p className="text-sm text-gray-500 font-medium">ID: {qualifier.id}</p>
//                                         </div>

//                                         <div className="flex-shrink-0 inline-flex items-center bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
//                                             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                             </svg>
//                                             Qualified
//                                         </div>

//                                         <button
//                                             onClick={() => handleDelete(qualifier.id)}
//                                             className="flex-shrink-0 text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-all duration-200"
//                                             title="Remove qualifier"
//                                         >
//                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {currentRoundData.length === 0 && (
//                         <div className="text-center py-12">
//                             <svg className="mx-auto w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                             </svg>
//                             <p className="text-gray-500 text-lg">No qualifiers found</p>
//                             <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }