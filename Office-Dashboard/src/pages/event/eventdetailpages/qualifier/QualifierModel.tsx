import { useState } from "react"
import { ADD_PARTICIPANTS, ADD_QUALIFIER, GET_ROUNDS_BY_EVENT, RETRIEVE_PARTICIPANTS, RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER } from "../../../../constants/urls"
import useFetch from "../../../../hooks/useFetch"
import type { Round } from "../group/group.type"


interface QualifierModelType {
  eventID: string | null
}

interface ParticipantNotInQualifier{
    user_id : string
    username : string
}

export default function QualifierModule({ eventID }: QualifierModelType) {
  const { data: rounds } = useFetch<Round[]>(
    eventID ? GET_ROUNDS_BY_EVENT(eventID) : ""
  )

  const [roundId, setRoundId] = useState<string>()

  const { data: participants } = useFetch<ParticipantNotInQualifier[]>(
    eventID && roundId ? RETRIEVE_USER_PARTICIPANT_NOT_IN_QUALIFIER(eventID,roundId) : ""
  )

  const [formData, setFormData] = useState({
    stage_id: "",
    user_id: [] as string[]
  })

  const handlePlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(e.target.selectedOptions).map(
      option => option.value
    )

    setFormData(prev => ({
      ...prev,
      user_id: selectedIds
    }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
        const response = await fetch(eventID && roundId ? ADD_QUALIFIER(eventID,roundId) : "",{
            method : "POST",
            headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    "user_id" : formData.user_id
                })
        })
        if (response.ok) {
            alert('Qualifier Added successfully!');
            window.location.reload();
        } else {
            alert('Failed to Add Qualifier');
        }
    }
    catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to save group. Please try again.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Qualifier
          </h2>
          <button className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Round Select */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-semibold text-sm">
              Round Name <span className="text-red-500">*</span>
            </label>

            <select
              value={formData.stage_id}
              onChange={(e) =>
                {
                    setFormData(prev => ({
                    ...prev,
                    stage_id: e.target.value
                    }))

                    setRoundId(e.target.value)
                }
              }
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Round</option>
              {rounds?.map(round => (
                <option key={round.id} value={round.id}>
                  {round.name}
                </option>
              ))}
            </select>
          </div>

          {/* Players Multi Select */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-sm">
              Players <span className="text-red-500">*</span>
            </label>

            <select
              multiple
              value={formData.user_id}
              onChange={handlePlayerSelect}
              className="w-full border rounded-lg px-4 py-2 min-h-[150px]"
              required
            >
              {participants?.map(user => (
                <option key={user.user_id} value={user.user_id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Players */}
          {formData.user_id.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2">
                Selected Players ({formData.user_id.length})
              </p>

              <div className="flex flex-wrap gap-2">
                {formData.user_id.map(id => {
                  const player = participants?.find(
                    u => u.user_id === id
                  )

                  return (
                    <span
                      key={id}
                      className="px-3 py-1 bg-blue-100 rounded-full flex items-center gap-2"
                    >
                      {player?.username}
                      <button
                        type="button"
                        className="font-bold"
                        onClick={() =>
                          setFormData(prev => ({
                            ...prev,
                            user_id: prev.user_id.filter(pid => pid !== id)
                          }))
                        }
                      >
                        ×
                      </button>
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
