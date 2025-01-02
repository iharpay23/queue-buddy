import React, { useState } from 'react';
import { useAuth, loginUrl } from '../auth/auth';
import QueueDisplay from './QueueDisplay';
import { Track } from '../types/types';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const { token, logout } = useAuth();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  // const [lyrics, setLyrics] = useState<string[]>([]);


  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Q<span className="highlight">Buddy</span></h1>
        {!token ? (
          <LandingPage loginUrl={loginUrl} />
        ) : (
          <div className="connected">
            <QueueDisplay token={token} setCurrentTrack={setCurrentTrack} />
            {/* <LyricsVisualizer lyrics={lyrics} /> */}
            <button onClick={logout} className="button logout">Disconnect</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
