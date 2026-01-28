import { useState, type Dispatch, type SetStateAction } from "react"
import useFetch from "../../../../hooks/useFetch"
import {
  ADD_QUALIFIER,
  GET_ROUNDS_BY_EVENT,
  RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER
} from "../../../../constants/urls"
import type { Round } from "../group/group.type"
import ModalWrapper from "../../../../components/pages/shared/ModelWrapper"
import MultiSelect from "../../../../components/pages/shared/MultiSelect"
import type { ModelType } from "../../../../type/main.type"

interface QualifierModelType {
  eventID: string | null,
  setModelType : Dispatch<SetStateAction<ModelType>>
}

interface Participant {
  user_id: string
  username: string
}

export default function QualifierModule({ eventID, setModelType }: QualifierModelType) {
  const [roundId, setRoundId] = useState<string>("")
  const [selected, setSelected] = useState<string[]>([])

  const { data: rounds } = useFetch<Round[]>(
    eventID ? GET_ROUNDS_BY_EVENT(eventID) : ""
  )

  const { data: participants } = useFetch<Participant[]>(
    eventID && roundId
      ? RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER(eventID, roundId)
      : ""
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(
        eventID && roundId ? ADD_QUALIFIER(eventID, roundId) : "",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: selected })
        }
      )

      if (res.ok) {
        alert("Qualifier added successfully!")
        window.location.reload()
      } else {
        alert("Failed to add qualifier")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  return (
    <ModalWrapper title="Add Qualifier" onClose={() => setModelType(null)}>
      <form onSubmit={handleSubmit}>

        {/* Round Select */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-sm">
            Round <span className="text-red-500">*</span>
          </label>

          <select
            value={roundId}
            onChange={e => {
              setRoundId(e.target.value)
              setSelected([])
            }}
            required
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Round</option>
            {rounds?.map(r => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Players */}
        <MultiSelect
          label="Players"
          options={participants?.map(p => ({
            id: p.user_id,
            label: p.username
          }))}
          value={selected}
          onChange={setSelected}
          required
        />

        <div className="flex justify-end">
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add
          </button>
        </div>

      </form>
    </ModalWrapper>
  )
}
