import React, { useState } from "react";
import { createRule } from "../api";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { autoFormatRuleString } from "../services/formatService"; // Import new helper

function RuleForm() {
  const [name, setName] = useState("");
  const [ruleString, setRuleString] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleCreateRule = async () => {
    try {
      const formattedRuleString = autoFormatRuleString(ruleString); // Auto-format input
      const response = await createRule(name, formattedRuleString);
      setMessage(`Rule created with ID: ${response.data._id}`);
      setError(null); // Clear previous errors

      // Clear form fields after successful creation
      setName("");
      setRuleString("");
    } catch (err) {
      setError(err.response?.data?.error || "Error creating rule");
    }
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Rule Name"
          placeholder="e.g., AgeRule1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Rule String"
          multiline
          rows={4}
          placeholder={`Enter rule in format: (age > 30 AND department = 'Sales')`}
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
        />
      </FormControl>

      <Button variant="contained" onClick={handleCreateRule}>
        Create Rule
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

export default RuleForm;
