import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import * as addMatchServices from "../../services/tiesheet.service";
import { type AddMatchProps, type AddMatchResponse, type PlayerInfoType } from "../../type/tiesheet.type";
import type { ModelType } from "../../type/main.type";
import { useToast } from "../../context/ToastContext";

export const useAddMAtch = ( 
    players : PlayerInfoType[], 
    // player2: PlayerInfoType,
    tiesheetId : string,
    scoreView : ModelType,
    status : string,
    setScoreView : Dispatch<SetStateAction<ModelType>>
) => {
    const { showToast } = useToast()
    const [editTiesheetDetail, setEditTiesheetDetail] = useState<AddMatchResponse>()
    const [showPoints, setShowPoints] = useState(false);
    const [showWinner, setShowWinner] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [matchDetail, setMatchDetail] = useState<AddMatchProps>({
        overallwinner: "",
        status: status,
        tiesheet_id: tiesheetId,
        matchDetail: [
            {
            match_id: "",
            match_name: "",
            userDetail: players.map((p) => ({
                user_id: p.user_id,
                points: "",
                winner: false,
            })),
            },
        ],
    });


    useEffect(() => {
        if (!editTiesheetDetail) return;

        const formattedData = {

            overallwinner: editTiesheetDetail.overallwinner || "",
            status: editTiesheetDetail.status || "scheduled",
            tiesheet_id: tiesheetId,
            matchDetail: editTiesheetDetail.matchDetail.map((match: any) => ({
            match_id : match.match_id || "",
            match_name: match.match_name || "",
            userDetail: match.userDetail.map((user: any) => ({
                user_id: user.user_id,
                points: user.points ?? "",
                winner: user.winner ?? false,
            })),
            })),
        };

        setMatchDetail(formattedData);
        setLoading(false);
    }, [editTiesheetDetail, tiesheetId]);


    const fetchMatchByTiesheetId = async() => {
        if(scoreView === "create") return;
        try{
            setLoading(true);
            const data = await addMatchServices.getMatchByTiesheetId(tiesheetId)
            setEditTiesheetDetail(data)
        } catch(err:any){
                setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const createMatch = async( payload : AddMatchProps ) => {
        await addMatchServices.createMatch(payload, showToast);
        setScoreView(null)
    }

    const updateMatch = async(payload : AddMatchProps) => {
        await addMatchServices.updateMatch(payload, showToast);
        setScoreView(null)
    }

    useEffect(() => {
        fetchMatchByTiesheetId()
    },[tiesheetId])


    const addMatch = () => {
        setMatchDetail((prev) => ({
            ...prev,
            matchDetail: [
            ...prev.matchDetail,
            {
                match_name: "",
                userDetail: players.map((p) => ({
                user_id: p.user_id,
                points: "",
                winner: false,
            })),
            },
            ],
        }));
    };

    const removeMatch = (index: number) => {
        if (matchDetail.matchDetail.length <= 1) return;
        setMatchDetail((prev) => ({
        ...prev,
        matchDetail: prev.matchDetail.filter((_, i) => i !== index),
        }));
    };

    const updateMatchName = (index: number, value: string) => {
        setMatchDetail((prev) =>
        ({
            ...prev,
            matchDetail: prev.matchDetail.map((match, mIdx) =>    
            mIdx === index ? { ...match, match_name: value } : match
            ),
        } as any)
        );
    };


    const updatePoints = (
        matchIndex: number,
        userIndex: number,
        value: string
    ) => {
        setMatchDetail((prev) => {
        const updatedMatches = prev.matchDetail.map((match, mIdx) => {
            if (mIdx === matchIndex) {
            const updatedUserDetail = match.userDetail.map((user, uIdx) =>
                uIdx === userIndex ? { ...user, points: value } : user
            );

            // Auto-select winner based on points if both players have points
            const player1Points = parseFloat(updatedUserDetail[0].points) || 0;
            const player2Points = parseFloat(updatedUserDetail[1].points) || 0;

            if (updatedUserDetail[0].points && updatedUserDetail[1].points) {
                if (player1Points > player2Points) {
                updatedUserDetail[0].winner = true;
                updatedUserDetail[1].winner = false;
                } else if (player2Points > player1Points) {
                updatedUserDetail[0].winner = false;
                updatedUserDetail[1].winner = true;
                }
            }

            return {
                ...match,
                userDetail: updatedUserDetail,
            };
            }
            return match;
        });

        return {
            ...prev,
            matchDetail: updatedMatches,
        };
        });
    };

    const updateWinner = (matchIndex: number, winnerIndex: number) => {
        setMatchDetail((prev) =>
            ({
            ...prev,
            matchDetail: prev.matchDetail.map((match, mIdx) =>
                mIdx === matchIndex
                ? {
                    ...match,
                    userDetail: match.userDetail.map((user, uIdx) => ({
                        ...user,
                    winner: uIdx === winnerIndex,
                    })),
                }
                : match
            )}
        ));
    };

    return{
        loading,
        error,

        matchDetail,
        setMatchDetail,
        showPoints,
        setShowPoints,
        showWinner,
        setShowWinner,
        addMatch,
        updateMatchName,
        removeMatch,
        updatePoints,
        updateWinner,

        createMatch,
        updateMatch
    }
}