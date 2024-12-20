import React, { useState, useEffect } from 'react';
import { Track } from '../types/types';

const FallingLyric = ({ line, delay }: { line: string; delay: number }) => (
  <div 
    className="absolute left-0 w-full text-center text-white text-2xl"
    style={{
      animation: `fall 8s linear ${delay}s forwards`,
      opacity: 0
    }}
  >
    {line}
  </div>
);

export default function LyricsVisualizer({ currentTrack }: { currentTrack: Track | null }) {
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!currentTrack) return;
      
      setLoading(true);
      try {
        console.log('TRACK: ', currentTrack.name);
        console.log('ARTIST:', currentTrack.artists[0].name);
        /* craft the URL to send to the backend */
        const response = await fetch(
            `http://localhost:3001/lyrics?title=${encodeURIComponent(currentTrack.name)}&artist=${encodeURIComponent(currentTrack.artists[0].name)}`
        );
        const data = await response.json();
        console.log("LYRICS FETCHED: ", data.lyrics);
        
        if (data.lyrics) {
          setLyrics(data.lyrics.split('\n').filter((line: string) => line.trim()));
        }
      } catch (err) {
        setError('Failed to load lyrics');
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [currentTrack]);

  if (loading) return <div className="text-white">Loading lyrics...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-50px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}
      </style>
      {lyrics.map((line, index) => (
        <FallingLyric key={index} line={line} delay={index * 2} />
      ))}
    </div>
  );
}