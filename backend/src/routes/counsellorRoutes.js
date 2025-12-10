const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/counsellors
// @desc    Get all counsellors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const counsellors = await User.find({ role: 'counsellor' })
      .select('name specialization isActive')
      .sort('name');

    res.json({
      success: true,
      count: counsellors.length,
      data: counsellors
    });
  } catch (error) {
    console.error('Error fetching counsellors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/counsellors/:id
// @desc    Get single counsellor
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const counsellor = await User.findOne({
      _id: req.params.id,
      role: 'counsellor'
    }).select('name specialization isActive');

    if (!counsellor) {
      return res.status(404).json({ message: 'Counsellor not found' });
    }

    res.json({
      success: true,
      data: counsellor
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
