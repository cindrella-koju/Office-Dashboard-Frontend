import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";
import InputField from "../components/signup/InputField";

export default function SignupPage() {
    const {
        formData,
        showPassword,
        showConfirmPassword,
        error,
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
    } = useSignUp();
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
                        <InputField
                            label="Full Name"
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={formData.fullname}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Username"
                            type="text"
                            name="username"
                            placeholder="Enter a username"
                            value={formData.username}
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


                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            showPasswordToggle
                            isPasswordVisible={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                        />

                        <InputField
                            label="Confirm Password"
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm your password"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            showPasswordToggle
                            isPasswordVisible={showConfirmPassword}
                            togglePasswordVisibility={toggleConfirmPasswordVisibility}
                        />

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
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-violet-700 hover:text-violet-900 font-bold underline decoration-2 underline-offset-2"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}