import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import { Kaitaku } from '@kaitaku/kaitaku-web-sdk'

function App() {
  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYU5LckpnQTl1dUxCU1hKaDBtMXoiLCJjcmVhdGVkX2F0IjoiMjAyMi0wNS0xN1QxNTo1MzoyOS40NDc0Mzk3MVoifQ.seR3Ci8I4c-rM_2oCRtPUVactFxG9fHS295ONPb8rkY';
    const projectId = 'iEXZKgkiZsVsTlrsEtpN'

    const kaitaku = new Kaitaku({
      onError: (err: any) => {
        console.error(err)
      },
      projectId: projectId,
      token: token,
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
