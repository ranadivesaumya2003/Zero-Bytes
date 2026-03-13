import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dark.css';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      alert('Please enter username and password');
      return;
    }

    setLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      localStorage.setItem('username', username);
      setUser(username);  // ← Update state immediately
      setLoading(false);
      navigate('/lobby');
    }, 1000);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="primary-btn login-submit">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}