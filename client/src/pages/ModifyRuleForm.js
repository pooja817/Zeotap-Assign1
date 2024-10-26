import React, { useState, useEffect } from "react";
import { getAllRules, modifyRule } from "../api"; // API functions to get and modify rules
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

function ModifyRuleForm() {
  const [rules, setRules] = useState([]);
  const [selectedRuleId, setSelectedRuleId] = useState("");
  const [updates, setUpdates] = useState({ operator: "", left: "", right: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Fetch all rules on component load
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await getAllRules(); // Fetch rules from the backend
        setRules(response.data);
      } catch {
        setError("Failed to fetch rules.");
      }
    };
    fetchRules();
  }, []);

  // Handle form submission
  const handleModifyRule = async () => {
    try {
      const response = await modifyRule(selectedRuleId, updates); // Call modify API
      setMessage(response.data.message);
      setError(null); // Clear previous errors
    } catch (err) {
      setError("Error modifying rule.");
    }
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Rule</InputLabel>
        <Select
          value={selectedRuleId}
          onChange={(e) => setSelectedRuleId(e.target.value)}
        >
          {rules.map((rule) => (
            <MenuItem key={rule._id} value={rule._id}>
              {rule.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Operator"
          value={updates.operator}
          onChange={(e) => setUpdates({ ...updates, operator: e.target.value })}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Left Operand"
          value={updates.left}
          onChange={(e) => setUpdates({ ...updates, left: e.target.value })}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Right Operand"
          value={updates.right}
          onChange={(e) => setUpdates({ ...updates, right: e.target.value })}
        />
      </FormControl>

      <Button variant="contained" onClick={handleModifyRule}>
        Modify Rule
      </Button>

      {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default ModifyRuleForm;
