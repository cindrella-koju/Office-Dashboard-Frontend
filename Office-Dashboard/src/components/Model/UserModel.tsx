import type { UserModelProps } from "../../type/user.type";
import ModalWrapper from "../pages/shared/ModelWrapper";
import InputField from "../signup/InputField";
import SelectField from "../pages/shared/SelectField";
import Button from "../ui/Button";
import { useUser } from "../../hooks/useUser";


export default function UserModel({ mode, formData, handleChange, onClose, roles,setFormData, handleSubmit }: UserModelProps) {
    const {showPassword, togglePasswordVisibility, error} = useUser()
    
    return (
        <ModalWrapper title={mode === "edit" ? "Edit User" : "Create New User"} onClose={onClose}>
            {error && (
                <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium">
                {error}
                </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Enter a username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <InputField
                    label="Full Name"
                    type="text"
                    name="fullname"
                    placeholder="Enter your fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                />

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />
                
                {
                    mode === "create" && (
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            isPasswordVisible = {showPassword}
                            showPasswordToggle
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                    )
                }

                <SelectField
                    label="Roles"
                    value={formData.role_id}
                    options={roles.map(r => ({
                        value : r.id,
                        label : r.name
                    }))}
                    name="role_id"
                    onChange={(value) => setFormData(prev => ({ ...prev, role_id: value }))}
                    required
                />

                <div className="flex justify-end mt-6">
                    <Button type="submit" fullWidth>
                        {mode === "create" ? "Create" : "Update"}
                    </Button>
                </div>
            </form>
        </ModalWrapper>
    );
}
