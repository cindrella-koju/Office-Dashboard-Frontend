import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import InputField from '../components/signup/InputField';

export default function LoginPage() {
  const {
    formData,
    showPassword,
    error,
    handleChange,
    togglePasswordVisibility,
    handleSubmit
  } = useLogin()
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
              <InputField
                label='Username'
                type='text'
                name='username'
                placeholder='Enter your username'
                value={formData.username}
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
