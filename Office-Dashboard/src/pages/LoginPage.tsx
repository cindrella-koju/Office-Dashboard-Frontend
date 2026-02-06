import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username : "",
    password : "",
  })
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()

    if (!formData.username || !formData.password){
      setError("All fields are required")
    }
    console.log("Login detail:", formData)
  }
  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a083f] via-violet-900 to-purple-800 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-violet-800 to-purple-600 bg-clip-text text-transparent tracking-tight">
        Office Dashboard
      </h1>
      <p className="text-center text-gray-500 text-base font-medium mb-10 tracking-wide">
        Welcome back! Please login to continue
      </p>

    {error && (
        <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    username : e.target.value
                  })
                }}
                className="w-full text-base px-4 py-3 border-2 border-gray-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                           transition-all duration-200 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  onChange={(e) => {
                  setFormData({
                    ...formData,
                    password : e.target.value
                  })
                }}
                  className="w-full text-base px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                             transition-all duration-200 placeholder:text-gray-400"
                />

                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center 
                             cursor-pointer text-gray-500 hover:text-violet-700 text-xl"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-800 to-purple-700 text-white py-3.5 rounded-xl 
                         hover:from-violet-900 hover:to-purple-800 transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Login
            </button>

            <p className="text-center text-base text-gray-600 mt-6 font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-violet-700 hover:text-violet-900 font-bold underline decoration-2 underline-offset-2">
                Sign up here
              </Link>
            </p>
          </form>
        </div>
    </div>
  );
}
