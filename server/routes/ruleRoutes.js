const express = require("express");
const {
  createRuleController,
  getAllRules,
  combineRulesController,
  evaluateRuleController,
  modifyRuleController,
} = require("../controllers/ruleController");


const router = express.Router();

router.post("/create", createRuleController); // Create a new rule
router.get("/all", getAllRules); // Fetch all rule names
router.post("/combine", combineRulesController); // Combine multiple rules
router.post("/evaluate/:id", evaluateRuleController); // Evaluate a rule
router.put('/modify', modifyRuleController); // Modify existing rules

module.exports = router;
