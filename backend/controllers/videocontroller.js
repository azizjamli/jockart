const Video = require('../models/Video');
const fs = require('fs');

const getVideosByChapitreId = async (req, res) => {
  const chapitreId = parseInt(req.params.chapitreId); // Extract and parse the chapitre ID from the request parameters

  // Check if chapitreId is a valid number
  if (isNaN(chapitreId) || chapitreId <= 0) {
    return res.status(400).json({ message: 'Invalid chapitre ID' });
  }

  try {
    const videos = await Video.findAll({
      where: { chapitre_id: chapitreId }, // Filter by chapitre_id
    });

    if (videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for this chapitre ID' });
    }

    // Decode base64 video data
    const videosWithDecodedData = videos.map(video => {
      if (video.video) {
        const decodedVideo = Buffer.from(video.video, 'base64').toString('binary');
        return {
          ...video.toJSON(),
          video: decodedVideo,
        };
      } else {
        return video;
      }
    });

    res.json(videosWithDecodedData);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getVideosByChapitreId,
};
