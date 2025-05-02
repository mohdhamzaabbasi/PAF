import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      
      {/* VIDEO BACKGROUND */}
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
      
      {/* HEADER */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="text-3xl font-bold text-white">
          CAIC
        </div>
        <nav className="flex space-x-8">
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#how-it-works" className="hover:text-blue-400 transition">How It Works</a>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full transition"
          >
            Login
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-8 pt-20 pb-32">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
          Your AI Insurance Assistant
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-300">
          Get instant answers to all your insurance questions with our powerful AI assistant. Upload your policies and get personalized insights.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate('/signup')}
            className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition flex items-center justify-center"
          >
            Get Started
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-8 py-4 rounded-full transition"
          >
            Try Demo
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div id="features" className="relative z-10 py-24 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">What Can InsuranceAI Do?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl hover:transform hover:-translate-y-2 transition duration-300">
            <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Upload Documents</h3>
            <p className="text-gray-300">Upload insurance papers, policies, or any document you want AI to analyze.</p>
          </div>

          <div className="p-8 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl hover:transform hover:-translate-y-2 transition duration-300">
            <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Ask Anything</h3>
            <p className="text-gray-300">Confused about terms? Need a summary? Just ask — our AI will find answers instantly.</p>
          </div>

          <div className="p-8 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl hover:transform hover:-translate-y-2 transition duration-300">
            <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Save Conversations</h3>
            <p className="text-gray-300">All your chats are saved — revisit any time to continue your conversation journey.</p>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div id="how-it-works" className="relative z-10 py-24 bg-gray-800 bg-opacity-70 px-8 text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-16">
          <div className="max-w-xs">
            <div className="text-5xl font-extrabold text-blue-400 mb-6 inline-block bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center">1</div>
            <h3 className="text-2xl font-semibold mb-4">Upload Your Document</h3>
            <p className="text-gray-300">Sign up and upload your insurance policies securely.</p>
          </div>
          <div className="max-w-xs">
            <div className="text-5xl font-extrabold text-blue-400 mb-6 inline-block bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center">2</div>
            <h3 className="text-2xl font-semibold mb-4">Ask Your Questions</h3>
            <p className="text-gray-300">Chat with our AI and get instant answers based on your documents.</p>
          </div>
          <div className="max-w-xs">
            <div className="text-5xl font-extrabold text-blue-400 mb-6 inline-block bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center">3</div>
            <h3 className="text-2xl font-semibold mb-4">Save and Revisit</h3>
            <p className="text-gray-300">Your conversations and uploaded files stay saved for your future use.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 text-center py-8 text-gray-400 bg-gray-900 bg-opacity-80">
        © {new Date().getFullYear()} InsuranceAI. All rights reserved.
      </footer>
      
    </div>
  );
};

export default Home;
