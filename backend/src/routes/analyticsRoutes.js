const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Session = require('../models/Session');
const User = require('../models/User');

// @route   GET /api/analytics/department
// @desc    Get department-wise analytics
// @access  Private (Management)
router.get('/department', protect, authorize('management'), async (req, res) => {
  try {
    const analytics = await Session.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'student',
          foreignField: '_id',
          as: 'studentInfo'
        }
      },
      { $unwind: '$studentInfo' },
      {
        $group: {
          _id: '$studentInfo.department',
          totalSessions: { $sum: 1 },
          redSeverity: {
            $sum: { $cond: [{ $eq: ['$severity', 'red'] }, 1, 0] }
          },
          yellowSeverity: {
            $sum: { $cond: [{ $eq: ['$severity', 'yellow'] }, 1, 0] }
          },
          greenSeverity: {
            $sum: { $cond: [{ $eq: ['$severity', 'green'] }, 1, 0] }
          }
        }
      },
      { $sort: { totalSessions: -1 } }
    ]);

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/year
// @desc    Get year-wise analytics
// @access  Private (Management)
router.get('/year', protect, authorize('management'), async (req, res) => {
  try {
    const analytics = await Session.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'student',
          foreignField: '_id',
          as: 'studentInfo'
        }
      },
      { $unwind: '$studentInfo' },
      {
        $group: {
          _id: '$studentInfo.year',
          totalSessions: { $sum: 1 },
          redSeverity: {
            $sum: { $cond: [{ $eq: ['$severity', 'red'] }, 1, 0] }
          },
          yellowSeverity: {
            $sum: { $cond: [{ $eq: ['$severity', 'yellow'] }, 1, 0] }
          },
          greenSeverity: {
            $sum: { $cond: [{ $eq: ['$severity', 'green'] }, 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/severity
// @desc    Get severity distribution
// @access  Private (Management)
router.get('/severity', protect, authorize('management'), async (req, res) => {
  try {
    const analytics = await Session.aggregate([
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      red: 0,
      yellow: 0,
      green: 0
    };

    analytics.forEach(item => {
      if (item._id) {
        result[item._id] = item.count;
      }
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/volume
// @desc    Get session volume
// @access  Private (Management)
router.get('/volume', protect, authorize('management'), async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let groupBy;
    if (period === 'month') {
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' }
      };
    } else {
      groupBy = {
        year: { $year: '$createdAt' }
      };
    }

    const analytics = await Session.aggregate([
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/overview
// @desc    Get overview statistics
// @access  Private (Management)
router.get('/overview', protect, authorize('management'), async (req, res) => {
  try {
    const totalSessions = await Session.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student', isOnboarded: true });
    const totalCounsellors = await User.countDocuments({ role: 'counsellor' });
    
    const activeCounsellors = await User.countDocuments({
      role: 'counsellor',
      isActive: true
    });

    res.json({
      success: true,
      data: {
        totalSessions,
        totalStudents,
        totalCounsellors,
        activeCounsellors
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
