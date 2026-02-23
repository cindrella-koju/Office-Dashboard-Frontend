import type { ProfileEditdetail } from "../../pages/ProfilePage";
import ModalWrapper from "../pages/shared/ModelWrapper";
import InputField from "../signup/InputField";
import Button from "../ui/Button";
import type React from "react";

interface EditProfileModel{
    formData : ProfileEditdetail;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit : (e:React.FormEvent) => void;
    onClose : () => void;
}

export default function EditProfileModel({formData, handleChange, handleSubmit, onClose}:EditProfileModel){
    return(
        <ModalWrapper title="Edit Profile" onClose={onClose}>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <InputField
                    label="Fullname"
                    type="text"
                    name="fullname"
                    placeholder="Enter fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                />
                <InputField
                    label="Email"
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <div className="flex justify-end mt-6">
                    <Button type="submit" fullWidth>
                        Update
                    </Button>
                </div>
            </form>
        </ModalWrapper>
    )
}