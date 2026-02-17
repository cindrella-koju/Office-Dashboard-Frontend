import { useEffect, useState } from "react";
import { usePermissions, type EventPermission } from "../userPermission";
import { type TiesheetType, type PlayerInfoType } from "../../type/tiesheet.type";
import * as tiesheetServices from "../../services/tiesheet.service";
import type { ModelType } from "../../type/main.type";
import { type MatchInfo } from "../../components/pages/tiesheet/MatchDetail";

export const useTodayGame = () => {
  const eventId = localStorage.getItem("eventId");
  const permissions = usePermissions<EventPermission>({ withinevent: true });

  const [tiesheet, setTiesheet] = useState<TiesheetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showMatchDetail, setShowMatchDetail] = useState<boolean>(false);
  const [scoreView, setScoreView] = useState<ModelType>(null);
  const [tiesheetId, setTiesheetId] = useState<string | null>(null);
  const [matchInfo, setMatchInfo] = useState<MatchInfo[]>([]);
  const [editingTiesheet, setEditingTiesheet] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [players, setPlayers] = useState<PlayerInfoType[] | undefined>(undefined);

  const fetchTodayTiesheet = async () => {
    if (!eventId) return;
    try {
      setLoading(true);
      const data = await tiesheetServices.getTodayTiesheet(eventId);
      setTiesheet(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatch = async () => {
    if (!tiesheetId) return;
    try {
      const data = await tiesheetServices.getMatch(tiesheetId);
      setMatchInfo(data);
    } catch (err) {
      console.error("Error fetching match:", err);
    }
  };

  useEffect(() => {
    fetchTodayTiesheet();
  }, [eventId]);

  useEffect(() => {
    if (showMatchDetail) {
      fetchMatch();
    }
  }, [showMatchDetail, tiesheetId]);

  const groupedByStage = tiesheet && tiesheet.reduce((acc, tiesheet) => {
    const stage = tiesheet.stage_name;
    if (!acc[stage]) {
      acc[stage] = [];
    }
    acc[stage].push(tiesheet);
    return acc;
  }, {} as Record<string, typeof tiesheet>);

  const handleMatchDetailView = (matchStatus: string, tiesheet_id: string) => {
    if (matchStatus === "completed") {
      setShowMatchDetail(true);
      setTiesheetId(tiesheet_id);
    }
  };

  const handleAddScore = (match: TiesheetType) => {
    setScoreView("create");
    setEditingTiesheet(match.id);
    setStatus(match.status);
    setPlayers(match.player_info);
  };

  const handleEditScore = (match: TiesheetType) => {
    setScoreView("edit");
    setEditingTiesheet(match.id);
    setStatus(match.status);
    setPlayers(match.player_info);
  };

  return {
    permissions,
    tiesheet,
    loading,
    error,
    groupedByStage,
    showMatchDetail,
    setShowMatchDetail,
    scoreView,
    setScoreView,
    matchInfo,
    editingTiesheet,
    setEditingTiesheet,
    status,
    setStatus,
    players,
    setPlayers,
    handleMatchDetailView,
    handleAddScore,
    handleEditScore,
  };
};
