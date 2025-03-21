const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ContactModel = require('./models/contact');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect('mongodb+srv://lalu:lalu1999@cluster0.n4q8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Contact Form Route
app.post('/Contact', async (req, res) => {
  try {
    const contact = await ContactModel.create(req.body);
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Error creating contact' });
  }
});

// Start Server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
