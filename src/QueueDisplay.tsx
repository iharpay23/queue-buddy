// import React, { useState, useEffect } from 'react';
import { useSpotifyPlayback } from './spotifyhook';
import { useRecommendedSongs } from './generatecue';
import './QueueDisplay.css';  // assuming your CSS is in QueueDisplay.css

interface QueueDisplayProps {
  token: string;
}

/* NOTE: this is how you return a JSX element */
function QueueDisplay({token}: QueueDisplayProps) {

  /* give the user token to get state variables from spotify hook */
  const { isPlaying, currentTrack, togglePlay } = useSpotifyPlayback(token);

  const recommendedTracks = useRecommendedSongs(currentTrack, token);

  const onGenerateQueue = () => {
    /* use current track and token to get a list of 10 recommended tracks */
    for (let i = 0; i < recommendedTracks.length; i++) {
      const track = recommendedTracks[i].name;
      console.log("TRACK: ", track);
    }
  }

  /* */
  return (
    <div className="queue-container">
      {/* <div className={`current-section ${recommendedTracks.length > 0 ? 'slide-left' : ''}`}> */}
      <div className="current-section">
        {currentTrack?.album?.images?.[0]?.url && (
          <img src={currentTrack.album.images[0].url} alt="Album Cover" className="album-cover" />
        )}
        <div className="music-info">
          {currentTrack ? <h3>Now Playing</h3> : <h3>Play a song to start</h3>}
          <p className="track">{currentTrack?.name}</p>
          <p className="artist">{currentTrack?.artists?.[0].name}</p>
        </div>
        <div className="controls">
          <button className="control-btn">←</button>
          <button className="control-btn play-btn" onClick={togglePlay}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button className="control-btn">→</button>
        </div>
        <button onClick={onGenerateQueue} className="generate-btn">
          Generate <span className="highlight">Queue</span>
        </button>
      </div>
    </div>
  );
};

export default QueueDisplay;