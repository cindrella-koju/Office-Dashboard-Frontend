import { useEffect, useState } from "react";
import { usePermissions, type EventPermission } from "../userPermission"
import { type PlayerInfoType, type TiesheetType } from "../../type/tiesheet.type";
import * as tiesheetServices from "../../services/tiesheet.service";
import type { Round } from "../../type/group.type";
import { getRoundByEvent } from "../../services/round.service";
import { getQualifierByRound } from "../../services/qualifier.service";
import { getGroupIdNameByRound, getGroupMemberIdName } from "../../services/group.service";
import { type StandingColumnType } from "../../type/standingcolumn.type";
import {type RoundResponse, type SelectedMatch } from "../../components/Model/TiesheetModel";
import { useToast } from "../../context/ToastContext";
import type { ModelType } from "../../type/main.type";
import {type MatchInfo } from "../../components/pages/tiesheet/MatchDetail";

export interface TiesheetQualifierResponse {
  id: string
  username: string
}
export const useTiesheet = () => {
    const {showToast } = useToast()
    const eventId = localStorage.getItem("eventId");
    const permissions = usePermissions<EventPermission>({withinevent : true})
    const [tiesheet, setTiesheet] = useState<TiesheetType[]>([])
    const [showMatchDetail, setShowMatchDetail] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false)
    const [tiesheetId, settiesheetId ] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<'create' | 'edit' | null>(null);
    const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
    const [loading, setLoading ] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // For Filter
    const [selectedFilterRound,setSelectedFilterRound] = useState<Round | null>(null)

    // For tiesheet model
    const [rounds, setRounds] = useState<Round[]>([])
    // Qualifier ko qualifier response hunu parxa 
    // Fix this
    const [qualifierUser,setQualifierUser] = useState<TiesheetQualifierResponse[]>([])
    const [groupMember, setGroupMember] = useState<TiesheetQualifierResponse[]>([])
    const [users, setUsers] = useState<TiesheetQualifierResponse[]>([])
    const [roundId, setRoundID] = useState<string>("")
    const [groupId, setGroupId] = useState<string>("")
    const [standingColumns, setStandingColumns] = useState<StandingColumnType[]>([])
    const [groupInfo, setGroupInfo] = useState<RoundResponse[]>([])
    const [matchDetails, setMatchDetails] = useState<any>()
    const [roundName, setRoundName] = useState<string>("")
    const [groupName, setGroupName ] = useState<string | null>("")
    const [selectedUsers, setSelectedUsers] = useState<
        { id: string; name: string }[]
    >([])
    const [tiesheetUser, setTiesheetUser] = useState<PlayerInfoType[]>([])
    
    const [scoreView, setScoreView] = useState<ModelType>(null);
    // For Match
    const [matchInfo, setMatchInfo] = useState<MatchInfo[]>([])

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedMatch, setSelectedMatch] = useState<SelectedMatch>({
        stage_id: "",
        group_id :"",
        players: [],
        scheduled_date: getTodayDate(),
        scheduled_time: "",
        tbd_number : "",
        status: "scheduled",
        tbd_user_ids :[],
        edit_user_info : []
    })

    const fetchTiesheet = async() => {
        if(!eventId) return;
        try{
            setLoading(true)
            const data = await tiesheetServices.getTiesheet(eventId)
            setTiesheet(data)
            // setTiesheetUser(data.player_info)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchTiesheetByStage = async() => {
        if(!eventId) return;
        if(!selectedFilterRound) return;
        try{
            setLoading(true)
            const data = await tiesheetServices.getTiesheetByStage(eventId, selectedFilterRound.id)
            setTiesheet(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }
 
    const fetchRound = async() => {
        if(!eventId) return;
        try{
            setLoading(true)
            const data = await getRoundByEvent(eventId);
            setRounds(data)
            setSelectedFilterRound( { id: "all", name: "All" })
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchQualifierByRound = async() => {
        if(!roundId) return;
        try{
            setLoading(true)
            const data = await getQualifierByRound(roundId)
            setQualifierUser(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchGroupMemberIdName = async() => {
        if(!groupId) return;
        try{
            setLoading(true)
            const data = await getGroupMemberIdName(groupId)
            setGroupMember(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchStandingColumn = async() => {
        if(!roundId) return;
        try{
            setLoading(true)
            const data = await tiesheetServices.getStandingColumn(roundId)
            setStandingColumns(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchGroupIdNameByRound = async() => {
        if(!roundId) return;
        try{
            setLoading(true)
            const data = await getGroupIdNameByRound(roundId)
            setGroupInfo(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchTiesheetById = async() => {
        if(!selectedMatchId) return;
        try{
            setLoading(true)
            const data = await tiesheetServices.getTiesheetById(selectedMatchId)
            setMatchDetails(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    const fetchMatch = async( ) => {
        if(!tiesheetId) return;

        try{
            setLoading(true)
            const data = await tiesheetServices.getMatch(tiesheetId)
            setMatchInfo(data)
        } catch(err:any){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMatch()
    },[showMatchDetail])

    useEffect(() => {
        if(groupMember.length>0){
            setUsers(groupMember)
        } else if(qualifierUser.length>0) {
            setUsers(qualifierUser)
        }
    },[qualifierUser, groupMember])
    // Group the tiesheet based on round
    const groupedByStage = tiesheet && (tiesheet.reduce((acc, tiesheet) => {
        const stage = tiesheet.stage_name;
        if (!acc[stage]) {
            acc[stage] = [];
        }
        acc[stage].push(tiesheet);
        return acc;
    }, {} as Record<string, typeof tiesheet>));

    const handleEditMatch = (matchId: string) => {
        setSelectedMatchId(matchId);
        setViewMode("edit");
    };


    const handleMatchDetailView = (status : string, tiesheet_id : string) => {
        {
            status === "completed" && setShowMatchDetail(true)
        }

        settiesheetId(tiesheet_id)
    }

     /* Populate form with match details in edit mode */
    useEffect(() => {
        if (viewMode === "edit" && matchDetails) {
        setRoundID(matchDetails.stage_id)
        const round = rounds?.find(r => r.id === matchDetails.stage_id)
        const group = groupInfo?.find(r => r.id === matchDetails.group_id)
        if (round) setRoundName(round.name)
        if (group) setGroupName(group.name)

        setSelectedMatch({
            stage_id: matchDetails.stage_id,
            group_id : matchDetails.group_id,
            players: matchDetails.player_info?.map((p: any) => p.user_id) || [],
            scheduled_date: matchDetails.scheduled_date,
            scheduled_time: matchDetails.scheduled_time,
            status: matchDetails.status,
            tbd_number : matchDetails.tbd_number,
            tbd_user_ids : matchDetails.tbd_user_ids,
            edit_user_info : matchDetails.edit_user_info
        })

        setSelectedUsers(
            matchDetails.player_info?.map((p: any) => ({
            id: p.user_id,
            name: p.username
            })) || []
        )
        }
    }, [viewMode , matchDetails, rounds, standingColumns])

    useEffect(() => {
        if(viewMode !== "edit") return;
        
        const tiesheetplayer = tiesheet.filter(user => user.id === selectedMatchId);
        setTiesheetUser(tiesheetplayer[0]?.player_info || []);
    },[viewMode])

      /* Reset players & date/time when round changes */
    useEffect(() => {
        if (!roundId || viewMode === "edit") return

        setSelectedMatch(prev => ({
        ...prev,
        stage_id: roundId,
        group_id : groupId ? groupId : "",
        players: [],
        scheduled_date: selectedMatch.scheduled_date,
        scheduled_time: ""
        }))
        setSelectedUsers([])
    }, [roundId, viewMode, groupId])

    const createTiesheet = async(payload:SelectedMatch) => {
        await tiesheetServices.createTiesheet(payload, showToast);
        fetchTiesheet();
    }

    const updateTiesheet = async(matchId : string, payload: SelectedMatch) => {
        await tiesheetServices.updateTiesheet(matchId, payload, showToast);
        fetchTiesheet()
        setTiesheetUser([])
    }

    const deleteTiesheet = async(tiesheetId : string) => {
        await tiesheetServices.deleteTiesheet(tiesheetId, showToast);
        fetchTiesheet()
    }

    const deleteTiesheetTBD = async(tiesheetplayerId : string) => {
        await tiesheetServices.deleteTiesheetPlayer(tiesheetplayerId, showToast);
        fetchTiesheet();
        setViewMode("edit")
    }

    const deleteMatch = async( matchId: string) => {
        await tiesheetServices.deleteMatch( matchId, showToast);
        fetchTiesheet()
    }

    useEffect(() => {
        fetchTiesheet()
        fetchRound()
    },[])
    
    useEffect(() => {
        fetchQualifierByRound()
        fetchStandingColumn()
        fetchGroupIdNameByRound()
    },[roundId])
    
    useEffect(() => {
        fetchGroupMemberIdName()
    },[groupId])

    useEffect(() => {
        fetchTiesheetById()
    },[selectedMatchId, roundId])

    const handleEditScore = () => {
        setScoreView("edit")
    }

    const handleCreateScore = () => {
        setScoreView("create")
    }

    useEffect(() => {
        if(selectedFilterRound && selectedFilterRound.id != "all"){
            fetchTiesheetByStage()
        }else{
            fetchTiesheet()
        }
    },[scoreView, selectedFilterRound])
    
    return{
        permissions,
        setViewMode,
        groupedByStage,
        handleEditMatch,
        tiesheet,
        viewMode, 
        eventId,
        showMatchDetail,
        showDelete,
        setShowMatchDetail,
        tiesheetId,
        setShowDelete,
        selectedMatchId,
        handleMatchDetailView,
        rounds,
        qualifierUser,
        standingColumns,
        groupInfo,
        setGroupInfo,
        matchDetails,
        users,
        loading,
        error,

        roundName,
        roundId,
        setRoundID,
        setRoundName,
        setGroupName,
        setGroupId,
        groupName,
        groupId,
        setSelectedUsers,
        selectedUsers,
        selectedMatch,
        setSelectedMatch,
        setMatchDetails,
        setUsers,

        createTiesheet,
        updateTiesheet,
        deleteTiesheet,
        deleteMatch,

        setScoreView,
        scoreView,
        handleCreateScore,
        handleEditScore,

        matchInfo,

        selectedFilterRound,
        setTiesheet,
        setSelectedFilterRound,

        tiesheetUser,
        deleteTiesheetTBD
    }
}