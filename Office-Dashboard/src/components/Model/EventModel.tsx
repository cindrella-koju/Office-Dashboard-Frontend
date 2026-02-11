import type { EventModelProps, EventStatus } from "../../type/event.type";
import ModalWrapper from "../pages/shared/ModelWrapper";
import SelectField from "../pages/shared/SelectField";
import InputField from "../signup/InputField";
import Button from "../ui/Button";



const status = [
    { "id" : "draft", "label" : "Draft"},
    { "id" : "active", "label" : "Active"},
    { "id" : "completed", "label" : "Completed"},
]
export default function EventModel({mode, onClose, formData, handleChange, setFormData, handleSubmit }:EventModelProps){
    return(
        <ModalWrapper title={mode === "edit" ? "Edit Event" : "Create New Event"} onClose={onClose}>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField
                    label="Title"
                    type="text"
                    name="title"
                    placeholder="Enter Event Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <InputField
                    label="Description"
                    type="text"
                    name="description"
                    placeholder="Enter your description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <InputField
                    label="Startdate"
                    type="date"
                    name="startdate"
                    value={formData.startdate}
                    onChange={handleChange}
                />

                <InputField
                    label="Enddate"
                    type="date"
                    name="enddate"
                    value={formData.enddate}
                    onChange={handleChange}
                />

                <SelectField
                    label="Status"
                    value={formData.status}
                    options={status.map(r => ({
                        value : r.id,
                        label : r.label
                    }))}
                    onChange={(value) => setFormData(prev => ({ ...prev, status: value as EventStatus }))}
                    required
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