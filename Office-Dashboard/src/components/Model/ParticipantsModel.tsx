import { useState, type Dispatch, type SetStateAction } from "react"
import useFetch from "../../hooks/useFetch"
import {
  ADD_PARTICIPANTS,
  RETEIEVE_NOT_PARTICIPANTS
} from "../../constants/urls"
import ModalWrapper from "../pages/shared/ModelWrapper"
import MultiSelect from "../pages/shared/MultiSelect"
import type { ModelType } from "../../type/main.type"


interface ParticipantsModuleType {
  eventId: string | null,
  setModelType : Dispatch<SetStateAction<ModelType>>
}

interface User {
  id: string
  username: string
}

export default function ParticipantsModule({ eventId , setModelType}: ParticipantsModuleType) {
  const [selected, setSelected] = useState<string[]>([])

  const { data: users } = useFetch<User[]>(
    eventId ? RETEIEVE_NOT_PARTICIPANTS(eventId) : ""
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(
        eventId ? ADD_PARTICIPANTS(eventId) : "",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: selected })
        }
      )

      if (res.ok) {
        alert("Participants added successfully!")
        window.location.reload()
      } else {
        alert("Failed to add participants")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  return (
    <ModalWrapper title="Add Participants" onClose={() => setModelType(null)}>
      <form onSubmit={handleSubmit}>
        <MultiSelect
          label="Players"
          options={users?.map(u => ({
            id: u.id,
            label: u.username
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
