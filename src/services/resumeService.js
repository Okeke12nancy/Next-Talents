const Resume = require("../models/resume");

class ResumeService {
  static async getAllResumes() {
    try {
      const resumes = await Resume.find();
      return resumes;
    } catch (error) {
      throw new Error("An error occurred while retrieving resumes");
    }
  }

  static async getResumeById(id) {
    try {
      const resume = await Resume.findById(id);
      if (!resume) {
        throw new Error("Resume not found");
      }
      return resume;
    } catch (error) {
      throw new Error("An error occurred while retrieving the resume");
    }
  }

  static async createResume(data) {
    try {
      const newResume = new Resume(data);
      const savedResume = await newResume.save();
      return savedResume;
    } catch (error) {
      throw new Error("An error occurred while creating the resume");
    }
  }

  static async updateResume(id, data) {
    try {
      const updatedResume = await Resume.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedResume) {
        throw new Error("Resume not found");
      }
      return updatedResume;
    } catch (error) {
      throw new Error("An error occurred while updating the resume");
    }
  }

  static async deleteResume(id) {
    try {
      const deletedResume = await Resume.findByIdAndDelete(id);
      if (!deletedResume) {
        throw new Error("Resume not found");
      }
    } catch (error) {
      throw new Error("An error occurred while deleting the resume");
    }
  }
}

module.exports = ResumeService;
