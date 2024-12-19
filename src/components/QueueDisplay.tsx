// import React, { useState, useEffect } from 'react';
import { useSpotifyPlayback } from '../hooks/spotifyhook';
import { useRecommendedSongs } from '../hooks/generatecue';
import './QueueDisplay.css';  // assuming your CSS is in QueueDisplay.css

interface QueueDisplayProps {
  token: string;
}

/* NOTE: this is how you return a JSX element */
function QueueDisplay({token}: QueueDisplayProps) {

  /* get state variables and playback functions from spotify hook */
  const { isPlaying, currentTrack, togglePlay, skipToNext, skipToPrevious } = useSpotifyPlayback(token);

  const recommendedTracks = useRecommendedSongs(currentTrack, token);

  const onGenerateQueue = () => {
    recommendedTracks.forEach((track) => {
      console.log('TRACK:', track);
    })
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
          <button className="control-btn" onClick={skipToPrevious}>←</button>
          <button className="control-btn play-btn" onClick={togglePlay}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button className="control-btn" onClick={skipToNext} > → </button>
        </div>
        <button onClick={onGenerateQueue} className="generate-btn">
          Generate <span className="highlight">Queue</span>
        </button>
      </div>
    </div>
  );
};

export default QueueDisplay;