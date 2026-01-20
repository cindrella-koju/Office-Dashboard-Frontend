import { useState } from "react"
import useFetch from "../../../../hooks/useFetch"
import { ADD_PARTICIPANTS, RETEIEVE_NOT_PARTICIPANTS } from "../../../../constants/urls"

interface ParticipantsModuleType{
    eventId : string | null
}

interface NotParticipantsType{
    id : string,
    username : string
}
export default function ParticipantsModule({ eventId  }:ParticipantsModuleType) {
    const [selectedPlayer, setSelectedPlayer] = useState<string[]>([])
    const {data : users } = useFetch<NotParticipantsType[]>(eventId ? RETEIEVE_NOT_PARTICIPANTS(eventId) : "")
    const handlePlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIds = Array.from(e.target.selectedOptions).map(
            option => option.value
        )
        setSelectedPlayer(selectedIds)
    }

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        try{
            const response = await fetch(eventId ? ADD_PARTICIPANTS(eventId) : "", {
                method : "POST",
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    "user_id" : selectedPlayer
                })
            });
            if (response.ok) {
                alert('Participants Added successfully!');
                window.location.reload();
            } else {
                alert('Failed to Add Participants.');
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

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Add Participants
                    </h2>
                    <button 
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 font-semibold text-sm">
                            Players <span className="text-red-500">*</span>
                        </label>

                        <select
                            multiple
                            value={selectedPlayer}
                            onChange={handlePlayerSelect}
                            className="w-full border rounded-lg px-4 py-2 min-h-[150px]"
                        >
                            {
                                users &&
                                    users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.username}
                                    </option>
                            ))}
                        </select>
                    </div>

                    {selectedPlayer.length > 0 && (
                        <div className="mb-5">
                            <p className="text-sm font-semibold mb-2">
                                Selected Players ({selectedPlayer.length})
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {selectedPlayer.map(id => {
                                    const player = users && users.find(u => u.id === id)
                                    return (
                                        <span
                                            key={id}
                                            className="px-3 py-1 bg-blue-100 rounded-full flex items-center gap-2"
                                        >
                                            {player?.username}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedPlayer(prev =>
                                                        prev.filter(pId => pId !== id)
                                                    )
                                                }
                                                className="font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    )}

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
