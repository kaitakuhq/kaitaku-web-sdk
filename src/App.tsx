import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Hello } from './lib/components/Main';

function App() {
  const [showFeedback, setShowFeedback] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit files under <code>lib</code> folder and save to reload.
        </p>
        <button onClick={() => setShowFeedback(showFeedback => !showFeedback)} >
          {
            showFeedback
              ? 'Hide Feedback'
              : 'Show Feedback'
          }
        </button>
        {
          showFeedback && (
            <Hello />
          )
        }
      </header>
    </div>
  );
}

export default App;
