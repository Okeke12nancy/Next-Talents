const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");

// Delete a candidate profile
router.delete("/candidates/:id/", profileController.deleteProfile);

// Get all candidates' profiles
router.get("/candidates/", profileController.getAllProfiles);

// Get a candidate's profile
router.get("/candidates/:id", profileController.getProfile);

// Update a candidate's profile
router.put("/candidates/:id", profileController.updateProfile);

// Create a new candidate's profile
router.post("/candidates/", profileController.createProfile);

module.exports = router;
