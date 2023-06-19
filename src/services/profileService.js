const Profile = require("../models/profile");

class ProfileService {
  static async getProfile(id) {
    try {
      const profile = await Profile.findById(id);
      return profile;
    } catch (error) {
      throw new Error("An error occurred while retrieving the profile");
    }
  }

  static async updateProfile(id, updateData) {
    try {
      const updatedProfile = await Profile.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      return updatedProfile;
    } catch (error) {
      throw new Error("An error occurred while updating the profile");
    }
  }

  static async deleteProfile(id) {
    try {
      await Profile.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("An error occurred while deleting the profile");
    }
  }

  static async getAllProfiles() {
    try {
      const profiles = await Profile.find();
      return profiles;
    } catch (error) {
      throw new Error("An error occurred while retrieving profiles");
    }
  }

  static async createProfile(profileData) {
    try {
      const newProfile = await Profile.create(profileData);
      return newProfile;
    } catch (error) {
      throw new Error("An error occurred while creating the profile");
    }
  }
}

module.exports = ProfileService;
