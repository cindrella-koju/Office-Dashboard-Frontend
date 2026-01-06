import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a083f] px-4">
      <div className="w-80 md:w-2/3 min-h-[70vh] bg-white rounded-2xl shadow-xl flex overflow-hidden">

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-4xl md:text-3xl font-mono font-bold text-center mb-10">
            Office Dashboard
          </h1>

          <form className="space-y-6">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-xs md:text-sm px-4 md:px-2 py-2 border rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs md:text-sm px-4 md:px-2 py-2 pr-10 border rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-violet-600"
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
              className="w-full bg-violet-800 text-white py-2 rounded-lg 
                         hover:bg-violet-900 transition"
            >
              Login
            </button>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-[#1A083F] to-violet-800" />
        </div>
    </div>
  );
}
