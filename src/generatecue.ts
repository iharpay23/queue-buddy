import { useState, useCallback, useEffect } from 'react';
import { Track } from './types';


export const useRecommendedSongs = (currentTrack: Track | null, token: string) => {
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  
  if (currentTrack) {
    console.log("listening to: ", currentTrack.name);
    console.log("with track id: ", currentTrack.id);
  }

  useEffect(() => {
    const fetchRecommendations = async () => {
      
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?seed_tracks=${currentTrack?.id}&limit=10`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        console.log("back from api call");
        const data = await response.json();
        setRecommendedTracks(data.tracks);
        console.log("just set new reocmmended");
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    if (currentTrack) fetchRecommendations();
  }, [currentTrack, token]);

  return recommendedTracks;
};