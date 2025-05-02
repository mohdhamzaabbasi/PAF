import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/chat');
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video 
          className="object-cover w-full h-full opacity-30"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/videos/bg_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 backdrop-blur-sm bg-opacity-80">
        <div className="flex justify-center mb-6">
          <div className="inline-block p-4 bg-blue-600 rounded-full">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>

        {message && (
          <div className={`mb-4 text-center p-3 rounded ${message.includes('successful') ? 'bg-green-800 text-green-200' : 'bg-red-900 text-red-200'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Login
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <span
            className="text-blue-400 hover:text-blue-300 cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
