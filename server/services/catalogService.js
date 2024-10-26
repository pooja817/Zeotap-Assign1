const VALID_ATTRIBUTES = ["age", "salary", "department", "experience"]; // Catalog attributes

/**
 * Extracts and validates attributes from the tokenized rule string.
 * Throws an error if any attribute is invalid.
 */
function validateAttributes(tokens) {
  tokens.forEach((token) => {
    // Remove surrounding parentheses and trim the token
    const cleanedToken = token.replace(/[()]/g, "").trim();

    // Extract the attribute name (first part of the token)
    const [attribute] = cleanedToken.split(/\s+/);

    // Validate the attribute
    if (!VALID_ATTRIBUTES.includes(attribute)) {
      throw new Error(
        `Invalid attribute: ${attribute} is not part of the catalog.`
      );
    }
  });
}

module.exports = { validateAttributes };
