import { useEffect, useState } from "react";
import { getRound, getRoundByEventWithColumn } from "../services/round.service";
import { getStandingColumn } from "../services/tiesheet.service";
import type { Round } from "../type/group.type";
import type { RoundData } from "../type/round.type";
import type { StandingColumnType } from "../type/standingcolumn.type";
import extractHeaders from "../utils/extractHeader";

export const useStandingColumn = (eventId: string | null) => {
  const [round_by_event, setRoundByEvent] = useState<Round[]>([]);
  const [rounds, setRounds] = useState<RoundData[]>([]);
  const [standingColumn, setStandingColumn] = useState<StandingColumnType[]>([]);
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [tableHead, setTableHead] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"create" | "edit" | null>(null);
  const [colVal, setColVal] = useState<StandingColumnType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roundId = selectedRound ? selectedRound.id : rounds?.[0]?.id;

  // Fetch round_by_event
  useEffect(() => {
    if (!eventId) return;

    const fetchRoundByEvent = async () => {
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

    fetchRoundByEvent();
  }, [eventId]);

  // Fetch rounds
  useEffect(() => {
    if (!eventId) return;

    const fetchRounds = async () => {
      try {
        const data = await getRound(eventId);
        setRounds(data);
      } catch (err) {
        console.error("Error fetching rounds:", err);
      }
    };

    fetchRounds();
  }, [eventId]);

  // Fetch standing column data
  useEffect(() => {
    if (!roundId) return;

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

    fetchStandingColumn();
  }, [roundId]);

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
  };
};
