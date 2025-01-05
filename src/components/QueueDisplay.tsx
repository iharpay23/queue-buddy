import { useSpotifyPlayback } from "../hooks/spotifyhook";
import { useEffect, useState } from "react";

interface QueueDisplayProps {
  token: string;
  setCurrentTrack: (track: any) => void;
  logout: () => void;
}

function QueueDisplay({ token, setCurrentTrack, logout }: QueueDisplayProps) {
  const { isPlaying, currentTrack, togglePlay, skipToNext, skipToPrevious } =
    useSpotifyPlayback(token);
  const [bpm, setBpm] = useState<number | null>(null);
  const [previousTrackId, setPreviousTrackId] = useState<string | null>(null);
  const [tempoAdjust, setTempoAdjust] = useState(0); // -10 to +10 adjustment

  useEffect(() => {
    const fetchBPM = async () => {
      if (!currentTrack || currentTrack.id === previousTrackId) return;
      setPreviousTrackId(currentTrack.id);

      try {
        const url = `http://localhost:3001/api/bpm?title=${encodeURIComponent(
          currentTrack.name
        )}&artist=${encodeURIComponent(currentTrack.artists[0].name)}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        if (data.bpm) {
          setBpm(parseFloat(data.bpm));
          document.documentElement.style.setProperty(
            "--pulse-duration",
            `${60 / data.bpm}s`
          );
        } else {
          setBpm(100); // default BPM if none
          document.documentElement.style.setProperty(
            "--pulse-duration",
            "0.6s" // 60/100
          );
        }
      } catch (err) {
        console.error("Failed to fetch BPM:", err);
        setBpm(100); // set to default on error too
        document.documentElement.style.setProperty("--pulse-duration", "0.6s");
      }
    };

    fetchBPM();
  }, [currentTrack, previousTrackId]);

  useEffect(() => {
    if (bpm) {
      const adjustedBpm = bpm + tempoAdjust;
      document.documentElement.style.setProperty(
        "--pulse-duration",
        `${60 / adjustedBpm}s`
      );
    }
  }, [bpm, tempoAdjust]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {/* Main container with hover detection for controls */}
      <div className="relative group">
        {/* Player with bouncing effect */}
        <div
          className={`w-[400px] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl overflow-hidden shadow-2xl ${
            isPlaying ? "animate-bass-thump" : ""
          }`}
          onClick={togglePlay}
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-[-10%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-y-12 animate-shine" />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Album art */}
            {currentTrack?.album?.images?.[0]?.url ? (
              <div className="relative w-[320px] h-[320px] mx-auto">
                <img
                  src={currentTrack.album.images[0].url}
                  alt="Album Cover"
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
              </div>
            ) : (
              <div className="w-[320px] h-[320px] mx-auto bg-zinc-900 rounded-lg flex items-center justify-center">
                <span className="text-zinc-600 font-mono">
                  Play a song to start
                </span>
              </div>
            )}

            {/* Track info */}
            <div className="mt-6 text-center space-y-2">
              {bpm && (
                <div className="relative group">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTempoAdjust(Math.max(-10, tempoAdjust - 1));
                      }}
                      className={`opacity-0 group-hover:opacity-100 text-xs font-mono transition-opacity text-white/50 hover:text-white`}
                    >
                      −
                    </button>

                    <div className="text-zinc-400 font-mono text-lg tracking-wider">
                      {Math.round(bpm + tempoAdjust)} BPM
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTempoAdjust(Math.min(10, tempoAdjust + 1));
                      }}
                      className={`opacity-0 group-hover:opacity-100 text-xs font-mono transition-opacity text-white/50 hover:text-white`}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              <h2 className="text-white text-xl font-bold tracking-wide">
                {currentTrack?.name || "No track playing"}
              </h2>
              <p className="text-zinc-400 tracking-wide">
                {currentTrack?.artists?.[0]?.name}
              </p>
            </div>
          </div>
        </div>
        {/* Floating controls - fade in on hover */}
        <div className="absolute inset-y-0 -left-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
          <button
            onClick={skipToPrevious}
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 hover:scale-110 transition-all"
          >
            ←
          </button>
        </div>
        <div className="absolute inset-y-0 -right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
          <button
            onClick={skipToNext}
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 hover:scale-110 transition-all"
          >
            →
          </button>
        </div>
      </div>

      {/* Power cord and disconnect button */}
      <div className="mt-8 relative">
        {/* Power cord effect */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-16 bg-gradient-to-b from-white/50 to-white/20" />

        {/* Plug/Unplug button */}
        <button
          onClick={logout}
          className="relative group flex items-center justify-center w-32 h-12 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden hover:bg-white/5 transition-all"
        >
          {/* Plug prongs */}
          <div className="absolute inset-x-0 -top-2 flex justify-center space-x-2 group-hover:translate-y-8 transition-transform duration-300">
            <div className="w-1 h-4 bg-white/70 rounded-full" />
            <div className="w-1 h-4 bg-white/70 rounded-full" />
          </div>

          {/* Button text */}
          <span className="font-mono text-sm text-white/70 group-hover:opacity-0 transition-opacity">
            DISCONNECT
          </span>

          {/* Socket appearance on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-2">
              <div className="w-2 h-4 bg-zinc-800 rounded-sm" />
              <div className="w-2 h-4 bg-zinc-800 rounded-sm" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default QueueDisplay;
