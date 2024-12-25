import './LyricsVisualizer.css';

export default function LyricsVisualizer({ lyrics }: { lyrics: string[] }) {
    const LINE_DURATION = 5; // Duration in seconds for each lyric's animation
  
    return (
      <div className="lyrics-visualizer">
        {lyrics.map((line, index) => (
          <div
            key={index}
            className="wave-lyric"
            style={{
              animationDelay: `${LINE_DURATION * index}s`, // Stagger animations
              animationDuration: `${LINE_DURATION}s`, // Same duration for all lines
            }}
          >
            {line}
          </div>
        ))}
      </div>
    );
  }
  
  
