/* SpotifyHook.ts */
import { useEffect, useState, useCallback } from 'react';
import { Track } from './types';

/* spotify hook to consolidate:
    * API calls for playback state
    * polling for current track (refresh/updating)
    * play/pause functionality
    * retrieving songs for queue generation
*/
/* returns an isPlaying state variable, the current playing track, and
*  a function to toggle on/off. makes the actual api calls */
export const useSpotifyPlayback = (token: string) => {
    /* maintains two state variables */
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

    /* API CALL: function to get the playback state from spotify */
    const getPlaybackState = useCallback(async () => {
        try {
          /* fetch - grabs a resource from a website, returning a promise */
          const response = await fetch('https://api.spotify.com/v1/me/player', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();          
          if (data && data.item) {
            setIsPlaying(data.is_playing);
            setCurrentTrack(data.item);
          }
        } catch (error) {
          console.error("Error fetching playback state:", error);
        }
      }, [token]);

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
      } catch (error) {
        console.error("Error skipping to previous track:", error);
      }
    };

    /* polling logic to constantly update playback state */
    useEffect(() => {
        getPlaybackState();
        const interval = setInterval(getPlaybackState, 3000); /* get PB state every 3s */
        return () => clearInterval(interval);
    }, [getPlaybackState]); /* remove token callback (?) */

    return { isPlaying, currentTrack, togglePlay, skipToNext, skipToPrevious};
};