import { useEffect, useState } from "react";
import { getRound, getRoundByEventWithColumn } from "../services/round.service";
import { getStandingColumn } from "../services/tiesheet.service";
import type { Round } from "../type/group.type";
import type { StandingColumnType } from "../type/standingcolumn.type";
import extractHeaders from "../utils/extractHeader";
import type { ColumnDetail } from "../components/Model/StandingColumnModel";
import { createStandingColumn, updateStandingColumn } from "../services/column.service";
import { useToast } from "../context/ToastContext";

export const useStandingColumn = (eventId: string | null) => {
  const { showToast } = useToast()
  const [round_by_event, setRoundByEvent] = useState<Round[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [standingColumn, setStandingColumn] = useState<StandingColumnType[]>([]);
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [tableHead, setTableHead] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"create" | "edit" | null>(null);
  const [colVal, setColVal] = useState<StandingColumnType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const roundId = selectedRound ? selectedRound.id : rounds?.[0]?.id;
  const [columnDetail, setColumnDetail] = useState<ColumnDetail>({
    id: "",
    stage_id: "",
    column_field: "",
    default_value: "",
  })
  const fetchRoundByEvent = async () => {
    if (!eventId) return;
    try {
      const data = await getRoundByEventWithColumn(eventId);
      setRoundByEvent(data);
      if (data.length > 0) {
        setSelectedRound(data[0]);
      }
    } catch (err) {
      console.error("Error fetching round by event:", err);
    }
  };

  const fetchRounds = async () => {
    if (!eventId) return;
    try {
      const data = await getRound(eventId);
      setRounds(data);
    } catch (err) {
      console.error("Error fetching rounds:", err);
    }
  };

  useEffect(() => {
    fetchRoundByEvent();
    fetchRounds();
  }, [eventId]);

  const fetchStandingColumn = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStandingColumn(roundId);
      const headers = extractHeaders(data);
      setTableHead(headers);
      setStandingColumn(data);
    } catch (err) {
      setError((err as Error).message);
      console.error("Error fetching standing column:", err);
    } finally {
      setLoading(false);
    }
  };
  // Fetch standing column data
  useEffect(() => {
    if (!roundId) return;
    fetchStandingColumn();
  }, [roundId, selectedRound]);

  useEffect(() => {
    if (viewMode === "create") {
      setColumnDetail({
        id: "",
        stage_id: "",
        column_field: "",
        default_value: "",
      })
    }

    if (viewMode === "edit" && colVal) {
      setColumnDetail({
        id: colVal.id,
        stage_id: colVal.stage_id,
        column_field: colVal.column_field,
        default_value: colVal.default_value,
      })
    }
  }, [viewMode, colVal])
  const createColumn = async(payload :ColumnDetail) => {
    await createStandingColumn(payload, showToast);
    fetchStandingColumn()
  }

  const editColumn = async(id: string, payload:ColumnDetail) => {
    await updateStandingColumn(id, payload, showToast);
    fetchStandingColumn()
  }
  return {
    round_by_event,
    rounds,
    standingColumn,
    selectedRound,
    tableHead,
    viewMode,
    colVal,
    loading,
    error,
    setSelectedRound,
    setStandingColumn,
    setViewMode,
    setColVal,
    createColumn,
    editColumn,
    columnDetail,
    setColumnDetail
  };
};
