import { useEffect, useState } from "react";
import type { ProfileDetail, ProfileEditdetail } from "../pages/ProfilePage";
import { getProfilePage, updateProfile } from "../services/profile.service";
import { useToast } from "../context/ToastContext";
import { emailValidate } from "../utils/validation";

export const useProfile = () => {
    const { showToast } = useToast()
    const [profileDetail, setProfileDetail] = useState<ProfileDetail | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode ] = useState<boolean>(false)
    const [formData, setFormData] = useState<ProfileEditdetail>({
        username : "",
        fullname : "",
        email : ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

    useEffect(() => {
        if (profileDetail) {
          setFormData({
            username: profileDetail.username,
            fullname: profileDetail.fullname,
            email: profileDetail.email,
          });
        }
    }, [profileDetail]);

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
        handleSubmit
    }
}