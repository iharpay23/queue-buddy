import React, { useState, useEffect } from 'react';
import QueueDisplay from './QueueDisplay';
import { useAuth, loginUrl } from './auth';
import './App.css';

function App() {

  /* entry point: get access token from auth component */
  const { token, logout } = useAuth();

  /* login screen */
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">
          Queue<span className="highlight">Buddy</span>
        </h1>
        <p className="subtitle">
          Let us help you build the perfect queue.
        </p>
        {!token ? (
          <a href={loginUrl} className="button login"> 
            Connect with Spotify
          </a>
        ) : (
          <div className="connected">
            <QueueDisplay token={token}/> 
            <div className="status"> ✓ Connected to Spotify </div>
            <button onClick={logout} className="button logout"> Disconnect </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;