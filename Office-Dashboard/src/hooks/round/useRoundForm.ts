import { useEffect, useState } from "react"
import type { RoundData } from "../../type/round.type"

export const useRoundForm = ( initial?: RoundData) => {
    const [roundDetail, setRoundDetail] = useState<RoundData>({
        id : "",
        name : ""
    })
    const [originalRounds, setOriginalRounds] = useState<RoundData | null>(null)

    useEffect(() => {
        if (!initial) return;

        setOriginalRounds(initial)
        setRoundDetail({
            id : initial.id,
            name :  initial.name,
        })
    },[initial])

    const getChangedFields = (
        original: RoundData | null,
        current: typeof roundDetail
    ) => {
        if (!original) return {}; 
        const changed: Partial<typeof roundDetail> = {};
        (Object.keys(current) as (keyof typeof roundDetail)[]).forEach((key) => {
            if (
                key !== "id" &&
                current[key] !== (original as any)[key]
            ) {
                changed[key] = current[key] as any;
            }
        });
        return changed;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRoundDetail((prev) => ({ ...prev, [name]: value }));
    };

    const closeFunction = () => {
        setRoundDetail({
            id : "",
            name : "",
        })
    }
    return{
        roundDetail,
        setRoundDetail,
        originalRounds,
        setOriginalRounds,
        getChangedFields,
        handleChange,
        closeFunction
    }
}