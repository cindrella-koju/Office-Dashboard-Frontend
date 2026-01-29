import { useEffect, useState } from "react";
import FormField from "../pages/shared/FormField";
import ModalWrapper from "../pages/shared/ModelWrapper";
import SelectField from "../pages/shared/SelectField";
import type { CreateGroupModalProps, Participant, Round } from "../../type/group.type";
import useFetch from "../../hooks/useFetch";
import { CREATE_GROUP, GET_QUALIFIER_NOT_IN_GROUP, GET_QUALIFIER_NOT_IN_GROUP_FOR_EDIT, GET_ROUNDS_BY_EVENT, UPDATE_GROUP } from "../../constants/urls";
import MultiSelect from "../pages/shared/MultiSelect";
import Button from "../ui/Button";



export default function CreateGroupModal({mode, eventId, groupId, setIsModalOpen, eachGroupData}:CreateGroupModalProps){
  const [roundId, setRoundId] = useState<string>();
  const {data:rounds} = useFetch<Round[]>(GET_ROUNDS_BY_EVENT(eventId ? eventId : ""))
  const participantsUrl =
  mode === "create"
    ? roundId && eventId
      ? GET_QUALIFIER_NOT_IN_GROUP(eventId, roundId)
      : ""
    : roundId && eventId && groupId
      ? GET_QUALIFIER_NOT_IN_GROUP_FOR_EDIT(eventId, roundId, groupId)
      : "";

  const { data: participants } = useFetch<Participant[]>(participantsUrl);

  const [formData, setFormData] = useState({
    group_name: "",
    round_id: "",
    participant_ids: [] as string[],
  });

  useEffect(() => {
    if (!eachGroupData) return;

    setFormData({
      group_name: eachGroupData.name,
      round_id: eachGroupData.stage_id,
      participant_ids: eachGroupData.participants_id,
    });

    setRoundId(eachGroupData.stage_id);
  }, [eachGroupData]);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const payload = {
        name: formData.group_name,
        round_id: formData.round_id,
        participants_id: formData.participant_ids,
      };

      const url =
        mode === "edit" ? UPDATE_GROUP(groupId!) : CREATE_GROUP(eventId);
      const method = mode === "edit" ? "PATCH" : "POST";

      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error();

        alert(`Group ${mode === "edit" ? "updated" : "created"} successfully!`);
        setIsModalOpen(null)
      } catch {
        alert("Failed to save group. Please try again.");
      }
    };
  return(
    <ModalWrapper 
      title={mode === "edit" ? "Edit Group" : "Create New Group"}
      onClose={() => setIsModalOpen(null)}
    >
      <form onSubmit={handleSubmit}>
          <FormField 
            label="Group Name"
            placeholder="Enter group name" 
            value={formData.group_name}
            onChange={val =>
              setFormData(prev => ({ ...prev, group_name: val }))
            }
            required
          />

          {
            rounds && 
            <SelectField
              label="Round"
              value={formData.round_id}
              options={rounds.map(r => ({
                  value: r.id,
                  label: r.name,
                }))}
              required
              onChange={val => {
                setRoundId(val);
                setFormData(prev => ({
                  ...prev,
                  round_id: val,
                  participant_ids: [],
                }));
              }}

            />
          }

          <MultiSelect
            label="Players"
            options={(participants ?? []).map(p => ({
              id: p.id,
              label: p.username,
            }))}
            value={formData.participant_ids}
            onChange={ids =>
                {
                  setFormData(prev => ({
                    ...prev,
                    participant_ids: ids,
                  }))
                  // setGroupId(ids)
                  console.log(ids)
                  
                }
                
              }
            required
          />
          <div className="flex justify-end mt-6">
            <Button type="submit" fullWidth> 
              {mode === "edit" ? "Update Group" : "Create Group"}
            </Button>
          </div>
      </form>
    </ModalWrapper>
  )
}