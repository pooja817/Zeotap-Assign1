const OPERATORS = ["AND", "OR"]; // List of valid operators

/**
 * Auto-format the rule string by wrapping conditions in parentheses.
 * Example:
 * Input: "age > 30 AND department = 'Sales'"
 * Output: "((age > 30) AND (department = 'Sales'))"
 */
const autoFormatRuleString = (input) => {
  const tokens = input.split(" "); // Split by spaces
  let result = "";
  let tempCondition = "";

  tokens.forEach((token) => {
    if (OPERATORS.includes(token)) {
      // If an operator is encountered, wrap the previous condition
      result += `(${tempCondition.trim()}) ${token} `;
      tempCondition = ""; // Reset for the next condition
    } else {
      // Keep building the current condition
      tempCondition += ` ${token}`;
    }
  });

  // Wrap the last condition if any
  if (tempCondition) {
    result += `(${tempCondition.trim()})`;
  }

  return result;
};


module.exports = { autoFormatRuleString};
