import FormField from "../pages/shared/FormField";
import ModalWrapper from "../pages/shared/ModelWrapper";
import SelectField from "../pages/shared/SelectField";
import MultiSelect from "../pages/shared/MultiSelect";
import Button from "../ui/Button";
import type { CreateGroupModalProps } from "../../type/group.type";
import { useGroup } from "../../hooks/group/useGroup";



export default function CreateGroupModal({
  mode, setRoundId, formData, setFormData, handleSubmit, participants, handleClose
}:CreateGroupModalProps){
  const {
    rounds,
  } = useGroup()

  return(
    <ModalWrapper 
      title={mode === "edit" ? "Edit Group" : "Create New Group"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
          <FormField 
            label="Group Name"
            placeholder="Enter group name" 
            value={formData.group_name}
            onChange={val =>
              setFormData(prev => ({ ...prev, group_name: val }))
            }
            required={mode === "create"}
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
              required={mode === "create"}
              disable={mode === "edit"} 
              onChange={val => {
                setRoundId(val);
                setFormData(prev => ({
                  ...prev,
                  round_id: val,
                  participants_ids: [],
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
            value={formData.participants_ids}
            onChange={ids =>
                {
                  setFormData(prev => ({
                    ...prev,
                    participants_ids: ids,
                  }))
                }                
              }
            required={mode === "create"}
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