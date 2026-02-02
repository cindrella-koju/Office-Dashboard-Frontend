import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import useFetch from "../../hooks/useFetch"
import {
  CREATE_TIESHEET,
  GET_ROUNDS_BY_EVENT,
  RETRIEVE_QUALIFIER_BY_ROUND,
  RETRIEVE_STANDING_COLUMN,
  GET_TIESHEET_BY_ID,
  UPDATE_TIESHEET
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

  const { data: qualifier } = useFetch<QualifierResponse[]>(
    roundId ? RETRIEVE_QUALIFIER_BY_ROUND(roundId) : ""
  )

  const { data: standingColumns } = useFetch<StandingColumnType[]>(
    roundId ? RETRIEVE_STANDING_COLUMN(roundId) : ""
  )

  const { data: matchDetails } = useFetch<any>(
    viewMode === "edit" && matchId ? GET_TIESHEET_BY_ID(matchId) : ""
  )

  const [selectedUsers, setSelectedUsers] = useState<
    { id: string; name: string }[]
  >([])

  const [selectedMatch, setSelectedMatch] = useState<SelectedMatch>({
    stage_id: "",
    players: [],
    scheduled_date: "",
    scheduled_time: "",
    status: "scheduled"
  })

  /* Populate form with match details in edit mode */
  useEffect(() => {
    if (viewMode === "edit" && matchDetails) {
      setRoundID(matchDetails.stage_id)
      const round = rounds?.find(r => r.id === matchDetails.stage_id)
      if (round) setRoundName(round.name)
      
      setSelectedMatch({
        stage_id: matchDetails.stage_id,
        players: matchDetails.player_info?.map((p: any) => p.user_id) || [],
        scheduled_date: matchDetails.scheduled_date,
        scheduled_time: matchDetails.scheduled_time,
        status: matchDetails.status,
        player_columns: matchDetails.player_info?.map((p: any) => ({
          user_id: p.user_id,
          columns: p.columns?.map((c: any) => ({
            column_id: standingColumns?.find(sc => sc.column_field === c.column_name)?.id || "",
            value: c.value
          })) || [],
          is_winner: p.is_winner
        })) || []
      })

      setSelectedUsers(
        matchDetails.player_info?.map((p: any) => ({
          id: p.user_id,
          name: p.username
        })) || []
      )
    }
  }, [viewMode, matchDetails, rounds, standingColumns])

  /* Reset players & date/time when round changes */
  useEffect(() => {
    if (!roundId || viewMode === "edit") return

    setSelectedMatch(prev => ({
      ...prev,
      stage_id: roundId,
      players: [],
      scheduled_date: "",
      scheduled_time: ""
    }))
    setSelectedUsers([])
  }, [roundId, viewMode])

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

  return (
    <ModalWrapper
      title={viewMode === "create" ? "Create TieSheet" : "Edit TieSheet"}
      onClose={() => setviewMode(null)}
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
            }}
          />
        )}

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
              {qualifier?.map(user => (
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

        {/* Standing Columns - Only show in edit mode */}
        {viewMode === "edit" && standingColumns && standingColumns.length > 0 && selectedUsers.length > 0 && (
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Player Statistics (Enter values for each player)
            </label>
            <div className="space-y-4">
              {selectedUsers.map((user) => {
                const playerData = selectedMatch.player_columns?.find(p => p.user_id === user.id)
                
                return (
                  <div key={user.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">{user.name}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {standingColumns.map((column) => {
                        const columnValue = playerData?.columns?.find(c => c.column_id === column.id)
                        const previousValue = matchDetails?.player_info?.find((p: any) => p.user_id === user.id)?.columns?.find((c: any) => c.column_name === column.column_field)?.value
                        
                        return (
                          <div key={column.id}>
                            <label className="block mb-1 text-xs font-medium text-gray-700">
                              {column.column_field}
                              {previousValue && (
                                <span className="ml-2 text-gray-500 font-normal">(Previous: {previousValue})</span>
                              )}
                            </label>
                            <input
                              type="text"
                              placeholder={previousValue || column.default_value || "0"}
                              value={columnValue?.value || ""}
                              onChange={(e) => {
                                const val = e.target.value
                                setSelectedMatch(prev => {
                                  const updatedPlayerColumns = prev.player_columns?.map(p => {
                                    if (p.user_id === user.id) {
                                      const existingColumns = p.columns || []
                                      const columnIdx = existingColumns.findIndex(c => c.column_id === column.id)
                                      
                                      if (columnIdx >= 0) {
                                        existingColumns[columnIdx] = { column_id: column.id, value: val }
                                      } else {
                                        existingColumns.push({ column_id: column.id, value: val })
                                      }
                                      
                                      return { ...p, columns: existingColumns }
                                    }
                                    return p
                                  }) || [
                                    ...selectedUsers.map(u => ({
                                      user_id: u.id,
                                      columns: u.id === user.id ? [{ column_id: column.id, value: val }] : [],
                                      is_winner: false
                                    }))
                                  ]
                                  
                                  return { ...prev, player_columns: updatedPlayerColumns }
                                })
                              }}
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        )
                      })}
                      <div className="col-span-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedMatch.player_columns?.find(p => p.user_id === user.id)?.is_winner || false}
                            onChange={(e) => {
                              setSelectedMatch(prev => {
                                const updatedPlayerColumns = prev.player_columns?.map(p => 
                                  p.user_id === user.id ? { ...p, is_winner: e.target.checked } : { ...p, is_winner: false }
                                ) || selectedUsers.map(u => ({
                                  user_id: u.id,
                                  columns: [],
                                  is_winner: u.id === user.id ? e.target.checked : false
                                }))
                                
                                return { ...prev, player_columns: updatedPlayerColumns }
                              })
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="font-medium text-gray-700">Winner</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )
              })}
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