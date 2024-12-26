import { useSpotifyPlayback } from '../hooks/spotifyhook';
import { useEffect, useState } from 'react';
import './QueueDisplay.css';

interface QueueDisplayProps {
  token: string;
  setCurrentTrack: (track: any) => void;
}

function QueueDisplay({ token, setCurrentTrack }: QueueDisplayProps) {
  const { isPlaying, currentTrack, togglePlay, skipToNext, skipToPrevious } = useSpotifyPlayback(token);
  const [bpm, setBpm] = useState<number | null>(null);
  const [previousTrackId, setPreviousTrackId] = useState<string | null>(null);

  // Fetch BPM when track changes
  useEffect(() => {
    const fetchBPM = async () => {
      if (!currentTrack || currentTrack.id === previousTrackId) return;
      setPreviousTrackId(currentTrack.id);

      try {
        const url = `http://localhost:3001/api/bpm?title=${encodeURIComponent(currentTrack.name)}&artist=${encodeURIComponent(currentTrack.artists[0].name)}`;
        console.log('Fetching BPM for:', currentTrack.name);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        if (data.bpm) {
          setBpm(parseFloat(data.bpm));
          console.log('Got BPM:', data.bpm);
        }
      } catch (err) {
        console.error('Failed to fetch BPM:', err);
        setBpm(null);
      }
    };

    fetchBPM();
  }, [currentTrack, previousTrackId]);

  return (
    <div className="queue-container">
      <div 
        className="queue-bouncer"
        style={{ 
          // Calculate animation duration from BPM (60 seconds / BPM = seconds per beat)
          animation: `pulse ${bpm ? `${60/bpm}s` : '0.54s'} ease-in-out infinite`,
          // Pause animation when music is paused
          animationPlayState: isPlaying ? 'running' : 'paused'
        }}
      >
        <div className="current-section">
          {/* Album Cover */}
          {currentTrack?.album?.images?.[0]?.url && (
            <img src={currentTrack.album.images[0].url} alt="Album Cover" className="album-cover" />
          )}

          {/* Track Info */}
          <div className="music-info">
            {currentTrack ? (
              <>
                <h3>Now Playing</h3>
                {bpm && <p className="tempo">{Math.round(bpm)} BPM</p>}
              </>
            ) : (
              <h3>Play a song to start</h3>
            )}
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