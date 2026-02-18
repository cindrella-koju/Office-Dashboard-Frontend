import type { EventRoleModelProps } from "../../type/eventrole.type";
import ModalWrapper from "../pages/shared/ModelWrapper";
import SelectField from "../pages/shared/SelectField";
import Button from "../ui/Button";


export default function EventRoleModel({mode, onclose, participants, role, eventRole, setEventRole, handleSubmit}:EventRoleModelProps){
    return(
        <ModalWrapper title={mode === "edit" ? "Edit Event role" : "Create Event Role"} onClose={onclose}>
            <form className="spave-y-4" onSubmit={handleSubmit}>
                <SelectField
                    label="User"
                    required
                    options={participants.map((p) => ({
                        label: p.username,
                        value: p.id,
                    }))}
                    onChange={(value) => {
                        setEventRole((prev) => ({
                            ...prev,
                            user_id: value,
                        }));
                    }}

                    value={eventRole.user_id}
                />

                <SelectField
                    label="Role"
                    required
                    options={role.map((r) => ({
                        label: r.name,
                        value: r.id,
                    }))}
                    onChange={(value) => {
                        setEventRole((prev) => ({
                            ...prev,
                            role_id: value,
                        }));
                    }}
                    value={eventRole.role_id}
                />
                
                <div className="flex justify-end mt-6">
                    <Button type="submit" fullWidth>
                        {mode === "create" ? "Create" : "Update"}
                    </Button>
                </div>
            </form>
        </ModalWrapper>

    )
}