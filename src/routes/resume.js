const express = require("express");
const router = express.Router();
const ResumeController = require("../controllers/resume");

router.get("/", ResumeController.getAllResumes);
router.get("/:id", ResumeController.getResumeById);
router.post("/", ResumeController.createResume);
router.put("/:id", ResumeController.updateResume);
router.delete("/:id", ResumeController.deleteResume);

module.exports = router;
