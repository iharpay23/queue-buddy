import React, { useState, useEffect } from 'react';
import { useAuth, loginUrl } from '../auth/auth';
import LyricsVisualizer from './LyricsVisualizer';
import QueueDisplay from './QueueDisplay';
import { Track } from '../types/types';
import './App.css';

function App() {
  const { token, logout } = useAuth();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [previousTrack, setPreviousTrack] = useState<Track | null>(null);

  useEffect(() => {
    // Fetch lyrics only when the song changes
    const fetchLyrics = async () => {
      if (!currentTrack || currentTrack === previousTrack) return; // Prevent duplicate fetch
      setPreviousTrack(currentTrack);

      console.log('Fetching lyrics for:', currentTrack.name);
      try {
        const response = await fetch(
          `http://localhost:3001/lyrics?title=${encodeURIComponent(currentTrack.name)}&artist=${encodeURIComponent(currentTrack.artists[0].name)}`
        );
        const data = await response.json();
        if (data.lyrics) {
          setLyrics(data.lyrics);
        }
      } catch (err) {
        console.error('Failed to fetch lyrics:', err);
        setLyrics([]);
      }
    };

    fetchLyrics();
  }, [currentTrack, previousTrack]);

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Queue<span className="highlight">Buddy</span></h1>
        <p> Here to help you build the perfect queue. </p>
        {!token ? (
          <a href={loginUrl} className="button login">Connect with Spotify</a>
        ) : (
          <div className="connected">
            <QueueDisplay token={token} setCurrentTrack={setCurrentTrack} />
            <LyricsVisualizer lyrics={lyrics} />
            <button onClick={logout} className="button logout">Disconnect</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
