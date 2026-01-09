import { useEffect, useRef, useState } from "react";

export default function AnimatedScore({ value } : {value : number}){
    const prev = useRef(value)
    const [direction,setDirection] = useState<"up" | "down" | null>(null)

    useEffect(() => {
        if (value > prev.current) setDirection("up")
        else if (value < prev.current) setDirection("down")
        prev.current = value
    },[value])

    return (
        <span 
            key={value}
            className = {`inline-block text-[17rem] font-extrabold text-red-200 leading-none ${
                direction === "up"? "animate-up" : direction === "down" ? "animate-down" : "" 
            }`}
        >
            {value}
        </span>
    )
}