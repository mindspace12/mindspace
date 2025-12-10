const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, name, specialization } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const userData = {
      email,
      password,
      role: role || 'student'
    };

    // Add role-specific fields
    if (role !== 'student') {
      userData.name = name;
      userData.isOnboarded = true;
    }

    if (role === 'counsellor') {
      userData.specialization = specialization;
    }

    const user = await User.create(userData);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        isOnboarded: user.isOnboarded,
        name: user.name,
        specialization: user.specialization
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        isOnboarded: user.isOnboarded,
        anonymousUsername: user.anonymousUsername,
        name: user.name,
        year: user.year,
        department: user.department,
        specialization: user.specialization
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   POST /api/auth/onboarding
// @desc    Complete student onboarding
// @access  Private (Student only)
router.post('/onboarding', protect, async (req, res) => {
  try {
    const { year, department } = req.body;

    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can complete onboarding' });
    }

    if (req.user.isOnboarded) {
      return res.status(400).json({ message: 'User already onboarded' });
    }

    // Generate anonymous username
    const anonymousUsername = await User.generateAnonymousUsername();

    // Generate QR code secret
    const qrSecret = uuidv4();
    
    // Generate QR code
    const qrData = JSON.stringify({
      studentId: req.user._id,
      username: anonymousUsername,
      secret: qrSecret
    });
    const qrCode = await QRCode.toDataURL(qrData);

    // Update user
    req.user.year = year;
    req.user.department = department;
    req.user.anonymousUsername = anonymousUsername;
    req.user.qrSecret = qrSecret;
    req.user.qrCode = qrCode;
    req.user.isOnboarded = true;
    
    await req.user.save();

    res.json({
      success: true,
      user: {
        _id: req.user._id,
        email: req.user.email,
        role: req.user.role,
        year: req.user.year,
        department: req.user.department,
        anonymousUsername: req.user.anonymousUsername,
        qrCode: req.user.qrCode,
        isOnboarded: true
      }
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ message: 'Server error during onboarding' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/qr-code
// @desc    Get user's QR code
// @access  Private (Student only)
router.get('/qr-code', protect, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students have QR codes' });
    }

    const user = await User.findById(req.user._id).select('+qrCode +qrSecret');

    res.json({
      success: true,
      qrCode: user.qrCode,
      qrSecret: user.qrSecret,
      username: user.anonymousUsername
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
