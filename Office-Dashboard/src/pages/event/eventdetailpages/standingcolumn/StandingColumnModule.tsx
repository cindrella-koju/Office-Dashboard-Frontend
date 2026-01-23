import React, { useState, type Dispatch, type SetStateAction } from "react"
import { ADD_STANDING_COLUMN, RETRIEVE_ROUNDS } from "../../../../constants/urls"
import useFetch from "../../../../hooks/useFetch"

interface StandingColumnModule{
    viewMode : "create" | "edit" | null,
    eventId : string | null,
    setViewMode : Dispatch<SetStateAction<'create' | 'edit' | null>>;
}

export interface RoundType{
    id : string,
    name : string,
    round_order : string
}

export default function StandingColumnModule({viewMode, eventId, setViewMode}:StandingColumnModule){
    const { data:rounds } = useFetch<RoundType[]>(eventId ? RETRIEVE_ROUNDS(eventId) : "")
    const [columnDetail,setColumnDetail] = useState({
        stage_id : "",
        column_field : "",
        default_value : ""
    })

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        console.log("Column Detail:",columnDetail)

        try{
            const url = viewMode === "create" ? ADD_STANDING_COLUMN : ADD_STANDING_COLUMN

            const method = viewMode === "create" ? "POST" : "PATCH"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    columnDetail
                ),
            })

            if(response.ok){
                alert(`Column ${viewMode === "create" ? "created" : "updated"} successfully!`)
                setColumnDetail({ stage_id: "", column_field: "", default_value : "" })
                // window.location.reload()
            } else {
                alert(`Failed to ${viewMode === "create" ? "create" : "update"} column.`)
            }
        }catch (error) {
            console.error("Error submitting form:", error)
            alert("Failed to save round. Please try again.")
        }
    }
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {viewMode === "edit" ? "Edit Column" : "Create Column"}
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
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Round <span className="text-red-500">*</span>
                        </label>
                        <select
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200"
                            onChange={(e) => {
                              setColumnDetail((prev) => ({ ...prev, stage_id: e.target.value }));
                            }}
                        >
                            <option value="">Select Round</option>
                            {rounds && rounds.map((round) => (
                            <option key={round.id} value={round.id}>
                                {round.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                        Column Name <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Enter column name"
                        value={columnDetail.column_field}
                        onChange={(e) =>
                            setColumnDetail((prev) => ({ ...prev, column_field: e.target.value }))
                        }
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                        Default Value <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        placeholder="Enter default value"
                        value={columnDetail.default_value}
                        onChange={(e) =>
                            setColumnDetail((prev) => ({ ...prev, default_value: e.target.value }))
                        }
                        required
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                        type="submit"
                        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                        {viewMode === "create" ? "Create Column" : "Update Column"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}