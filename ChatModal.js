import React, { useState } from 'react';
import axios from 'axios';
import './dark.css';

// AWS Lambda API endpoint
const API_URL = "https://vaaej08ka8.execute-api.ap-south-1.amazonaws.com/prod/chat";

export default function ChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      message: 'Hi! 👋 I\'m COBU, your Python tutor. Ask me anything about the code you\'re writing!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem('userId') || (Math.random() + Date.now()).toString();
  localStorage.setItem('userId', userId);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', message: input };
    const userInputTrimmed = input.trim().toLowerCase();

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check for greeting messages (HII, HI, HELLO, etc.)
      if (userInputTrimmed === 'hii' || userInputTrimmed === 'hi' || userInputTrimmed === 'hello') {
        const aiMessage = { 
          role: 'ai', 
          message: 'How may I help you today? 😊' 
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
        return;
      }

      // For other messages, call the API
      const response = await axios.post(API_URL, { message: input, userId });
      
      if (response.data && response.data.reply) {
        const aiMessage = { role: 'ai', message: response.data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const aiMessage = { role: 'ai', message: 'I received your message but couldn\'t generate a response. Try rephrasing your question!' };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err) {
      console.error('Chat Error:', err);
      
      // Better error message
      let errorMsg = 'Sorry, I encountered an error. Please try again.';
      
      if (err.response?.status === 429) {
        errorMsg = 'I\'m getting a lot of requests. Please wait a moment and try again.';
      } else if (err.code === 'ECONNABORTED') {
        errorMsg = 'The request timed out. Please check your internet connection.';
      }
      
      setMessages((prev) => [
        ...prev,
        { role: 'ai', message: errorMsg }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-modal-header">
          <h3>COBU</h3>
          <button className="close-modal-btn" onClick={onClose}>✕</button>
        </div>

        {/* Messages */}
        <div className="chat-modal-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <div className="message-text">{msg.message}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message ai">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-text typing">Thinking...</div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-modal-input">
          <input
            type="text"
            placeholder="Ask COBU anything... (try 'HII')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading) sendMessage();
            }}
            disabled={isLoading}
          />
          <button 
            className="send-btn"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
      </div>
    </div>
  );
}

