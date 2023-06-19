const Candidate = require("../models/user");
const { UserUtils } = require("../utils/index.utils"); // Import the UserUtils class

const userUtils = new UserUtils();

class CandidateService {
  static async getAllCandidates() {
    try {
      const candidates = await Candidate.find({});
      return candidates;
    } catch (error) {
      throw new Error("An error occurred while retrieving candidates");
    }
  }

  static async getCandidateById(id) {
    try {
      const candidate = await Candidate.findOne({ _id: id });
      return candidate;
    } catch (error) {
      throw new Error("An error occurred while retrieving the candidate");
    }
  }

  static async searchUsers(filter) {
    try {
      const results = await userUtils.search(User, filter);
      return results;
    } catch (error) {
      throw new Error("An error occurred while searching for users");
    }
  }
}

module.exports = CandidateService;
