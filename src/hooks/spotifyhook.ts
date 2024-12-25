import { useEffect, useRef, useState, useCallback } from 'react';
import { Track } from '../types/types';

/* Spotify hook to consolidate:
    * API calls for playback state
    * polling for current track (refresh/updating)
    * play/pause functionality
    * retrieving songs for queue generation
    * tempo retrieval for audio features
*/
/* returns an isPlaying state variable, the current playing track, tempo, and
*  a function to toggle on/off. makes the actual api calls */
export const useSpotifyPlayback = (token: string) => {
    /* maintains state variables */
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [tempo, setTempo] = useState<number | null>(null);

    const previousTrackIdRef = useRef<string | null>(null); // Initialize ref

    /* API CALL: fetch tempo of the current track */
    const fetchTrackTempo = useCallback(async (trackId: string) => {
      console.log("inside fetchTrackTempo");
      try {
          const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          const data = await response.json();
          if (data && data.tempo) {
              console.log("tempo: ", data.tempo);
              setTempo(data.tempo); // Update tempo state
          }
      } catch (error) {
          console.error("Error fetching track tempo:", error);
      }
    },[token]);

    /* API CALL: function to get the playback state from Spotify */
    const getPlaybackState = useCallback(async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();          
            if (data && data.item) {
                setIsPlaying(data.is_playing);
                setCurrentTrack(data.item);
                 // Only fetch tempo if the track ID has changed
                 if (data.item.id !== previousTrackIdRef.current) {
                  console.log("New track detected, fetching tempo for:", data.item.id);
                  setCurrentTrack(data.item);
                  await fetchTrackTempo(data.item.id);
                  previousTrackIdRef.current = data.item.id; // Update reference
              }
            }
        } catch (error) {
            console.error("Error fetching playback state:", error);
        }
    }, [fetchTrackTempo, token]);


    /* API CALL: func to control pause and play button */
    const togglePlay = async () => {
        if (!currentTrack) return;

        try {
            const action = isPlaying ? 'pause' : 'play';
            await fetch(`https://api.spotify.com/v1/me/player/${action}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            await getPlaybackState();
        } catch (error) {
            console.error("Error controlling playback:", error);
        }
    };

    const skipToNext = async () => {
        try {
            await fetch (`https://api.spotify.com/v1/me/player/next`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            await getPlaybackState(); // Refresh state after skipping
        } catch (error) {
            console.error("Error skipping to next track:", error);
        }
    };

    const skipToPrevious = async () => {
        try {
            await fetch (`https://api.spotify.com/v1/me/player/previous`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            await getPlaybackState(); // Refresh state after skipping
        } catch (error) {
            console.error("Error skipping to previous track:", error);
        }
    };

    /* polling logic to constantly update playback state */
    useEffect(() => {
        getPlaybackState();
        const interval = setInterval(getPlaybackState, 3000); /* get PB state every 3s */
        return () => clearInterval(interval);
    }, [getPlaybackState]);

    return { isPlaying, currentTrack, tempo, togglePlay, skipToNext, skipToPrevious };
};
