import type { RoundModelProps } from "../../type/round.type";
import ModalWrapper from "../pages/shared/ModelWrapper"
import InputField from "../signup/InputField";
import Button from "../ui/Button";


export default function RoundModel({mode, onClose, formData, handleChange, handleSubmit}:RoundModelProps){
    return(
        <ModalWrapper title={mode === "edit" ? "Edit Round" : "Create New Round "} onClose={onClose}>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField
                    label="Round Name"
                    type="text"
                    name="name"
                    placeholder="Enter Round Name"
                    value={formData.name}
                    onChange={handleChange}
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