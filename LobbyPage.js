import React from 'react';
import { useNavigate } from 'react-router-dom';
import { exercises } from './ExerciseData';
import './dark.css';

export default function LobbyPage() {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = React.useState(null);
  const [lampOn, setLampOn] = React.useState(true);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const openExercise = (exercise) => {
    setSelectedExercise(exercise);
    setTimeout(() => {
      navigate('/main', { state: { exercise } });
    }, 300);
  };

  const toggleLamp = () => {
    setLampOn(!lampOn);
  };

  return (
    <div className="lobby-room-container">
      {/* Top Bar - Simplified & Chic */}
      <div className="lobby-top-bar">
        <h1 className="brand-title">ZeroBytes</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* 3D ROOM */}
      <div className="room-3d">
        {/* Background walls */}
        <div className="room-background">
          <div className="wall-back"></div>
          <div className="wall-left"></div>
          <div className="wall-right"></div>
          <div className="floor"></div>
        </div>

        {/* DESK */}
        <div className="desk-container">
          {/* Desk surface */}
          <div className="desk">
            {/* Lamp - CLICKABLE */}
            <div 
              className={`lamp ${lampOn ? 'on' : 'off'}`}
              onClick={toggleLamp}
              title="Click to toggle lamp"
              style={{ cursor: 'pointer' }}
            >
              <div className="lamp-base"></div>
              <div className="lamp-pole"></div>
              <div className="lamp-shade"></div>
              {lampOn && <div className="lamp-light"></div>}
            </div>

            {/* Desktop Computer */}
            <div className="desktop-computer">
              {/* Monitor Stand */}
              <div className="monitor-stand"></div>

              {/* Monitor */}
              <div className="monitor">
                <div className="monitor-bezel">
                  {/* Screen Content */}
                  <div className="monitor-screen">
                    <div className="screen-header">
                      <h2>Python Exercises</h2>
                    </div>

                    {/* Exercises Grid on Screen */}
                    <div className="screen-exercises-grid">
                      {exercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className={`screen-exercise-card ${
                            selectedExercise?.id === exercise.id ? 'selected' : ''
                          }`}
                          onClick={() => openExercise(exercise)}
                        >
                          <div className="exercise-icon">
                            {exercise.id === 1 && '📋'}
                            {exercise.id === 2 && '🔒'}
                            {exercise.id === 3 && '⚙️'}
                            {exercise.id === 4 && '🔄'}
                            {exercise.id === 5 && '📚'}
                            {exercise.id === 6 && '📝'}
                          </div>
                          <div className="exercise-name">{exercise.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyboard */}
              <div className="keyboard">
                <div className="keyboard-key"></div>
                <div className="keyboard-key"></div>
                <div className="keyboard-key"></div>
              </div>

              {/* Mouse */}
              <div className="mouse"></div>
            </div>

            {/* Plant/Decoration */}
            <div className="plant">
              <div className="pot"></div>
              <div className="leaf leaf-1"></div>
              <div className="leaf leaf-2"></div>
              <div className="leaf leaf-3"></div>
            </div>
          </div>

          {/* Desk Legs */}
          <div className="desk-leg desk-leg-1"></div>
          <div className="desk-leg desk-leg-2"></div>
        </div>

        {/* Floating particles */}
        <div className="particles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="particle" style={{ '--delay': `${i * 0.5}s` }}></div>
          ))}
        </div>
      </div>

      {/* Hint Text */}
      <div className="lobby-hint">
        💡 Click the lamp to toggle • Select an exercise to start
      </div>
    </div>
  );
}
