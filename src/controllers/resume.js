const Resume = require("../models/resume");

class ResumeController {
  static async getAllResumes(req, res) {
    try {
      const resumes = await Resume.find();
      res.status(200).json(resumes);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving resumes" });
    }
  }

  static async getResumeById(req, res) {
    const { id } = req.params;
    try {
      const resume = await Resume.findById(id);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.status(200).json(resume);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the resume" });
    }
  }

  static async createResume(req, res) {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      summary,
      education,
      experience,
      skills,
      certifications,
    } = req.body;
    try {
      const newResume = new Resume({ ...req.body });
      const savedResume = await newResume.save();
      res.status(201).json(savedResume);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the resume" });
    }
  }

  static async updateResume(req, res) {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      summary,
      education,
      experience,
      skills,
      certifications,
    } = req.body;
    try {
      const updatedResume = await Resume.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          phone,
          address,
          summary,
          education,
          experience,
          skills,
          certifications,
        },
        { new: true }
      );
      if (!updatedResume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.status(200).json(updatedResume);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the resume" });
    }
  }

  static async deleteResume(req, res) {
    const { id } = req.params;
    try {
      const deletedResume = await Resume.findByIdAndDelete(id);
      if (!deletedResume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the resume" });
    }
  }
}

module.exports = ResumeController;
