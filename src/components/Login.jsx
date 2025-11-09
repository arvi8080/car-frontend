import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCarSide, FaFacebook, FaTwitter, FaInstagram, FaUser } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const { login } = useAppContext();
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok || !data.success) {
        setError(data.message || 'Login failed');
        setSuccess('');
        return;
      }
      setError('');
      setSuccess('Login successful!');
      login(data.user, data.token);
      setShowLogin(false);
    } catch (err) {
      setLoading(false);
      setError('Server error. Please try again.');
      setSuccess('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'user' })
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok || !data.success) {
        setError(data.message || 'Registration failed');
        setSuccess('');
        return;
      }
      setError('');
      setSuccess('Registration successful! You can now log in.');
      login(data.user, data.token);
      setShowLogin(false);
    } catch (err) {
      setLoading(false);
      setError('Server error. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="min-h-screen flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #f9fbfd 60%, #e0e7ff 100%)' }}>
      {/* Top: Animated car icon and welcome */}
      <div className="flex flex-col items-center pt-10 pb-2 animate-fadeInUp">
        <div className="bg-blue-600 rounded-full p-4 shadow-lg mb-2 animate-bounce-slow">
          <FaCarSide size={38} className="text-white drop-shadow" />
        </div>
        <div className="text-2xl font-extrabold text-blue-700 tracking-tight mb-1">Welcome to RentCar</div>
        <div className="text-sm text-gray-500 font-medium mb-2">Your journey starts here. Book your ride in seconds!</div>
      </div>

      {/* Center: Login/Register Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white/95 p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-blue-100" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)' }}>
          <h2 className="text-xl font-bold text-center mb-4 text-blue-700 tracking-tight drop-shadow-sm">
            {mode === 'login' ? 'Login to Your Account' : 'Create an Account'}
          </h2>
          <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
            {mode === 'register' && (
              <div className="mb-2">
                <label className="block text-gray-700 text-xs font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-2">
              <label className="block text-gray-700 text-xs font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 relative">
              <label className="block text-gray-700 text-xs font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-7 text-blue-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>
            {error && <div className="text-red-600 text-center mb-1 text-xs font-semibold">{error}</div>}
            {success && <div className="text-green-600 text-center mb-1 text-xs font-semibold">{success}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition mb-1 text-base font-semibold shadow-sm"
              disabled={loading}
            >
              {loading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Register')}
            </button>
          </form>

          <p className="mt-2 text-xs text-center text-gray-600">
            {mode === 'login' ? (
              <>Don't have an account?{' '}
                <button className="text-blue-600 hover:underline font-semibold" onClick={() => { setMode('register'); setError(''); setSuccess(''); }}>Register here</button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button className="text-blue-600 hover:underline font-semibold" onClick={() => { setMode('login'); setError(''); setSuccess(''); }}>Login here</button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col items-center py-4 gap-1 animate-fadeInUp">
        <div className="text-xs text-gray-500 font-semibold">&copy; {new Date().getFullYear()} RentCar. All rights reserved.</div>
        <div className="flex flex-col items-center gap-1 mt-1">
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"><FaFacebook size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600"><FaTwitter size={18} /></a>
            <a href="https://www.instagram.com/arvind_prajapati_8/?next=%2F" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700"><FaInstagram size={18} /></a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 2.2s infinite; }
      `}</style>
        </div>
      </div>
    </div>
  );
};

export default Login;
