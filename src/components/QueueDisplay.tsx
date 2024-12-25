import { useSpotifyPlayback } from '../hooks/spotifyhook';
import { useEffect } from 'react';

import './QueueDisplay.css';

interface QueueDisplayProps {
  token: string;
  setCurrentTrack: (track: any) => void; // Update parent with the current track
}

function QueueDisplay({ token, setCurrentTrack }: QueueDisplayProps) {
  const { isPlaying, currentTrack, tempo, togglePlay, skipToNext, skipToPrevious } = useSpotifyPlayback(token);

  console.log("TEMPO: ", tempo);
  
  // Notify parent about the current track
  useEffect(() => {
    setCurrentTrack(currentTrack);
  }, [currentTrack, setCurrentTrack]);

  return (
    <div className="queue-container">
      <div className="queue-bouncer"> {/* Add wrapper for animation */}
        <div className="current-section">
          {/* Album Cover */}
          {currentTrack?.album?.images?.[0]?.url && (
            <img src={currentTrack.album.images[0].url} alt="Album Cover" className="album-cover" />
          )}

          {/* Track Info */}
          <div className="music-info">
            {currentTrack ? <h3>Now Playing</h3> : <h3>Play a song to start</h3>}
            <p className="track">{currentTrack?.name}</p>
            <p className="artist">{currentTrack?.artists?.[0]?.name}</p>
          </div>

          {/* Controls */}
          <div className="controls">
            <button className="control-btn" onClick={skipToPrevious}>←</button>
            <button className="control-btn play-btn" onClick={togglePlay}>
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button className="control-btn" onClick={skipToNext}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueueDisplay;
