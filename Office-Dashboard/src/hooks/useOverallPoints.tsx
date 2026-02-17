import { useEffect, useState } from "react";
import { getRound, getRoundByEvent } from "../services/round.service";
import { getOverallTiesheet } from "../services/tiesheet.service";
import type { Round } from "../type/group.type";
import type { RoundData } from "../type/round.type";
import type { UserType } from "../components/pages/overallpoints/OverallPointTable";

export interface OverallPointResponse {
  round_name: string;
  users: UserType[];
}

export const useOverallPoints = (eventId: string | null) => {
  const [round_by_event, setRoundByEvent] = useState<Round[]>([]);
  const [rounds, setRounds] = useState<RoundData[]>([]);
  const [overallpoints, setOverallPoints] = useState<OverallPointResponse[]>([]);
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roundId = selectedRound ? selectedRound.id : rounds?.[0]?.id;

  // Fetch round_by_event
  useEffect(() => {
    if (!eventId) return;

    const fetchRoundByEvent = async () => {
      try {
        const data = await getRoundByEvent(eventId);
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

  // Fetch overall tiesheet data
  useEffect(() => {
    if (!eventId || !roundId) return;

    const fetchOverallTiesheet = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getOverallTiesheet(eventId, roundId);
        setOverallPoints(data);
      } catch (err) {
        setError((err as Error).message);
        console.error("Error fetching overall tiesheet:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverallTiesheet();
  }, [eventId, roundId]);

  return {
    round_by_event,
    rounds,
    overallpoints,
    selectedRound,
    loading,
    error,
    setSelectedRound,
    setOverallPoints,
  };
};
