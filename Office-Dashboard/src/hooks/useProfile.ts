import { useEffect, useState } from "react";
import { type ChangePasswordDetail, type ProfileDetail, type ProfileEditdetail } from "../pages/ProfilePage";
import { changePasswordService, getProfilePage, updateProfile } from "../services/profile.service";
import { useToast } from "../context/ToastContext";
import { emailValidate, validatePassword } from "../utils/validation";

export const useProfile = () => {
    const { showToast } = useToast()
    const [profileDetail, setProfileDetail] = useState<ProfileDetail | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode ] = useState<boolean>(false);
    const [showPreviousPassword, setShowPreviousPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [viewShowPassword, setViewShowPassword ] = useState<boolean>(false)

    const [passwordData, setPasswordData ] = useState<ChangePasswordDetail>({
        oldpassword : "",
        newpassword : ""
    })

    const togglePeviousPasswordVisibility = () => {
        setShowPreviousPassword(!showPreviousPassword)
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword)
    }

    const closePasswordChange = () => {
        setViewShowPassword(false);
        setPasswordData({
            oldpassword : "",
            newpassword : ""
        })
    }


    
    const [formData, setFormData] = useState<ProfileEditdetail>({
        username : "",
        fullname : "",
        email : ""
    })

    const closeEditProfile = () => {
        setViewMode(false)
        setFormData({
            username : "",
            fullname : "",
            email : ""
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if(formData.email){
            if(emailValidate(formData.email) !== true){
                showToast("Email should be in format .teslatech@gmail.com","error")
                return;
            }
        }
        editProfile(formData)
        setViewMode(false)
        setFormData({
            username : "",
            fullname : "",
            email : ""
        })
    }

    const handlePasswordSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        if(passwordData.newpassword){
            if(validatePassword(passwordData.newpassword) !== true){
                showToast("Password must be at least 8 characters and include uppercase, lowercase, number, and special character","error")
                return;
            }
        }
        changePassword(passwordData)
        setPasswordData({
            oldpassword : "",
            newpassword : ""
        })
    }

    const fetchProfileDetail = async () => {
        try {
          setLoading(true);
          const data = await getProfilePage();
          setProfileDetail(data);
        } catch (err: any) {
          setError(err.detail || "Failed to load profile");
        } finally {
          setLoading(false);
        }
    };

    const editProfile = async( payload : ProfileEditdetail) => {
        await updateProfile(payload,showToast)
        setViewMode(false)
        fetchProfileDetail()
    }

    const changePassword = async(payload : ChangePasswordDetail) => {
        await changePasswordService(payload,showToast)
        setViewShowPassword(false)
    }

    useEffect(() => {
        if (profileDetail) {
          setFormData({
            username: profileDetail.username,
            fullname: profileDetail.fullname,
            email: profileDetail.email,
          });
        }
    }, [profileDetail, viewMode]);

    useEffect(() => {
        fetchProfileDetail();
    }, []);

    return {
        setViewMode,
        loading,
        error,
        profileDetail,
        viewMode,
        formData,
        handleChange,
        handleSubmit,
        viewShowPassword,
        passwordData,
        showPreviousPassword,
        togglePeviousPasswordVisibility,
        showNewPassword,
        setViewShowPassword,
        toggleNewPasswordVisibility,
        handlePasswordChange,
        handlePasswordSubmit,
        closePasswordChange,
        closeEditProfile
    }
}