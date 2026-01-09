import { useEffect, useState } from "react";
import AnimatedScore from "../../components/animateScore";

export default function ScoreBoard() {
    const [firstUserScore, setFirstUserScore] = useState<number>(30);
    const [secondUserScore, setSecondUserScore] = useState<number>(20);
    // Time in Seconds
    const [time, setTime ] = useState<number>(343)
    const [timer,setTimer] = useState<boolean>(false)


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
        <div className="h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
            <div className="h-[90%] w-[90%] bg-slate-100 rounded-2xl shadow-2xl flex flex-col">
                <h1 className="font-extrabold text-5xl text-center pt-8 text-slate-800 tracking-wide">
                    Table Tennis
                </h1>

                {/* <div className="flex gap-4 justify-center mt-6">
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg">Start</button>
                    <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg">Pause</button>
                    <button className="px-6 py-2 bg-red-600 text-white rounded-lg">Reset</button>
                </div> */}

                {timer && <div className="mt-6 flex items-center justify-center">
                    <div className="px-8 py-4 bg-slate-900 text-white rounded-xl text-4xl font-mono shadow-lg">
                        {formatTime(time)}
                    </div>
                </div>}

                 <div className="flex-1 flex items-center justify-center gap-20 px-10">
                    <div className="h-[75%] w-[35%] bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center">
                        <AnimatedScore value={firstUserScore}/>
                        <h2 className="text-3xl uppercase tracking-widest text-slate-500">
                            User 1
                        </h2>
                    </div>

                    <h1 className="text-5xl font-black text-slate-600">VS</h1>

                    <div className="h-[75%] w-[35%] bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center">
                        <AnimatedScore value={secondUserScore}/>
                        <h2 className="text-3xl uppercase tracking-widest text-slate-500">
                            User 2
                        </h2>
                    </div>
                 </div>
            </div>
        </div>
    )
}