import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { CREATE_ROUND, EDIT_ROUND } from "../../../../constants/urls"

interface RoundModuleType {
  viewMode: "create" | "edit" | null
  setViewMode: Dispatch<SetStateAction<"create" | "edit" | null>>
  eachRoundValue?: RoundData | null
  eventId: string | null
}

export interface RoundData {
  id: string
  name: string
  round_order : number
}

export default function RoundModule({
  viewMode,
  setViewMode,
  eachRoundValue,
  eventId
}: RoundModuleType) {
  const [roundDetail, setRoundDetail] = useState({
    name: "",
    round_order : "",
  })

  useEffect(() => {
    if (viewMode === "edit" && eachRoundValue) {
      setRoundDetail({
        name : eachRoundValue.name,
        round_order: eachRoundValue.round_order.toString(),
      })
    }

    if (viewMode === "create") {
      setRoundDetail({ name: "", round_order: "" })
    }
  }, [viewMode, eachRoundValue])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const finalData = {
      ...roundDetail,
      round_order: Number(roundDetail.round_order),
    }

    try {
      if (!eventId) throw new Error("Event ID is missing")

      const url =
        viewMode === "create"
          ? CREATE_ROUND(eventId)
          : EDIT_ROUND(eachRoundValue?.id ?? "")
      const method = viewMode === "create" ? "POST" : "PATCH"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            finalData
        ),
      })

      if (response.ok) {
        alert(`Round ${viewMode === "create" ? "created" : "updated"} successfully!`)
        setRoundDetail({ name: "", round_order: "" })
        window.location.reload()
      } else {
        alert(`Failed to ${viewMode === "create" ? "create" : "update"} round.`)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to save round. Please try again.")
    }

    setViewMode(null)
  }

  if (!viewMode) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {viewMode === "edit" ? "Edit Round" : "Create Round"}
          </h2>
          <button
            onClick={() => setViewMode(null)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold text-sm">
              Round Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={roundDetail.name}
              onChange={(e) =>
                setRoundDetail((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold text-sm">
              Order Index <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={roundDetail.round_order}
              onChange={(e) =>
                setRoundDetail((prev) => ({ ...prev, round_order: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {viewMode === "create" ? "Create Round" : "Update Round"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
