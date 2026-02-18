import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import {
  ADD_STANDING_COLUMN,
  EDIT_STANDING_COLUMN,
  RETRIEVE_ROUNDS
} from "../../constants/urls"
import useFetch from "../../hooks/useFetch"
import ModalWrapper from "../pages/shared/ModelWrapper"
import SelectField from "../pages/shared/SelectField"
import FormField from "../pages/shared/FormField"
import Button from "../ui/Button"
import type { StandingColumnType } from "../../type/standingcolumn.type"

interface StandingColumnModuleProps {
  viewMode: "create" | "edit" | null
  eventId: string | null
  setViewMode: Dispatch<SetStateAction<"create" | "edit" | null>>
  colVal?: StandingColumnType
}

export interface RoundType {
  id: string
  name: string
}

interface ColumnDetail {
  id: string
  stage_id: string
  column_field: string
  default_value: string
  to_show: "True" | "False" // store as string
}

export default function StandingColumnModal({
  viewMode,
  eventId,
  setViewMode,
  colVal
}: StandingColumnModuleProps) {
  const { data: rounds } = useFetch<RoundType[]>(
    eventId ? RETRIEVE_ROUNDS(eventId) : ""
  )

  const showOptions = [
    { value: "True", label: "True" },
    { value: "False", label: "False" }
  ]

  const [columnDetail, setColumnDetail] = useState<ColumnDetail>({
    id: "",
    stage_id: "",
    column_field: "",
    default_value: "",
    to_show: "False" // default as string
  })

  useEffect(() => {
    if (viewMode === "create") {
      setColumnDetail({
        id: "",
        stage_id: "",
        column_field: "",
        default_value: "",
        to_show: "False"
      })
    }

    if (viewMode === "edit" && colVal) {
      setColumnDetail({
        id: colVal.id,
        stage_id: colVal.stage_id,
        column_field: colVal.column_field,
        default_value: colVal.default_value,
        to_show: colVal.to_show ? "True" : "False" // convert boolean to string
      })
    }
  }, [viewMode, colVal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url =
        viewMode === "create"
          ? ADD_STANDING_COLUMN
          : EDIT_STANDING_COLUMN(columnDetail.id)

      const payload =
        viewMode === "create"
          ? {
              stage_id: columnDetail.stage_id,
              column_field: columnDetail.column_field,
              default_value: columnDetail.default_value,
              to_show: columnDetail.to_show // string "True" or "False"
            }
          : columnDetail

      const response = await fetch(url, {
        method: viewMode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error("Failed to save column")
      }

      alert(`Column ${viewMode === "create" ? "created" : "updated"} successfully!`)
      setViewMode(null)
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    }
  }

  return (
    <ModalWrapper
      title={viewMode === "edit" ? "Edit Column" : "Create Column"}
      onClose={() => setViewMode(null)}
    >
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Show Column"
          value={columnDetail.to_show} // "True" or "False"
          onChange={(val) =>
            setColumnDetail(prev => ({ ...prev, to_show: val as "True" | "False" }))
          }
          options={showOptions}
          required
        />

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
