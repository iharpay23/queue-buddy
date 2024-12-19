// server/lyrics.ts
import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import NodeCache from 'node-cache';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 86400 }); // Cache for 24 hours

router.get('/lyrics', async (req, res) => {
  try {
    const { geniusUrl } = req.query;
    
    // Type check and validation
    if (!geniusUrl || typeof geniusUrl !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid geniusUrl parameter' });
    }

    // Check cache first
    const cachedLyrics = cache.get(geniusUrl);
    if (cachedLyrics) {
      return res.json({ lyrics: cachedLyrics });
    }

    // Fetch the page
    const response = await axios.get(geniusUrl);
    const $ = cheerio.load(response.data);
    
    // Extract lyrics - adjust selector based on Genius's current structure
    const lyrics = $('[data-lyrics-container="true"]')
      .map((_, el) => $(el).text())
      .get()
      .join('\n');

    // Store in cache
    cache.set(geniusUrl, lyrics);

    // Send response with attribution
    res.json({ 
      lyrics,
      attribution: "Lyrics provided by Genius.com",
      sourceUrl: geniusUrl
    });

  } catch (error) {
    console.error('Error fetching lyrics:', error);
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
});

export default router;