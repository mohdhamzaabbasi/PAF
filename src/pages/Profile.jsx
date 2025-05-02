import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', documents: [] });
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);

      const response = await axios.get('https://pa-backend-ec5j.onrender.com/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error('Profile Fetch error:', error.message);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('document', selectedFile); // ONLY document here

    try {
      const token = localStorage.getItem('token');
      console.log(token);

      const response = await axios.post(`https://pa-backend-ec5j.onrender.com/api/upload-documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setMessage('Document uploaded successfully!');
        fetchProfile(); // Refresh user info after upload
      }
    } catch (error) {
      console.error('Upload error:', error.message);
      setMessage(error.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      
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
      
      <div className="flex-1 flex items-center justify-center p-4 z-10 relative">
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-full">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-white">Your Profile</h2>

          <div className="space-y-3 bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-200"><span className="font-semibold text-blue-400">Name:</span> {userInfo.name}</p>
            <p className="text-gray-200"><span className="font-semibold text-blue-400">Email:</span> {userInfo.email}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4 text-white">Uploaded Documents</h3>
            {userInfo.documents.length > 0 ? (
              <div className="bg-gray-700 p-4 rounded-lg">
                <ul className="space-y-2">
                  {userInfo.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-center text-gray-200">
                      <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-400 bg-gray-700 p-4 rounded-lg">No documents uploaded yet.</p>
            )}
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-center ${message.includes('successfully') ? 'bg-green-800 text-green-200' : 'bg-red-900 text-red-200'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleUpload} className="flex flex-col space-y-4 mt-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <label className="block text-blue-400 font-medium mb-2">Upload new document</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-gray-200 bg-gray-800 rounded-lg p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              Upload Document
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
