
import { useState, useEffect } from 'react';
import { Track } from '../types';

interface LyricsData {
  lyrics: string[];  // Split into lines for visualization
  attribution: string;
  sourceUrl: string;
}

export const useLyrics = (currentTrack: Track | null) => {
  const [lyricsData, setLyricsData] = useState<LyricsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!currentTrack) return;

      setLoading(true);
      setError(null);

      try {
        // First get the Genius URL
        const searchResponse = await fetch(
          `https://api.genius.com/search?q=${encodeURIComponent(
            `${currentTrack.name} ${currentTrack.artists[0].name}`
          )}`,
          {
            headers: {
              'Authorization': `Bearer YOUR_GENIUS_ACCESS_TOKEN`
            }
          }
        );

        const searchData = await searchResponse.json();
        const geniusUrl = searchData.response.hits[0]?.result.url;

        if (!geniusUrl) {
          throw new Error('Song not found on Genius');
        }

        // Then fetch lyrics from your server
        const lyricsResponse = await fetch(
          `/api/lyrics?geniusUrl=${encodeURIComponent(geniusUrl)}`
        );
        
        const data = await lyricsResponse.json();
        
        setLyricsData({
          lyrics: data.lyrics.split('\n'), // Split into lines for visualization
          attribution: data.attribution,
          sourceUrl: data.sourceUrl
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch lyrics');
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [currentTrack]);

  return { lyricsData, loading, error };
};