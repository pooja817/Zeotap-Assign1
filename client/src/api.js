import axios from "axios";

const BASE_URL = "http://localhost:5001/api/rules";

// API to create a new rule
export const createRule = (name, ruleString) =>
  axios.post(`${BASE_URL}/create`, { name, ruleString });

// API to get all rule names
export const getAllRules = () => axios.get(`${BASE_URL}/all`);

// API to combine multiple rules
export const combineRules = (ruleIds, operator) =>
  axios.post(`${BASE_URL}/combine`, { ruleIds, operator });

// API to evaluate a rule against input data
export const evaluateRule = (ruleId, data) =>
  axios.post(`${BASE_URL}/evaluate/${ruleId}`, { data });

// Modify a rule by ID
export const modifyRule = async (ruleId, updates) => {
  return await axios.put(`${BASE_URL}/modify`, { ruleId, updates });
};