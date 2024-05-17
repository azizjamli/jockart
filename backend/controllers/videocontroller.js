const Video = require('../models/Video');
const fs = require('fs');

const getVideosByChapitreId = async (req, res) => {
  const chapitreId = parseInt(req.params.chapitreId);

  if (isNaN(chapitreId) || chapitreId <= 0) {
    return res.status(400).json({ message: 'Invalid chapitre ID' });
  }

  try {
    const videos = await Video.findAll({
      where: { chapitre_id: chapitreId },
    });

    if (videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for this chapitre ID' });
    }

    // Prepare the response data by decoding video data
    const videosWithDecodedData = videos.map(video => {
      if (video.video) {
        // Assuming the video data is stored as base64 in the database
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
