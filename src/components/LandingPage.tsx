import React from "react";

const LandingPage = ({ loginUrl }: { loginUrl: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Digital Stereo System text */}
      <div className="text-zinc-400 font-mono text-sm tracking-widest text-center mb-8">
        DIGITAL STEREO SYSTEM
      </div>

      {/* Record Player */}
      <div className="relative w-96 h-96">
        {/* Base/Cabinet with enhanced chrome look */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-800 rounded-lg shadow-xl overflow-hidden">
          {/* Main metallic surface */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/5" />

          {/* Moving shine effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-[-10%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-y-12 animate-shine" />
          </div>

          {/* Metallic texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                135deg,
                white 0px,
                white 1px,
                transparent 1px,
                transparent 4px
              )`,
            }}
          />

          {/* Edge highlight */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)",
            }}
          />

          {/* Inner shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.7)] rounded-lg" />

          {/* Turntable surface */}
          <div className="absolute top-8 left-8 right-8 bottom-8 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-md shadow-inner overflow-hidden">
            {/* Surface shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-md" />

            {/* Record */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 group">
              {/* Base record with shine effect */}
              <div className="absolute inset-0 rounded-full bg-zinc-900 transition-transform hover:scale-[1.02] duration-300 overflow-hidden">
                {/* Shine animation */}
                <div className="absolute inset-[-50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-y-12 animate-shine" />

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 bg-zinc-900 rounded-full transition-transform duration-700 group-hover:scale-[1.02] group-hover:opacity-70" />
                <div className="absolute inset-0 bg-zinc-900 rounded-full transition-transform duration-500 group-hover:scale-[1.01] group-hover:opacity-80" />

                {/* Record grooves */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border border-zinc-800/50"
                    style={{
                      margin: `${i * 16}px`,
                      boxShadow: "inset 0 0 15px rgba(255,255,255,0.05)",
                    }}
                  />
                ))}

                {/* Center label */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg hover:from-emerald-400 hover:to-emerald-500 transition-all cursor-pointer z-10">
                  <a
                    href={loginUrl}
                    className="text-white text-center font-mono text-xs tracking-widest uppercase p-4 no-underline hover:scale-105 transition-transform"
                  >
                    Connect with Spotify
                  </a>
                </div>
              </div>
            </div>

            {/* Tonearm */}
            <div className="absolute top-8 right-8 w-32 h-4 bg-zinc-600 rounded-full origin-right transform -rotate-45">
              <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-zinc-500" />{" "}
              {/* Base */}
              <div className="absolute left-0 -bottom-2 w-6 h-6 bg-zinc-800" />{" "}
              {/* Cartridge */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer text */}
      {/* <div className="text-zinc-500 font-mono text-xs mt-8">
        MODEL QB-2025 · A BEAT-SYNCED LISTENING ENGINE
      </div> */}
    </div>
  );
};

export default LandingPage;
