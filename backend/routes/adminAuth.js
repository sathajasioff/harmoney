const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs for better compatibility
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const router = express.Router();
const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable

// Admin Sign-Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await Admin.findOne({ email });

    if (admin) return res.status(400).json({ error: 'Admin already exists' });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering admin' });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT Token (Valid for 1 Day)
    const token = jwt.sign({ id: admin._id, role: 'admin' }, secretKey, { expiresIn: '30m'});

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
