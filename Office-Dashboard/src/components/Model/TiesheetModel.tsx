import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import useFetch from "../../hooks/useFetch"
import {
  CREATE_TIESHEET,
  GET_ROUNDS_BY_EVENT,
  RETRIEVE_QUALIFIER_BY_ROUND
} from "../../constants/urls"
import ModalWrapper from "../pages/shared/ModelWrapper"
import SelectField from "../pages/shared/SelectField"
import FormField from "../pages/shared/FormField"
import type { ModelType } from "../../type/main.type"
import Button from "../ui/Button"


interface TiesheetProps {
  setviewMode: Dispatch<SetStateAction<ModelType>>;
  viewMode : ModelType;
  eventId: string;
  modelType? : "individual" | "group" | "withingroup"
}

interface QualifierResponse {
  id: string
  username: string
}

interface SelectedMatch {
  stage_id: string
  players: string[]
  scheduled_date: string
  scheduled_time: string
}

interface RoundResponse {
  id: string
  name: string
}

export default function TiesheetModel({ viewMode, eventId, setviewMode, modelType = "group" }: TiesheetProps) {

  const { data: rounds } = useFetch<RoundResponse[]>(
    eventId ? GET_ROUNDS_BY_EVENT(eventId) : ""
  )

  const [roundId, setRoundID] = useState("")
  const { data: qualifier } = useFetch<QualifierResponse[]>(
    roundId ? RETRIEVE_QUALIFIER_BY_ROUND(roundId) : ""
  )
  
  // const {data:group} = useFetch(roundId ? RETRIEVE_GROUP_BY_ROUND(roundId) : "")

  const [selectedUsers, setSelectedUsers] = useState<
    { id: string; name: string }[]
  >([])

  const [selectedMatch, setSelectedMatch] = useState<SelectedMatch>({
    stage_id: "",
    players: [],
    scheduled_date: "",
    scheduled_time: ""
  })

  /* Reset when round changes */
  useEffect(() => {
    setSelectedMatch({
      stage_id: roundId,
      players: [],
      scheduled_date: "",
      scheduled_time: ""
    })
    setSelectedUsers([])
  }, [roundId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (viewMode !== "create") return

    try {
      const response = await fetch(CREATE_TIESHEET, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedMatch)
      })

      if (response.ok) {
        alert("Tiesheet created successfully!")
        window.location.reload()
      } else {
        alert("Failed to create tiesheet")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  if (!viewMode) return null

  return (
    <ModalWrapper
      title={viewMode === "create" ? "Create TieSheet" : "Edit TieSheet"}
      onClose={() => {setviewMode(null)}}
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Round */}
        <SelectField
          label="Round"
          required
          value={roundId}
          options={rounds?.map(r => ({
            value: r.id,
            label: r.name
          }))}
          onChange={(val) => {
            setRoundID(val)
            setSelectedMatch(prev => ({ ...prev, stage_id: val }))
          }}
        />
        
        {
          modelType === "group" && (
            <SelectField
              label="Group"
              required
              value={roundId}
              options={rounds?.map(r => ({
                value: r.id,
                label: r.name
              }))}
              onChange={(val) => {
                setRoundID(val)
                setSelectedMatch(prev => ({ ...prev, stage_id: val }))
              }}
            />
          )
        }

        {/* Match Between */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Match Between <span className="text-red-500">*</span>
          </label>

          <select
            multiple
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            onChange={(e) => {
              const members = Array.from(e.target.selectedOptions).map(opt => ({
                id: opt.value,
                name: opt.text
              }))

              setSelectedUsers(members)
              setSelectedMatch(prev => ({
                ...prev,
                players: members.map(m => m.id)
              }))
            }}
          >
            {qualifier?.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Members */}
        {selectedUsers.length > 0 && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Selected Members
            </label>

            <div className="flex flex-wrap gap-2">
              {selectedUsers.map(user => (
                <span
                  key={user.id}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                >
                  {user.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Match Date */}
        <FormField
          label="Match Date"
          type="date"
          required
          value={selectedMatch.scheduled_date}
          onChange={(val) =>
            setSelectedMatch(prev => ({ ...prev, scheduled_date: val }))
          }
        />

        {/* Match Time */}
        <FormField
          label="Match Time"
          type="time"
          required
          value={selectedMatch.scheduled_time}
          onChange={(val) =>
            setSelectedMatch(prev => ({ ...prev, scheduled_time: val }))
          }
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" fullWidth>
            {viewMode === "create" ? "Create" : "Update"}
          </Button>
        </div>

      </form>
    </ModalWrapper>
  )
}
