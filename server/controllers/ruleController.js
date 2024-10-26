// controllers/ruleController.js
const Rule = require("../models/ruleModel");
const {
  createRule,
  mostFrequentOperator,
  extractOperatorsFromAST,
  combineRulesAST,
  evaluateRule,
} = require("../services/astService");
const { validateAttributes } = require('../services/catalogService'); // Import attribute validator


// Combine multiple rules with a heuristic to determine the operator
async function combineRulesController(req, res) {
  try {
    const { ruleIds, operator } = req.body;

    // Fetch the rules from the database
    const rules = await Rule.find({ _id: { $in: ruleIds } });

    if (rules.length < 2) {
      return res
        .status(400)
        .json({ error: "At least two rules are required for combining." });
    }

    // Extract operators from all rules' ASTs
    const operators = rules.flatMap((rule) =>
      extractOperatorsFromAST(rule.ruleAST)
    );

    // Use the provided operator or the most frequent one
    const chosenOperator = operator || mostFrequentOperator(operators);

    // Combine the rules into a single AST
    const combinedAST = combineRulesAST(
      rules.map((rule) => rule.ruleAST),
      chosenOperator
    );

    res.status(200).json({ combinedAST });
  } catch (error) {
    console.error("Error combining rules:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Evaluate a rule against user input data
async function evaluateRuleController(req, res) {
  try {
    const rule = await Rule.findById(req.params.id);
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    const result = evaluateRule(rule.ruleAST, req.body.data);
    res.json({ eligible: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new rule with unique name validation
// Create a new rule with unique name validation
async function createRuleController(req, res) {
  try {
    const { name, ruleString } = req.body;

    // Validate inputs
    if (!name || !ruleString) {
      console.error("Missing name or ruleString in request.");
      return res
        .status(400)
        .json({ error: "Name and rule string are required." });
    }

    // Check if the rule name already exists
    const existingRule = await Rule.findOne({ name });
    if (existingRule) {
      console.error(`Rule name already exists: ${name}`);
      return res.status(400).json({ error: "Rule name already exists." });
    }

    // Tokenize the rule string
    const tokens = ruleString.split(/\s+/); // Split the rule string by spaces

    // Validate attributes using the catalog service
    try {
      validateAttributes(tokens); // Throws an error if an invalid attribute is found
    } catch (validationError) {
      console.error("Validation error:", validationError.message);
      return res.status(400).json({ error: validationError.message });
    }

    // Create the AST and save the rule
    const ruleAST = createRule(ruleString); // Converts rule string to AST
    const newRule = new Rule({ name, ruleAST });

    await newRule.save();
    res.status(201).json(newRule); // Send success response
  } catch (error) {
    console.error("Error in createRuleController:", error); // Log the full error
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
}

async function modifyRuleController(req, res) {
  try {
    const { ruleId, updates } = req.body;

    // Find the rule by its ID
    const rule = await Rule.findById(ruleId);
    if (!rule) return res.status(404).json({ error: "Rule not found" });

    // Apply updates to the AST
    const { operator, left, right } = updates;
    if (operator) rule.ruleAST.value = operator;
    if (left) rule.ruleAST.left.value = left;
    if (right) rule.ruleAST.right.value = right;

    // Save the updated rule
    await rule.save();
    res.status(200).json({ message: "Rule modified successfully", rule });
  } catch (error) {
    console.error("Error modifying rule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Fetch all rules with their names and IDs
async function getAllRules(req, res) {
  try {
    const rules = await Rule.find({}, { name: 1 }); // Fetch only name and ID
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createRuleController,
  combineRulesController,
  evaluateRuleController,
  getAllRules,
  modifyRuleController,
};
