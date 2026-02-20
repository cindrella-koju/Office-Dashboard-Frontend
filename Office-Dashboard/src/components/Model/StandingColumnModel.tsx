import React, { type Dispatch, type SetStateAction } from "react"
import ModalWrapper from "../pages/shared/ModelWrapper"
import SelectField from "../pages/shared/SelectField"
import FormField from "../pages/shared/FormField"
import Button from "../ui/Button"
import type { RoundData } from "../../type/round.type"

interface StandingColumnModuleProps {
  viewMode: "create" | "edit" | null
  setViewMode: Dispatch<SetStateAction<"create" | "edit" | null>>
  rounds : RoundData[];
  handleSubmit : ( e:React.FormEvent ) => void;
  columnDetail : ColumnDetail;
  setColumnDetail : Dispatch<SetStateAction<ColumnDetail>>
}

export interface RoundType {
  id: string
  name: string
}

export interface ColumnDetail {
  id: string
  stage_id: string
  column_field: string
  default_value: string
}

export default function StandingColumnModal({
  viewMode,
  setViewMode,
  rounds,
  handleSubmit,
  columnDetail,
  setColumnDetail
}: StandingColumnModuleProps) {

  

  return (
    <ModalWrapper
      title={viewMode === "edit" ? "Edit Column" : "Create Column"}
      onClose={() => setViewMode(null)}
    >
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Round"
          value={columnDetail.stage_id}
          onChange={(val) =>
            setColumnDetail(prev => ({ ...prev, stage_id: val }))
          }
          options={rounds?.map(r => ({
            value: r.id,
            label: r.name
          }))}
          required
        />

        <FormField
          label="Column Name"
          placeholder="Enter column name"
          value={columnDetail.column_field}
          onChange={(val) =>
            setColumnDetail(prev => ({ ...prev, column_field: val }))
          }
          required
        />

        <FormField
          label="Default Value"
          placeholder="Enter default value"
          value={columnDetail.default_value}
          onChange={(val) =>
            setColumnDetail(prev => ({ ...prev, default_value: val }))
          }
          required
        />

        <div className="flex justify-end mt-6">
          <Button type="submit">
            {viewMode === "create" ? "Create Column" : "Update Column"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  )
}
