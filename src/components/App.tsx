import React, { useState } from 'react';
import { useAuth, loginUrl } from '../auth/auth';
import QueueDisplay from './QueueDisplay';
import { Track } from '../types/types';
import LandingPage from './LandingPage';

function App() {
  const { token, logout } = useAuth();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
      <div className="text-center">
        <h1 className="font-['Rubik_Glitch'] text-9xl font-thin text-white brightness-110 mt-0 -mb-3">
          Q<span className="text-[#25afe6]">Buddy</span>
        </h1>
        {!token ? (
          <LandingPage loginUrl={loginUrl} />
        ) : (
          <div className="flex flex-col items-center relative z-0 mt-7">
            <QueueDisplay 
              token={token} 
              setCurrentTrack={setCurrentTrack} 
              logout={logout}  // Pass logout function to QueueDisplay
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;