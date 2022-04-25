import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Kaitaku } from './lib/components/Main';
import { KaitakuError, } from './lib/types/error';

function App() {
  const [showFeedback, setShowFeedback] = useState(false)
  const onError = (args: KaitakuError) => {
    console.log("onError", args)
  }
  return (
    <div className="App">
      <header className="App-header">
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
            <Kaitaku
              projectId={'proj-1234'}
              onError={onError}
              token={'token'} />
          )
        }
      </header>
    </div>
  );
}

export default App;
