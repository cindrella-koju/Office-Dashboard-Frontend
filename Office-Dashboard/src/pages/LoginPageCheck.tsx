import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SIGNUP_URL } from '../constants/urls';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.fullname || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page after successful signup
        navigate('/login', { state: { message: 'Account created successfully! Please login.' } });
      } else {
        setError(data.detail || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a083f] via-violet-900 to-purple-800 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-10 max-h-[70vh] overflow-y-auto pt-20">
          <div className="sticky top-0 bg-white pb-6 pt-2 z-10 rounded-t-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-violet-800 to-purple-600 bg-clip-text text-transparent tracking-tight">
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide mt-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter your full name"
                  value={formData.fullname}
                  onChange={handleChange}
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
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full text-sm px-3 py-2.5 border-2 border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                             transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            {/* </div> */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-sm px-3 py-2.5 border-2 border-gray-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                           transition-all duration-200 placeholder:text-gray-400"
              />
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
            {/* </div> */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-800 to-purple-700 text-white py-3 rounded-xl 
                         hover:from-violet-900 hover:to-purple-800 transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base mt-2
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-700 hover:text-violet-900 font-bold underline decoration-2 underline-offset-2">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}