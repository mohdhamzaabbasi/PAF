import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Import Navbar
import { jwtDecode } from 'jwt-decode';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("*******");
      console.log(token);
      const response = await axios.post('https://pa-backend-ec5j.onrender.com/api/conversations',{token});
      if (response.status === 200) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Get conversations error:', error.message);
    }
  };

  const handleConversationClick = async (convId) => {
    try {
      const response = await axios.get(`https://pa-backend-ec5j.onrender.com/api/conversations/${convId}`);
      if (response.status === 200) {
        setMessages(response.data.messages || []);
        setConversationId(convId);
      }
    } catch (error) {
      console.error('Error loading conversation:', error.message);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('https://pa-backend-ec5j.onrender.com/api/chat', {
        message,
        conversationId,
        token
      });

      if (response.status === 200) {
        const botReply = response.data.reply;
        const updatedConversationId = response.data.conversationId;

        const newMessages = [
          ...messages,
          { sender: 'user', text: message, timestamp: new Date() },
          { sender: 'bot', text: botReply, timestamp: new Date() },
        ];

        setMessages(newMessages);
        setConversationId(updatedConversationId);
        setMessage('');
        fetchConversations();
      }
    } catch (error) {
      console.error('Chat error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Navbar */}
      <Navbar onNewChat={() => {
        setMessages([]);
        setConversationId('');
      }} />

      {/* Main Chat Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-200 mb-4">Past Conversations</h2>
            <div className="space-y-2">
              {conversations.map((conv, idx) => (
                <button
                  key={idx}
                  onClick={() => handleConversationClick(conv.conversationId)}
                  className="block w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg shadow transition duration-200 text-gray-200"
                >
                  {conv.createdAt ? new Date(conv.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : `Conversation ${conversations.length - idx}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-4 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-200'
                    } w-fit max-w-[70%]`}
                  >
                    {msg.text}
                    {msg.timestamp && (
                      <div className={`text-xs mt-2 text-right ${
                        msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl bg-gray-700 text-gray-200 w-fit max-w-[70%]">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                      <span className="ml-2">Bot is typing...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Box */}
          <div className="border-t border-gray-700 p-4 bg-gray-800">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <span>Send</span>
                <svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
