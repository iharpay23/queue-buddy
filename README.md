# QueueBuddy 🎵  
QueueBuddy began as a perfect queue generator for Spotify but is now transforming into a sleek lyrics visualizer!  

## Why the change?  
On November 27, 2024, Spotify discontinued several Web API endpoints that provided unique song metadata. This inspired a shift in focus toward creating a feature-rich lyrics visualization tool.  

## What is QueueBuddy?  
QueueBuddy is a third-party web app leveraging Spotify's Client API and (soon) the Genius Lyrics API to enhance your music experience by:  
- Displaying synchronized lyrics for your favorite tracks (work in progress).  
- Offering a clean, intuitive interface to keep the focus on the music.  

## Features (Current and Planned)  
- **Synchronized Lyrics**: Real-time lyrics that match your music playback (coming soon).  
- **Seamless Spotify Integration**: Connect with your Spotify account effortlessly.  
- **Minimalist Design**: Prioritizing simplicity and usability.  

## Inspiration  
I listen to music all the time and trust my own ability to generate the perfect queue. For months, I have been trying to pinpoint the algorithm that makes two songs—even from drastically different genres—mesh well together. I wanted to encode this into a repeatable process capable of generating unexpectedly perfect queues for any user based on criteria such as:  
- Song tempo  
- Artist collaborations  
- "Era"  
- Feeling evoked  
- Danceability  
- Musical makeup  

When I realized it might not be possible to access much of the criteria my algorithm relied on, I switched gears to the next best thing: a third-party integration that could still provide a unique listening experience Spotify does not yet offer—a lyrics visualizer for your music.  

## Tech Stack  
- **Backend**: TypeScript  
- **Frontend**: React with TypeScript (TSX)  
- **APIs**: Spotify Client API, Genius Lyrics API (planned integration)  

## Current Progress  
- Built a robust integration with Spotify's Client API.  
- Established the foundation for the lyrics visualization feature.  

## Future Plans  
- Implement and refine lyrics visualization using the Genius Lyrics API.  
- Add customizable lyric themes and styles.  
- Introduce user annotations for lyrics.  
