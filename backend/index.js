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

app.get('/ContactMessages', async (req, res) => {
  try {
    const messages = await ContactModel.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contact messages' });
  }
});


//delete
app.delete('/ContactMessages/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid message ID' });
  }

  try {
    const deletedMessage = await ContactModel.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting message' });
  }
});


//view 
app.get('/ContactMessages/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid message ID' });
  }

  try {
    const message = await ContactModel.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching message' });
  }
});






// Start Server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
