const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Journal = require('../models/Journal');

// @route   GET /api/journals
// @desc    Get all journals for logged in student
// @access  Private (Student)
router.get('/', protect, authorize('student'), async (req, res) => {
  try {
    const journals = await Journal.find({ student: req.user._id })
      .sort('-createdAt');

    res.json({
      success: true,
      count: journals.length,
      data: journals
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/journals
// @desc    Create journal
// @access  Private (Student)
router.post('/', protect, authorize('student'), async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    const journal = await Journal.create({
      student: req.user._id,
      title,
      content,
      mood
    });

    res.status(201).json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/journals/:id
// @desc    Update journal
// @access  Private (Student)
router.put('/:id', protect, authorize('student'), async (req, res) => {
  try {
    let journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    // Check ownership
    if (journal.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    journal = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/journals/:id
// @desc    Delete journal
// @access  Private (Student)
router.delete('/:id', protect, authorize('student'), async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    // Check ownership
    if (journal.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await journal.deleteOne();

    res.json({
      success: true,
      message: 'Journal deleted'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
