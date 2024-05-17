const Video = require('../models/Video');

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

    const videosWithBase64Data = videos.map(video => {
      return {
        ...video.toJSON(),
        video: video.video.toString('base64'), // Encode the binary data to base64
      };
    });

    res.json(videosWithBase64Data);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getVideosByChapitreId,
};
