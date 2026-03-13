import React from 'react';

export default function InputArea({ input, setInput, sendMessage, isLoading }) {
  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="Type your Python question here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !isLoading) sendMessage(); }}
        disabled={isLoading}
      />
      <button className="primary-btn" onClick={sendMessage} disabled={isLoading || !input.trim()}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}