import { useEffect, useState } from "react";
import type { CreateGroupModalProps, Participant, Round } from "../group.type";
import { CREATE_GROUP, GET_PARTICIPANTS_BY_EVENT, GET_QUALIFIER_NOT_IN_GROUP, GET_ROUNDS_BY_EVENT, UPDATE_GROUP } from "../../../../../constants/urls";
import { fetchGroupDetails } from "../groups.util";
import Button from "../../../../../components/ui/Button";
import MultiSelect from "../../../../../components/pages/shared/MultiSelect";
import FormField from "../../../../../components/pages/shared/FormField";
import SelectField from "../../../../../components/pages/shared/SelectField";
import useFetch from "../../../../../hooks/useFetch";

export default function CreateGroupModal({ isOpen, onClose, groupId, mode, eventId }: CreateGroupModalProps) {
  const [formData, setFormData] = useState({
    group_name: '',
    round_id: '',
    participant_ids: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [roundId, setRoundId] = useState()
  const { data: participants } = useFetch<Participant[]>(
      roundId && eventId ? GET_QUALIFIER_NOT_IN_GROUP(eventId, roundId) : ""
    )

  // Fetch rounds
  useEffect(() => {
    if (isOpen && eventId) {
      fetch(GET_ROUNDS_BY_EVENT(eventId))
        .then(res => res.json())
        .then(setRounds)
        .catch(err => console.error('Error fetching rounds:', err));
    }
  }, [isOpen, eventId]);

  // Fetch group details if editing
  useEffect(() => {
    if (isOpen && mode === 'edit' && groupId) {
      setIsLoading(true);
      fetchGroupDetails(groupId)
        .then(data => setFormData(data))
        .catch(err => console.error('Error fetching group details:', err))
        .finally(() => setIsLoading(false));
    } else if (isOpen && mode === 'create') {
      setFormData({ group_name: '', round_id: '', participant_ids: [] });
    }
  }, [isOpen, mode, groupId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.group_name,
        round_id: formData.round_id,
        participants_id: formData.participant_ids
      };

      const url = mode === 'edit' ? UPDATE_GROUP(groupId!) : CREATE_GROUP;
      const method = mode === 'edit' ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert(`Group ${mode === 'edit' ? 'updated' : 'created'} successfully!`);
        // window.location.reload();
      } else {
        alert(`Failed to ${mode === 'edit' ? 'update' : 'create'} group.`);
      }
      onClose();
      setFormData({ group_name: '', round_id: '', participant_ids: [] });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save group. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'edit' ? 'Edit Group' : 'Create New Group'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">×</button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-600">Loading group details...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormField
              label="Group Name"
              value={formData.group_name}
              onChange={(val) => setFormData(prev => ({ ...prev, group_name: val }))}
              placeholder="Enter group name"
              required
            />

            <SelectField
              label="Round"
              value={formData.round_id}
              onChange={(val) => {
                setFormData(prev => ({ ...prev, round_id: val }))
                setRoundId(val)
              }}
              options={rounds.map(r => ({ value: r.id, label: r.name }))}
              required
            />

            {
              participants && (
                <MultiSelect
                label="Players"
                options={participants.map(p => ({ id: p.id, label: p.username }))}
                value={formData.participant_ids}
                onChange={(ids) => setFormData(prev => ({ ...prev, participant_ids: ids }))}
                required
              />
              )
            }

            <div className="flex justify-end gap-3 mt-6">
              <Button type="submit">{mode === 'edit' ? 'Update Group' : 'Create Group'}</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
