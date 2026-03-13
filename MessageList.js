import React from 'react';

export default function MessageList({ messages, isLoading }) {
  return (
    <div className="chat-window">
      {messages.length === 0 && !isLoading && (
        <div className="placeholder">
          Hello! I'm COBU, your Python tutor. Ask me anything about Python programming!
        </div>
      )}
      {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          <strong>{msg.role === 'user' ? 'You' : 'COBU'}:</strong>
          <span>{msg.message}</span>
        </div>
      ))}
      {isLoading && (
        <div className="message ai loading">
          <strong>COBU:</strong>
          <span>Thinking...</span>
        </div>
      )}
    </div>
  );
}