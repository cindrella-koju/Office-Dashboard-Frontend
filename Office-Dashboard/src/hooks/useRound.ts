import { useEffect, useState } from "react"
import { GET_ROUNDS_BY_EVENT } from "../constants/urls";

interface Round {
  id: string
  name: string
}

const useRound = (eventId: string): Round[] => {
  const [rounds, setRounds] = useState<Round[]>([])

  useEffect(() => {
    if (!eventId) return;

    fetch(GET_ROUNDS_BY_EVENT(eventId))
      .then(res => res.json())
      .then(data => {
        if (data.round) {
          setRounds(data.round)
        }
      })
      .catch(err => console.error("Error fetching rounds:", err))
  }, [eventId])

  return rounds
}

export default useRound
