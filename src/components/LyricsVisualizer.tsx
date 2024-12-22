import React, { useEffect, useRef } from 'react';

export default function LyricsVisualizer({ lyrics }: { lyrics: string[] }) {
  const previousLyrics = useRef<string[]>([]);

  useEffect(() => {
    // Only trigger animation reset if lyrics actually changed
    if (
        !lyrics ||
        lyrics.length === 0 ||
        (previousLyrics.current.length === lyrics.length &&
          previousLyrics.current.every((line, index) => line === lyrics[index]))
      ) {
        return;
      }
  
      // Save current lyrics for future comparisons
      previousLyrics.current = lyrics;
      
    const animationElements = document.querySelectorAll('.wave-lyric');
    animationElements.forEach((element) => {
      const htmlElement = element as HTMLElement; // Explicitly cast to HTMLElement
      htmlElement.classList.remove('wave-lyric');
      void htmlElement.offsetWidth; // Trigger reflow
      htmlElement.classList.add('wave-lyric');
    });
  }, [lyrics]);

  return (
    <div className="lyrics-visualizer">
      {lyrics.map((line, index) => (
        <div
          key={index}
          className={`wave-lyric ${index % 2 === 0 ? 'left' : 'right'}`} // Alternate left/right
          style={{
            animationDelay: `${index * 3}s`, // Sequential animation
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}
