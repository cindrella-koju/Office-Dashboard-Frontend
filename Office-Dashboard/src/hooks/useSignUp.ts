import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { emailValidate, validatePassword } from "../utils/validation"
import { signupUser } from "../services/signup.service"

export const useSignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullname : "",
        username : "",
        email : "",
        password: "",
        confirmpassword : ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("")

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullname || !formData.username || !formData.email || !formData.password || !formData.confirmpassword){
            setError("All fields are required.")
        }

        if( formData.password !== formData.confirmpassword){
            setError("Both password doesnot match")
        }
        if(emailValidate(formData.email) !== true){
            setError("Email should be in format .teslatech@gmail.com")
        }
        if(!validatePassword(formData.password)){
            setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
        }

        try{
            await signupUser(formData);
            alert("Signup successful! Welcome");
            setFormData({
                fullname: "",
                username: "",
                email: "",
                password: "",
                confirmpassword: "",
            });
            navigate("/login");
        } catch (err: any) {
            setError(err.message);
        }
    }

    return {
    formData,
    showPassword,
    showConfirmPassword,
    error,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };

}