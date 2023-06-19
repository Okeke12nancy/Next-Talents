const CandidateService = require("../services/userService");
const { UserUtils } = require("../utils/index.utils"); // Import the UserUtils class
const User = require("../controllers/user");
const userUtils = new UserUtils();

class CandidateController {
  static async getAllCandidates(req, res) {
    try {
      const candidates = await CandidateService.getAllCandidates();
      res.status(200).json(candidates);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving candidates" });
    }
  }

  static async getCandidateById(req, res) {
    const { id } = req.params;
    try {
      const candidate = await CandidateService.getCandidateById(id);
      if (!candidate) {
        return res.status(404).json({ error: "Candidate not found" });
      }
      res.status(200).json(candidate);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the candidate" });
    }
  }

  static async searchUsers(req, res) {
    try {
      const filter = req.body; // or req.query, depending on your implementation

      const results = await userUtils.search(User, filter);

      return res.json(results);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while searching for users" });
    }
  }
}

module.exports = CandidateController;
