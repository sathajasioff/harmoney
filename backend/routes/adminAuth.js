const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const router = express.Router();

// Admin Sign-Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await Admin.findOne({ email });

    if (admin) return res.status(400).json({ error: 'Admin already exists' });

    admin = new Admin({ email, password });
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

    const token = jwt.sign({ id: admin._id, role: 'admin' }, 'secretKey', { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
