const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Event name is required"],
    minlength: [3, "Event name must be at least 3 characters long"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
    validate: {
      validator: (v) => v > new Date(),
      message: "Event date must be in the future",
    },
  },
  image: {
    type: String,
    required: [true, "Event image is required"],
    validate: {
      validator: (v) =>
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v) || /^data:image\/(png|jpeg|jpg|gif|svg);base64,/.test(v),
      message: "Image must be a valid URL or Base64 encoded string",
    },
  },
  description: {
    type: String,
    required: [true, "Event description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
