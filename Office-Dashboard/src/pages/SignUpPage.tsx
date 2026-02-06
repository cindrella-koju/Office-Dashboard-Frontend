import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SIGNUP } from "../constants/urls";
import DeleteConfirmation from "../components/ui/PopUp";
import SuccessPopup from "../components/ui/SuccessPopUp";

const emailValidate = (email : string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+\.teslatech@gmail\.com$/;
    return emailRegex.test(email)
}

const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

  return regex.test(password);
};

export default function SignupPage() {
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
    const [openPopUp, setOpenPopUp] = useState<boolean>(false)
    const [popUpType, setPopUpType] = useState<"error" | "success" | "delete" | null>(null)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
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
            const response = await fetch(SIGNUP,{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(formData)
            })
            if(response.ok){
                setPopUpType("success")
                setOpenPopUp(true)
            }else{
                setPopUpType("error")
                setOpenPopUp(true)
            }
        }catch (error) {
            console.error(error)
            alert("Something went wrong")
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a083f] via-violet-900 to-purple-800 px-4 py-8">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-10 max-h-[70vh] overflow-y-auto pt-20">
                    <div className="sticky bg-white pb-6 pt-2 z-10 rounded-t-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-violet-800 to-purple-600 bg-clip-text text-transparent tracking-tight">
                            Office Dashboard
                        </h1>
                        <p className="text-center text-gray-500 text-base font-medium tracking-wide">Join us today! Create your account</p>
                    </div>

                    {error && (
                        <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium">
                        {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide mt-3">
                            Full Name
                            </label>
                            <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    fullname : e.target.value
                                })
                                setError("")
                            }}  
                            className="w-full text-sm px-3 py-2.5 border-2 border-gray-200 rounded-xl 
                                        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                                        transition-all duration-200 placeholder:text-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide">
                            Username
                            </label>
                            <input
                            type="text"
                            name="username"
                            placeholder="Enter a username"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    username : e.target.value
                                })
                                setError("")
                            }} 
                            className="w-full text-sm px-3 py-2.5 border-2 border-gray-200 rounded-xl 
                                        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                                        transition-all duration-200 placeholder:text-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email : e.target.value
                                })
                                setError("")
                            }} 
                                className="w-full text-sm px-3 py-2.5 border-2 border-gray-200 rounded-xl 
                                        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                                        transition-all duration-200 placeholder:text-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password : e.target.value
                                })
                                setError("")
                            }} 
                                placeholder="Create a password"
                                className="w-full text-sm px-3 py-2.5 pr-10 border-2 border-gray-200 rounded-xl 
                                            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                                            transition-all duration-200 placeholder:text-gray-400"
                                />
                                <span
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center 
                                            cursor-pointer text-gray-500 hover:text-violet-700 text-lg"
                                >
                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide">
                                Confirm Password
                                </label>
                                <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            confirmpassword : e.target.value
                                        })
                                        setError("")
                                    }} 
                                    className="w-full text-sm px-3 py-2.5 pr-10 border-2 border-gray-200 rounded-xl 
                                            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                                            transition-all duration-200 placeholder:text-gray-400"
                                />
                                <span
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center 
                                            cursor-pointer text-gray-500 hover:text-violet-700 text-lg"
                                >
                                    {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-violet-800 to-purple-700 text-white py-3 rounded-xl 
                                            hover:from-violet-900 hover:to-purple-800 transition-all duration-200 
                                            disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base mt-2
                                            shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                Sign Up
                            </button>
                            <p className="text-center text-sm text-gray-600 mt-4 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-violet-700 hover:text-violet-900 font-bold underline decoration-2 underline-offset-2">
                                Login here
                            </Link>
                            </p>
                    </form>
                </div>

                {
                 <SuccessPopup message="dfsdfdsfsf" isVisible onClose={() => setOpenPopUp(false)}/>
                }
            </div>
        </div>
    )
}