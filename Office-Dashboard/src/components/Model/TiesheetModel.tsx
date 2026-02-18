import {  type Dispatch, type SetStateAction } from "react"
import ModalWrapper from "../pages/shared/ModelWrapper"
import SelectField from "../pages/shared/SelectField"
import FormField from "../pages/shared/FormField"
import type { ModelType } from "../../type/main.type"
import Button from "../ui/Button"
import { useTiesheet, type TiesheetQualifierResponse } from "../../hooks/tiesheet/useTiesheet"

interface selectedUser{
  id : string,
  name: string
}


interface TiesheetProps {
  viewMode: ModelType
  roundId : string,
  setRoundID : Dispatch<SetStateAction<string>>,
  setRoundName : Dispatch<SetStateAction<string>>,
  setGroupName : Dispatch<SetStateAction<string | null>>,
  setGroupId : Dispatch<SetStateAction<string>> ,
  groupId : string,
  setSelectedUsers : Dispatch<SetStateAction<selectedUser[]>>,
  selectedUsers : selectedUser[],
  selectedMatch : SelectedMatch,
  setSelectedMatch : Dispatch<SetStateAction<SelectedMatch>>,
  users : TiesheetQualifierResponse [] | undefined;
  handleSubmit : (e:React.FormEvent) => void;
  handleClose : () => void;
  groupInfo : RoundResponse[]
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

export interface SelectedMatch {
  stage_id: string
  group_id : string
  players: string[]
  scheduled_date: string
  scheduled_time: string
  status: "scheduled" | "completed" | "ongoing"
  player_columns?: PlayerColumnData[]
}

export interface RoundResponse {
  id: string
  name: string
}

export default function TiesheetModel({
  viewMode,
  roundId,
  setRoundID,
  setRoundName,
  setGroupName,
  setGroupId,
  groupId,
  setSelectedUsers,
  selectedUsers,
  selectedMatch,
  setSelectedMatch,
  users,
  handleSubmit,
  handleClose,
  groupInfo
}: TiesheetProps) {
  const {
    rounds,
  } = useTiesheet()

  const statusOptions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "Completed", value: "completed" },
    { label : "Ongoing", value : "ongoing"}
  ] as const


  return (
    <ModalWrapper
      title={viewMode === "create" ? "Create TieSheet" : "Edit TieSheet"}
      onClose={() => handleClose()}
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
          onChange={val => {
            setRoundID(val)
            const round = rounds?.find(r => r.id === val)
            if (round) setRoundName(round.name)
              setGroupId("")
          }}
          disable={viewMode === "edit"}
        />

        {
          groupInfo && groupInfo?.length > 0 && (
            <SelectField
              label="Group"
              required
              value={groupId}
              options={groupInfo.map(r => ({
                value: r.id,
                label: r.name
              }))}
              onChange={val => {
                setGroupId(val)
                const group = groupInfo.find(r => r.id === val)
                if (group) setGroupName(group.name)
              }}
              disable={viewMode === "edit"}
            />
          )
        }



        {/* Status */}
        {
          viewMode === "create" && (
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
          )
        }

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
