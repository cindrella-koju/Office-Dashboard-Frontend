import { useEffect, useState } from "react";
import type { CreateGroupModalProps, Participant, Round } from "../group.type";
import { CREATE_GROUP, GET_PARTICIPANTS_BY_EVENT, GET_ROUNDS_BY_EVENT, UPDATE_GROUP } from "../../../../../constants/urls";
import { fetchGroupDetails } from "../groups.util";


export default function CreateGroupModal({ isOpen, onClose, groupId, mode, eventId }: CreateGroupModalProps) {
    const [formData, setFormData] = useState({
        group_name: '',
        round_id: '',
        participant_ids: [] as string[]
    });
    const [isLoading, setIsLoading] = useState(false);
    const [rounds, setRounds] = useState<Round[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        if (isOpen && eventId) {
            fetch(GET_ROUNDS_BY_EVENT(eventId))
                .then(res => res.json())
                .then(data => {
                    if (data.round) {
                        setRounds(data.round);
                    }
                })
                .catch(err => console.error('Error fetching rounds:', err));
        }
    }, [isOpen, eventId]);

    useEffect(() => {
        console.log(`${GET_PARTICIPANTS_BY_EVENT(eventId)}&group_id=27e892b0-97ab-42a4-b74e-c51ef5da784f`)
        if (isOpen && eventId && formData.round_id) {
            const url = mode === 'edit' && groupId 
                ? `${GET_PARTICIPANTS_BY_EVENT(eventId)}&group_id=27e892b0-97ab-42a4-b74e-c51ef5da784f`
                : `${GET_PARTICIPANTS_BY_EVENT(eventId)}`;
            
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.participants) {
                        setParticipants(data.participants);
                    }
                })
                .catch(err => console.error('Error fetching participants:', err));
        }
    }, [isOpen, eventId, formData.round_id, mode, groupId]);

    // Fetch group details when editing
    useEffect(() => {
        if (isOpen && mode === 'edit' && groupId) {
            setIsLoading(true);
            fetchGroupDetails(groupId)
                .then(data => {
                    setFormData(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching group details:', error);
                    setIsLoading(false);
                });
        } else if (isOpen && mode === 'create') {
            // Reset form for create mode
            setFormData({
                group_name: '',
                round_id: '',
                participant_ids: []
            });
        }
    }, [isOpen, mode, groupId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (mode === 'edit') {
                const response = await fetch(UPDATE_GROUP(groupId!), {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.group_name,
                        stage_id: formData.round_id,
                        participants_id: formData.participant_ids
                    })
                });
                
                if (response.ok) {
                    alert('Group updated successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to update group.');
                }
            } else {
                const response = await fetch(CREATE_GROUP, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        round_id: formData.round_id,
                        name: formData.group_name,
                        participants_id: formData.participant_ids
                    })
                });
                
                if (response.ok) {
                    alert('Group created successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to create group.');
                }
            }
            
            onClose();
            setFormData({ group_name: '', round_id: '', participant_ids: [] });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to save group. Please try again.');
        }
    };

    const handlePlayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map(option => option.value);
        setFormData(prev => ({ ...prev, participant_ids: selectedIds }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {mode === 'edit' ? 'Edit Group' : 'Create New Group'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-gray-600">Loading group details...</div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Group Name */}
                        <div className="mb-5">
                            <label className="block mb-2 text-gray-700 font-semibold text-sm">
                                Group Name
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.group_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, group_name: e.target.value }))}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                                placeholder="Enter group name"
                                required
                            />
                        </div>

                        {/* Round Selection */}
                        <div className="mb-5">
                            <label className="block mb-2 text-gray-700 font-semibold text-sm">
                                Round
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.round_id}
                                onChange={(e) => setFormData(prev => ({ ...prev, round_id: e.target.value }))}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                                required
                            >
                                <option value="">Select Round</option>
                                {rounds.map((round) => (
                                    <option key={round.id} value={round.id}>
                                        {round.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Players Multi-Select */}
                        <div className="mb-5">
                            <label className="block mb-2 text-gray-700 font-semibold text-sm">
                                Players
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                multiple
                                value={formData.participant_ids}
                                onChange={handlePlayerSelect}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 min-h-[150px]"
                                required
                            >
                                {participants.map((player) => (
                                    <option key={player.id} value={player.id}>
                                        {player.username}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Selected Players Display */}
                        {formData.participant_ids.length > 0 && (
                            <div className="mb-5">
                                <p className="text-sm font-semibold mb-2 text-gray-700">
                                    Selected Players ({formData.participant_ids.length})
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {formData.participant_ids.map((id) => {
                                        const player = participants.find(p => p.id === id);
                                        return (
                                            <span
                                                key={id}
                                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                                            >
                                                {player?.username}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            participant_ids: prev.participant_ids.filter(pId => pId !== id)
                                                        }));
                                                    }}
                                                    className="text-blue-900 hover:text-red-600 font-bold"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {mode === 'edit' ? 'Update Group' : 'Create Group'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}