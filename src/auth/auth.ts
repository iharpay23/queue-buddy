// auth.ts
import { useState, useEffect } from 'react';

// const CLIENT_ID = '16d97d73cf9d4ebdb9d6808f77b1aab5';
// const REDIRECT_URI = 'http://localhost:3000';
// const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
// const RESPONSE_TYPE = 'token';
// const SCOPE = 'user-library-read user-modify-playback-state user-read-playback-state playlist-modify-public';

// export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

const CLIENT_ID = '16d97d73cf9d4ebdb9d6808f77b1aab5';
const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://your-production-url.com/callback' // Replace with your deployed app's redirect URI
    : 'http://localhost:3000';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'user-library-read user-modify-playback-state user-read-playback-state playlist-modify-public';

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;

/* get the access token that allows a user to log into their
 * spotify account */
export const useAuth = () => {
    const [token, setToken] = useState<string>('');
  
    useEffect(() => {
      const hash = window.location.hash;
      const storedToken = localStorage.getItem('token');
  
      if (hash) {
        const token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
        if (token) {
          const accessToken = token.split('=')[1];
          localStorage.setItem('token', accessToken);
          setToken(accessToken);
          window.location.hash = '';
        }
      } else if (storedToken) {
        // Validate stored token before using it
        fetch('https://api.spotify.com/v1/me', {
          headers: { 'Authorization': `Bearer ${storedToken}` }
        }).then(response => {
          if (response.ok) {
            setToken(storedToken);
          } else {
            localStorage.removeItem('token');
          }
        });
      }
    }, []);
  
    const logout = () => {
      setToken('');
      localStorage.removeItem('token');
    };
  
    return { token, logout };
};