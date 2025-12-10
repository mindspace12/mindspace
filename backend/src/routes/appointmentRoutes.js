const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const TimeSlot = require('../models/TimeSlot');
const Appointment = require('../models/Appointment');

// @route   GET /api/appointments/slots/:counsellorId
// @desc    Get time slots for a counsellor
// @access  Public
router.get('/slots/:counsellorId', async (req, res) => {
  try {
    const slots = await TimeSlot.find({
      counsellor: req.params.counsellorId,
      isAvailable: true
    }).sort('dayOfWeek startTime');

    res.json({
      success: true,
      count: slots.length,
      data: slots
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/appointments/slots
// @desc    Create time slot (Counsellor)
// @access  Private (Counsellor)
router.post('/slots', protect, authorize('counsellor'), async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;

    const slot = await TimeSlot.create({
      counsellor: req.user._id,
      dayOfWeek,
      startTime,
      endTime
    });

    res.status(201).json({
      success: true,
      data: slot
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Time slot already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/appointments/my
// @desc    Get my appointments
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'student') {
      appointments = await Appointment.find({ student: req.user._id })
        .populate('counsellor', 'name specialization')
        .populate('timeSlot')
        .sort('-appointmentDate');
    } else if (req.user.role === 'counsellor') {
      appointments = await Appointment.find({ counsellor: req.user._id })
        .populate('student', 'anonymousUsername')
        .populate('timeSlot')
        .sort('-appointmentDate');
    }

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/appointments
// @desc    Book appointment
// @access  Private (Student)
router.post('/', protect, authorize('student'), async (req, res) => {
  try {
    const { counsellorId, timeSlotId, appointmentDate } = req.body;

    // Check for existing appointment
    const existing = await Appointment.findOne({
      student: req.user._id,
      status: 'scheduled',
      appointmentDate: { $gte: new Date() }
    });

    if (existing) {
      return res.status(400).json({ message: 'You already have a scheduled appointment' });
    }

    const appointment = await Appointment.create({
      student: req.user._id,
      counsellor: counsellorId,
      timeSlot: timeSlotId,
      appointmentDate,
      status: 'scheduled'
    });

    // TODO: Send email notifications

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/appointments/:id/cancel
// @desc    Cancel appointment
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    if (
      req.user.role === 'student' &&
      appointment.student.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    // TODO: Send email notifications

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
