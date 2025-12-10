const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Mood = require('../models/Mood');

// @route   GET /api/moods
// @desc    Get all moods for logged in student
// @access  Private (Student)
router.get('/', protect, authorize('student'), async (req, res) => {
  try {
    const moods = await Mood.find({ student: req.user._id })
      .sort('-date')
      .limit(90); // Last 90 days

    res.json({
      success: true,
      count: moods.length,
      data: moods
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/moods
// @desc    Log mood
// @access  Private (Student)
router.post('/', protect, authorize('student'), async (req, res) => {
  try {
    const { date, moodLevel, moodEmoji, note } = req.body;

    // Check if mood already logged for this date
    const existingMood = await Mood.findOne({
      student: req.user._id,
      date: new Date(date).setHours(0, 0, 0, 0)
    });

    if (existingMood) {
      // Update existing mood
      existingMood.moodLevel = moodLevel;
      existingMood.moodEmoji = moodEmoji;
      existingMood.note = note;
      await existingMood.save();

      return res.json({
        success: true,
        data: existingMood
      });
    }

    // Create new mood
    const mood = await Mood.create({
      student: req.user._id,
      date,
      moodLevel,
      moodEmoji,
      note
    });

    res.status(201).json({
      success: true,
      data: mood
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/moods/month
// @desc    Get moods for a specific month
// @access  Private (Student)
router.get('/month', protect, authorize('student'), async (req, res) => {
  try {
    const { year, month } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const moods = await Mood.find({
      student: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    }).sort('date');

    res.json({
      success: true,
      count: moods.length,
      data: moods
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/moods/today
// @desc    Get today's mood
// @access  Private (Student)
router.get('/today', protect, authorize('student'), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mood = await Mood.findOne({
      student: req.user._id,
      date: today
    });

    res.json({
      success: true,
      data: mood
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
