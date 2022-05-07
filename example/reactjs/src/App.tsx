import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmdOS0NBalVIbERoak85bms1bW4iLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xN1QxODo1MTo1Ni41OTI2OCswOTowMCJ9.lL2kmWdoAhCfZOe1r7yl-7k4n-5EVdcwj6QhuB-tEek'
    const projectId = 'mVhuSeRl9UXjJevV0sTy'
    const user1 = 'user1';

    const kaitaku = new (window as any).Kaitaku({
      onError: (err: any) => {
        console.error(err)
      },
      projectId: projectId,
      token: token,
      userId: user1,
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit files under <code>lib</code> folder and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
