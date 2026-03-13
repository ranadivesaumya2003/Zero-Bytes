import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import LobbyPage from './LobbyPage';
import EditorPage from './EditorPage';
import Loader from './Loader';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('username');
    if (stored) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  // Listen for storage changes (when login happens)
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('username');
      if (stored) {
        setUser(stored);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/lobby" />} />
        <Route path="/lobby" element={user ? <LobbyPage /> : <Navigate to="/login" />} />
        <Route path="/main" element={user ? <EditorPage /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <Navigate to="/lobby" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;