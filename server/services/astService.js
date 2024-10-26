// services/astService.js
const Node = require("../models/Node");

// Helper to identify operators
const OPERATORS = ["AND", "OR", ">", "<", "=", "!="];
const VALID_ATTRIBUTES = ['age', 'salary', 'department', 'experience']; // Catalog attributes

function validateAttribute(token) {
  const [attribute] = token.split(/\s+/); // Extract attribute (first part of the token)
  if (!VALID_ATTRIBUTES.includes(attribute)) {
    throw new Error(
      `Invalid attribute: ${attribute} is not part of the catalog.`
    );
  }
}

function validateComparison(token) {
  const isValidComparison = /\w+\s*[><=!]+\s*['"\w\d\s]+/.test(token); // Check if token matches valid comparison pattern
  if (!isValidComparison) {
    throw new Error(`Invalid comparison: ${token}`);
  }
}


/**
 * Tokenizes the input rule string.
 */
function tokenize(str) {
  return str
    .replace(/\(/g, " ( ") // Add spaces around parentheses
    .replace(/\)/g, " ) ")
    .split(/\s+/) // Split by whitespace
    .filter(Boolean); // Remove empty tokens
}

/**
 * Recursively parse tokens into an AST.
 */
function parseExpression(tokens) {
  if (!tokens.length) {
    throw new Error("Invalid rule: Empty input");
  }

  const token = tokens.shift();

  if (token === "(") {
    const left = parseExpression(tokens); // Parse left side of the expression
    const operator = tokens.shift(); // Extract AND/OR operator

    if (!OPERATORS.includes(operator)) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    const right = parseExpression(tokens); // Parse right side of the expression

    if (tokens.shift() !== ")") {
      throw new Error("Mismatched parentheses");
    }

    return new Node("operator", operator, left, right);
  } else if (OPERATORS.includes(token)) {
    // Create a node for a simple operator (AND/OR)
    return new Node("operator", token);
  } else {
    // Validate attribute and comparison if it's an operand node
    validateAttribute(token); // Ensure attribute is part of the catalog
    validateComparison(token); // Ensure comparison is properly formatted

    return new Node("operand", token); // Create an operand node (e.g., "age > 30")
  }
}

/**
 * Creates an AST from the rule string.
 */
function createRule(ruleString) {
  const tokens = tokenize(ruleString); // Convert string to tokens
  return parseExpression(tokens); // Build AST from tokens
}

// Combine multiple ASTs using AND or OR
function combineRules(asts, operator = "AND") {
  if (asts.length === 0) {
    throw new Error("No rules to combine");
  }

  // Start with the first AST as the initial root
  let combinedRoot = asts[0];

  // Combine remaining ASTs one by one
  for (let i = 1; i < asts.length; i++) {
    combinedRoot = new Node("operator", operator, combinedRoot, asts[i]);
  }

  return combinedRoot;
}

// Evaluate an AST against user data
function evaluateRule(ast, data) {
  if (ast.type === "operand") {
    const [field, operator, value] = ast.value.split(" ");

    switch (operator) {
      case ">":
        return data[field] > parseInt(value);
      case "<":
        return data[field] < parseInt(value);
      case "=":
        return data[field] === value.replace(/['"]+/g, "");
      default:
        throw new Error(`Unknown operator ${operator}`);
    }
  }

  if (ast.type === "operator") {
    const leftResult = evaluateRule(ast.left, data);
    const rightResult = evaluateRule(ast.right, data);

    return ast.value === "AND"
      ? leftResult && rightResult
      : leftResult || rightResult;
  }

  throw new Error(`Unknown AST node type: ${ast.type}`);
}

// Helper to find the most frequent operator from an array of operators
function mostFrequentOperator(operators) {
  const frequencyMap = operators.reduce((acc, op) => {
    acc[op] = (acc[op] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(frequencyMap).reduce((a, b) =>
    frequencyMap[a] > frequencyMap[b] ? a : b
  );
}

// Helper to extract all operators from an AST
function extractOperatorsFromAST(ast) {
  if (!ast || ast.type === 'operand') return []; // No operators in operand nodes
  return [
    ast.value, // Current operator
    ...extractOperatorsFromAST(ast.left),
    ...extractOperatorsFromAST(ast.right),
  ];
}

// Recursively combine multiple ASTs into a single AST
function combineRulesAST(rules, operator) {
  if (rules.length === 1) return rules[0]; // Base case: only one rule

  const left = rules.shift(); // Get the first rule
  const right = combineRulesAST(rules, operator); // Combine the rest

  return new Node('operator', operator, left, right); // Create a new operator node
}


module.exports = {
  createRule,
  combineRules,
  evaluateRule,
  mostFrequentOperator,
  extractOperatorsFromAST,
  combineRulesAST,
};
