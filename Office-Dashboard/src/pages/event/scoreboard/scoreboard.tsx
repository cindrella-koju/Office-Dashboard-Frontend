import { useEffect, useState } from "react";
import AnimatedScore from "../../../components/animateScore";
import { MdEmojiEvents, MdTimer } from "react-icons/md";
import { FaPause, FaPlay, FaRedo, FaTrophy } from "react-icons/fa";
import { usePermissions } from "../../../hooks/userPermission";
import type { LeaderType } from "./scoreboard.type";
import { IncDcrButton } from "./scoreboard.services";

export default function ScoreBoard() {
    const permissions = usePermissions('scoreboard')
    const [timer,setTimer] = useState<boolean>(true)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [firstUserScore, setFirstUserScore] = useState<number>(20);
    const [secondUserScore, setSecondUserScore] = useState<number>(20);


    const winnerUser : LeaderType = firstUserScore > secondUserScore ? "user1" : secondUserScore > firstUserScore ? "user2" : "tie";
    // Time in Seconds
    const [time, setTime ] = useState<number>(343)


    const formatTime = (seconds:number) => {
        const min = Math.floor(seconds / 60)
        const sec = seconds % 60
        return `${min} : ${sec.toString().padStart(2,"0")}`
    }
    useEffect(() => {
    const scoreInterval = setInterval(() => {
        setFirstUserScore((prev) => prev + Math.floor(Math.random() * 3 - 1))
        setSecondUserScore((prev) => prev + Math.floor(Math.random() * 3 - 1))
    }, 3000)

    return () => clearInterval(scoreInterval)
    }, [])

    return(
        <div className="flex min-h-screen bg-gray-100">
            <main className="flex-1 p-4 sm:p-6 md:p-10">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 h-full">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
                         <div className="flex items-center gap-3">
                            <MdEmojiEvents className="text-indigo-600 text-3xl sm:text-4xl" />
                            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 tracking-wide">
                                Table Tennis
                            </h1>
                        </div>
                        
                        {
                            timer && (
                                <div className="flex gap-2 sm:gap-3">
                                    <button 
                                        className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-white shadow-md transition-all ${
                                            isRunning
                                                ? "bg-yellow-500 hover:bg-yellow-600"
                                                : "bg-green-500 hover:bg-green-600"
                                        }`}
                                    >
                                        {isRunning ? (
                                            <span className="flex items-center gap-2">
                                                <FaPause /> <span className="hidden sm:inline">Pause</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <FaPlay /> <span className="hidden sm:inline">Start</span>
                                            </span>
                                        )}
                                    </button>
                                    <button className="px-4 sm:px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-md transition-all">
                                        <span className="flex items-center gap-2">
                                            <FaRedo /> <span className="hidden sm:inline">Reset</span>
                                        </span>
                                    </button>
                                </div>
                            )
                        }
                    </div>

                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                        <div className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white rounded-xl shadow-lg flex items-center gap-3">
                            {
                                timer && 
                                    <MdTimer className="text-2xl sm:text-3xl" />
                            }
                            <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold">
                                {
                                    timer ? (
                                        formatTime(time)
                                    ) : (
                                        <h1>Round 2</h1>
                                    )
                                }
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12 h-[80%]">
                        <div
                            className={`w-full h-[80%] lg:w-[40%] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all ${
                                winnerUser === "user1" ? "ring-4 ring-indigo-500 scale-105" : ""
                            }`}
                        >
                            { winnerUser === "user1" && (
                                <FaTrophy className="text-yellow-500 text-3xl sm:text-4xl mb-2 animate-bounce" />
                            )}
                            <div className="relative">
                                <AnimatedScore value={firstUserScore} />
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-gray-700 mt-2 sm:mt-4">
                                Player 1
                            </h2>
                            {
                                permissions.canEdit && (
                                    <IncDcrButton setUserScore={setFirstUserScore} />

                                )
                            }
                        </div>
                        
                        <div className="flex items-center justify-center">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-indigo-600">
                                VS
                            </h1>
                        </div>
                        
                        <div
                            className={`w-full h-[80%] lg:w-[40%] bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all ${
                                winnerUser === "user2" ? "ring-4 ring-red-500 scale-105" : ""
                            }`}
                        >
                            {
                                winnerUser == "user2" && (
                                    <FaTrophy className="text-yellow-500 text-3xl sm:text-4xl mb-2 animate-bounce"/>
                                )
                            }
                            <div className="relative">
                                <AnimatedScore value={secondUserScore} />
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-gray-700 mt-2 sm:mt-4">
                                Player 2
                            </h2>
                            {
                                permissions.canEdit && (
                                    <IncDcrButton setUserScore={setSecondUserScore} />
                                )
                            }
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}



