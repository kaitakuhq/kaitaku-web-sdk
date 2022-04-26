import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Kaitaku } from './lib/components/Main';
import { KaitakuError, } from './lib/types/error';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmdOS0NBalVIbERoak85bms1bW4iLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xN1QxODo1MTo1Ni41OTI2OCswOTowMCJ9.lL2kmWdoAhCfZOe1r7yl-7k4n-5EVdcwj6QhuB-tEek'
const projectId = 'mVhuSeRl9UXjJevV0sTy'
const user1 = 'user1'

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
              projectId={projectId}
              onError={onError}
              token={token}
              userId={user1}
            />
          )
        }
      </header>
    </div>
  );
}

export default App;
