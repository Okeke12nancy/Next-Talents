const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      responsibilities: {
        type: [String],
      },
    },
  ],
  skills: {
    type: [String],
  },
  certifications: [
    {
      title: {
        type: String,
        required: true,
      },
      organization: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
