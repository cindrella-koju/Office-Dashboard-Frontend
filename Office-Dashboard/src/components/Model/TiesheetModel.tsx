import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import useFetch from "../../hooks/useFetch"
import {
  CREATE_TIESHEET,
  GET_ROUNDS_BY_EVENT,
  RETRIEVE_QUALIFIER_BY_ROUND,
  RETRIEVE_STANDING_COLUMN,
  GET_TIESHEET_BY_ID,
  UPDATE_TIESHEET,
  RETRIEVE_GROUP_ID_NAME_BY_ROUND,
  RETRIEVE_GROUP_MEMBER_ID_NAME
} from "../../constants/urls"
import ModalWrapper from "../pages/shared/ModelWrapper"
import SelectField from "../pages/shared/SelectField"
import FormField from "../pages/shared/FormField"
import type { ModelType } from "../../type/main.type"
import type { StandingColumnType } from "../../type/standingcolumn.type"
import Button from "../ui/Button"

interface TiesheetProps {
  setviewMode: Dispatch<SetStateAction<ModelType>>
  viewMode: ModelType
  eventId: string
  matchId?: string | null
}

interface QualifierResponse {
  id: string
  username: string
}

interface ColumnValue {
  column_id: string
  value: string
}

interface PlayerColumnData {
  user_id: string
  columns: ColumnValue[]
  is_winner: boolean
}

interface SelectedMatch {
  stage_id: string
  group_id : string
  players: string[]
  scheduled_date: string
  scheduled_time: string
  status: "scheduled" | "completed" | "ongoing"
  player_columns?: PlayerColumnData[]
}

interface RoundResponse {
  id: string
  name: string
}

export default function TiesheetModel({
  viewMode,
  eventId,
  setviewMode,
  matchId
}: TiesheetProps) {
  /* Status options: UI label vs stored value */
  const statusOptions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "Completed", value: "completed" },
    { label : "Ongoing", value : "ongoing"}
  ] as const

  const { data: rounds } = useFetch<RoundResponse[]>(
    eventId ? GET_ROUNDS_BY_EVENT(eventId) : ""
  )

  const [roundId, setRoundID] = useState("")
  const [roundName, setRoundName] = useState("")
  const [groupId, setGroupId] = useState<string>("")
  const [groupName, setGroupName ] = useState<string | null>("")
  const [users, setUsers] = useState<QualifierResponse[]>()

  const { data: qualifier } = useFetch<QualifierResponse[]>(
    roundId ? RETRIEVE_QUALIFIER_BY_ROUND(roundId) : ""
  )
  const { data: group_member } = useFetch<QualifierResponse[]>(
    groupId ? RETRIEVE_GROUP_MEMBER_ID_NAME(groupId) : ""
  )
  const { data: standingColumns } = useFetch<StandingColumnType[]>(
    roundId ? RETRIEVE_STANDING_COLUMN(roundId) : ""
  )

  const { data: group_info } = useFetch<RoundResponse[]>(roundId ? RETRIEVE_GROUP_ID_NAME_BY_ROUND(roundId) : "")

  const { data: matchDetails } = useFetch<any>(
    viewMode === "edit" && matchId ? GET_TIESHEET_BY_ID(matchId) : ""
  )

  const [selectedUsers, setSelectedUsers] = useState<
    { id: string; name: string }[]
  >([])


  const [selectedMatch, setSelectedMatch] = useState<SelectedMatch>({
    stage_id: "",
    group_id :"",
    players: [],
    scheduled_date: "",
    scheduled_time: "",
    status: "scheduled"
  })

  useEffect(() => {
    if (group_member) {
      setUsers(group_member);
    } else if (qualifier) {
      setUsers(qualifier);
    }
  }, [qualifier, group_member]);

  /* Populate form with match details in edit mode */
  useEffect(() => {
    if (viewMode === "edit" && matchDetails) {
      setRoundID(matchDetails.stage_id)
      const round = rounds?.find(r => r.id === matchDetails.stage_id)
      const group = group_info?.find(r => r.id === matchDetails.group_id)
      if (round) setRoundName(round.name)
      if (group) setGroupName(group.name)

        console.log("Group name:", group?.name)
      setSelectedMatch({
        stage_id: matchDetails.stage_id,
        group_id : matchDetails.group_id,
        players: matchDetails.player_info?.map((p: any) => p.user_id) || [],
        scheduled_date: matchDetails.scheduled_date,
        scheduled_time: matchDetails.scheduled_time,
        status: matchDetails.status,
      })

      setSelectedUsers(
        matchDetails.player_info?.map((p: any) => ({
          id: p.user_id,
          name: p.username
        })) || []
      )
    }
  }, [viewMode , matchDetails, rounds, standingColumns])

  /* Reset players & date/time when round changes */
  useEffect(() => {
    if (!roundId || viewMode === "edit") return

    setSelectedMatch(prev => ({
      ...prev,
      stage_id: roundId,
      group_id : groupId ? groupId : "",
      players: [],
      scheduled_date: "",
      scheduled_time: ""
    }))
    setSelectedUsers([])
  }, [roundId, viewMode, groupId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedMatch.players.length < 2) {
      alert("Please select at least 2 players")
      return
    }

    /* Final payload – status guaranteed lowercase */
    const payload = {
      ...selectedMatch,
      status: selectedMatch.status.toLowerCase()
    }

    // console.log("Payload:",payload)
    try {
      const url = viewMode === "create" ? CREATE_TIESHEET : UPDATE_TIESHEET(matchId!)
      const method = viewMode === "create" ? "POST" : "PUT"
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        alert(`Tiesheet ${viewMode === "create" ? "created" : "updated"} successfully!`)
        setviewMode(null)
        window.location.reload()
      } else {
        alert(`Failed to ${viewMode === "create" ? "create" : "update"} tiesheet`)
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  if (!viewMode) return null
 const handleClose = () => {
   setSelectedMatch({
     stage_id: "",
     group_id :"",
     players: [],
     scheduled_date: "",
     scheduled_time: "",
     status: "scheduled"
   })
   setGroupName(null)
  setviewMode(null)
 }

 console.log("Group Name:", groupName)
  return (
    <ModalWrapper
      title={viewMode === "create" ? "Create TieSheet" : "Edit TieSheet"}
      onClose={() => handleClose()}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Round */}
        {viewMode === "edit" ? (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Round
            </label>
            <input
              type="text"
              value={roundName}
              disabled
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-gray-100 cursor-not-allowed"
            />
          </div>
        ) : (
          <SelectField
            label="Round"
            required
            value={roundId}
            options={rounds?.map(r => ({
              value: r.id,
              label: r.name
            }))}
            onChange={val => {
              setRoundID(val)
              const round = rounds?.find(r => r.id === val)
              if (round) setRoundName(round.name)
                setGroupId("" )
            }}
          />
        )}

          { viewMode === "edit" ? (
            groupName && 
            (<div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Group
              </label>
              <input
                type="text"
                value={groupName}
                disabled
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-gray-100 cursor-not-allowed"
              />
            </div>)
          ) : (
            group_info && group_info?.length > 0 && (
              <SelectField
                label="Group"
                required
                value={groupId}
                options={group_info.map(r => ({
                  value: r.id,
                  label: r.name
                }))}
                onChange={val => {
                  setGroupId(val)
                  const group = group_info.find(r => r.id === val)
                  if (group) setGroupName(group.name)
                }}
              />
            )
          )
      }



        {/* Status */}
        <SelectField
          label="Status"
          required
          value={selectedMatch.status}
          options={[...statusOptions]}
          onChange={val =>
            setSelectedMatch(prev => ({
              ...prev,
              status: val.toLowerCase() as "scheduled" | "completed"
            }))
          }
        />

        {/* Match Between - Only show in create mode */}
        {viewMode === "create" && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Match Between <span className="text-red-500">*</span>
            </label>

            <select
              multiple
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              onChange={e => {
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
              {users?.map(user => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Selected Members */}
        {selectedUsers.length > 0 && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {viewMode === "edit" ? "Players" : "Selected Members"}
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
          onChange={val =>
            setSelectedMatch(prev => ({
              ...prev,
              scheduled_date: val
            }))
          }
        />

        {/* Match Time */}
        <FormField
          label="Match Time"
          type="time"
          required
          value={selectedMatch.scheduled_time}
          onChange={val =>
            setSelectedMatch(prev => ({
              ...prev,
              scheduled_time: val
            }))
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