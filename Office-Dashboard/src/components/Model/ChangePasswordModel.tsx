import type React from "react";
import type { ChangePasswordDetail } from "../../pages/ProfilePage";
import ModalWrapper from "../pages/shared/ModelWrapper";
import InputField from "../signup/InputField";
import Button from "../ui/Button";

interface ChangePasswordModel{
    formData : ChangePasswordDetail;
    showPreviousPassword : boolean;
    togglePreviousPasswordVisibility : () => void;
    showNewPassword : boolean;
    toggleNewPasswordVisibility : () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose : () => void;
    handleSubmit : (e:React.FormEvent) => void;
}
export default function ChangePasswordModel({ formData, handleChange, showPreviousPassword, togglePreviousPasswordVisibility, showNewPassword, toggleNewPasswordVisibility, onClose, handleSubmit }: ChangePasswordModel){
    return(
        <ModalWrapper title="Change Password" onClose={onClose}>
            <form className="space-y-4" onSubmit={handleSubmit} >
                <InputField
                    label="Old Password"
                    type="password"
                    name="oldpassword"
                    placeholder="Enter you previous Password"
                    value={formData.oldpassword}
                    onChange={handleChange}
                    isPasswordVisible={showPreviousPassword}
                    togglePasswordVisibility={togglePreviousPasswordVisibility}
                    showPasswordToggle
                />
                <InputField
                    label="New Password"
                    type="password"
                    name="newpassword"
                    placeholder="Enter you previous Password"
                    value={formData.newpassword}
                    onChange={handleChange}
                    isPasswordVisible={showNewPassword}
                    togglePasswordVisibility={toggleNewPasswordVisibility}
                    showPasswordToggle
                />

                <div className="flex justify-end mt-6">
                    <Button type="submit" fullWidth>
                        Change Password
                    </Button>
                </div>
            </form>
        </ModalWrapper>
    )
}