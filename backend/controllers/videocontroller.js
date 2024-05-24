const Video = require('../models/Video');
const sequelize = require('../dbConfig');
const fs = require('fs');
const path = require('path');

// Get videos by chapitre ID
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

    // Map videos to include file path
    const videosWithFilePath = videos.map(video => ({
      ...video.toJSON(),
      video_file_path: video.video.replace(/\\/g, '/') // Convert backslashes to forward slashes
    }));

    res.json(videosWithFilePath);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).send('Server Error');
  }
};

// Create a new video
const createVideo = async (req, res) => {
  const chapitreId = parseInt(req.params.chapitreId);

  if (isNaN(chapitreId) || chapitreId <= 0) {
    return res.status(400).json({ message: 'Invalid chapitre ID' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Video file is required' });
  }

  const videoTitle = req.body.title;
  const videoFileName = req.file.filename; // Get the filename from req.file

  try {
    const newVideo = await Video.create({
      chapitre_id: chapitreId,
      video_titre: videoTitle,
      video: videoFileName // Store the filename instead of the path
    });

    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).send('Server Error');
  }
};

// Delete a video by ID
const deleteVideo = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: 'Invalid video ID' });
  }

  try {
    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Get the full path of the video file
    const videoFilePath = path.join(__dirname, '..', 'uploads', 'videos', video.video);

    // Delete the video file from the uploads folder
    fs.unlinkSync(videoFilePath);

    // Delete the video from the database
    await video.destroy();

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getVideosByChapitreId,
  createVideo,
  deleteVideo,
};
