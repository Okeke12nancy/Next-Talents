const ProfileService = require("../services/profileService");
const advancedResults = require("../middlewares/advancedResults");

class UserController {
  static async getProfile(req, res, next) {
    const { id } = req.params;

    try {
      const profile = await ProfileService.getProfile(id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.status(200).json(profile);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the profile" });
    }
  }

  static async updateProfile(req, res, next) {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedProfile = await ProfileService.updateProfile(id, updateData);
      if (!updatedProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.status(200).json(updatedProfile);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the profile" });
    }
  }

  static async createProfile(req, res, next) {
    const profileData = req.body;

    try {
      const newProfile = await ProfileService.createProfile(profileData);
      res.status(201).json(newProfile);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the profile" });
    }
  }

  static async deleteProfile(req, res, next) {
    const { id } = req.params;

    try {
      await ProfileService.deleteProfile(id);
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the profile" });
    }
  }

  static async getAllProfiles(req, res, next) {
    try {
      const profiles = await ProfileService.getAllProfiles();
      res.status(200).json(profiles);
      // res.status(200).json(res.advancedResults);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving profiles" });
    }
  }
}

module.exports = UserController;
