const express = require("express");
const router = express.Router();
const CandidateController = require("../controllers/user");
const { searchUsers } = require("../controllers/user");

// Public route for retrieving brief information about all candidates
router.get("/", CandidateController.getAllCandidates);

// Public route for retrieving detailed information about a specific candidate
router.get("/:id", CandidateController.getCandidateById);

router.post("/search", searchUsers);

module.exports = router;
