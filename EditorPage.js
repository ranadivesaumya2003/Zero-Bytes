import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { exercises } from './ExerciseData';
import './dark.css';
import ChatModal from './ChatModal';

export default function EditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState('# Write your code here\n');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [error, setError] = useState('');

  // Get exercise from location state
  useEffect(() => {
    if (location.state?.exercise) {
      const exercise = exercises.find(e => e.id === location.state.exercise.id);
      if (exercise) {
        setExerciseData(exercise);
      }
    }
  }, [location]);

  // Run Python code using Piston API
  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');

    try {
      // Piston API endpoint for Python execution
      const response = await fetch('https://api.codex.piston.rocks/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',  // Python version
          files: [
            {
              name: 'main.py',
              content: userCode,
            },
          ],
        }),
      });

      const data = await response.json();

      // Check if execution was successful
      if (data.run) {
        if (data.run.stdout) {
          setOutput(data.run.stdout);
        } else if (data.run.stderr) {
          setError(data.run.stderr);
          setOutput('');
        } else {
          setOutput('(Code executed successfully with no output)');
        }
      } else if (data.compile && data.compile.stderr) {
        setError(`Compilation Error:\n${data.compile.stderr}`);
        setOutput('');
      } else {
        setOutput('(Code executed successfully)');
      }
    } catch (err) {
      setError(
        `Error executing code: ${err.message}\n\nMake sure your code is valid Python and doesn't have infinite loops.`
      );
      setOutput('');
    } finally {
      setIsRunning(false);
    }
  };

  if (!exerciseData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: '#999' }}>Loading exercise...</p>
      </div>
    );
  }

  return (
    <div className="editor-page-container">
      {/* Header */}
      <div className="editor-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button className="back-btn" onClick={() => navigate('/lobby')}>
            ← Back to Lobby
          </button>
          <h1 style={{ margin: 0 }}>{exerciseData.name}</h1>
        </div>
        <span className="challenge-text">{exerciseData.challenge}</span>
      </div>

      {/* Main Content - Split View */}
      <div className="editor-main-content">
        {/* Left Panel - Example Code */}
        <div className="example-panel">
          <div className="panel-header">
            <h2>Example Code</h2>
          </div>
          <div className="example-code-container">
            <MonacoEditor
              height="100%"
              theme="vs-dark"
              defaultLanguage="python"
              value={exerciseData.example}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 13,
              }}
            />
          </div>
        </div>

        {/* Right Panel - User Code + Output */}
        <div className="code-panel">
          {/* Editor Section */}
          <div className="editor-section">
            <div className="panel-header">
              <h2>Your Code</h2>
              <button className="run-btn" onClick={runCode} disabled={isRunning}>
                {isRunning ? '⏳ Running...' : '▶ Run Code'}
              </button>
            </div>
            <div className="user-code-container">
              <MonacoEditor
                height="100%"
                theme="vs-dark"
                defaultLanguage="python"
                value={userCode}
                onChange={(value) => setUserCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 13,
                }}
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="output-section">
            <div className="panel-header">
              <h2>Output</h2>
              <button 
                className="clear-btn" 
                onClick={() => {
                  setOutput('');
                  setError('');
                }}
              >
                Clear
              </button>
            </div>
            <div className="output-container">
              {error ? (
                <div className="output-error">
                  <strong>❌ Error:</strong>
                  <pre>{error}</pre>
                </div>
              ) : output ? (
                <pre>{output}</pre>
              ) : (
                <p style={{ color: '#666' }}>(Output will appear here when you run your code)</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <button 
        className="floating-chat-btn"
        onClick={() => setShowChat(true)}
        title="Chat with COBU"
      >
        <span className="chat-icon">💬</span>
        <span className="tooltip">Chat with COBU</span>
      </button>

      {/* Chat Modal */}
      {showChat && <ChatModal onClose={() => setShowChat(false)} />}
    </div>
  );
}
