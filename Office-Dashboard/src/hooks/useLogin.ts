import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { LoginServices } from "../services/login.service";

export const useLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username : "",
        password : "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.password){
            setError("All fields are required")
        }

        try{
            await LoginServices(formData);
            alert("Login Successfull");
            setFormData({
                username : "",
                password : ""
            });
            navigate("/home")
        }catch (err: any) {
            setError(err.message);
        }
    }
    return{
        formData,
        showPassword,
        error,
        handleChange,
        togglePasswordVisibility,
        handleSubmit
    }
}