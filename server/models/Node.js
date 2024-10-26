// models/Node.js
class Node {
  /**
   * @param {string} type - "operator" or "operand"
   * @param {string|null} value - The value for the node (e.g., "age > 30")
   * @param {Node|null} left - Left child node (for operators)
   * @param {Node|null} right - Right child node (for operators)
   */
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

module.exports = Node;
