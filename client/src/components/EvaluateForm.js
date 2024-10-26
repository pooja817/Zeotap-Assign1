import React, { useEffect, useState } from "react";
import { getAllRules, evaluateRule } from "../api";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function EvaluateForm() {
  const [rules, setRules] = useState([]);
  const [selectedRuleId, setSelectedRuleId] = useState("");
  const [data, setData] = useState("{}");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await getAllRules();
        setRules(response.data);
        setError(null);
      } catch {
        setError("Failed to fetch rules. Please try again.");
      }
    };

    fetchRules();
  }, []);

  const handleEvaluateRule = async () => {
    try {
      const response = await evaluateRule(selectedRuleId, JSON.parse(data));
      setResult(response.data.eligible ? "Eligible" : "Not Eligible");
    } catch {
      setError("Error evaluating rule. Please check your input.");
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Evaluate Rule
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Rule</InputLabel>
        <Select
          value={selectedRuleId}
          onChange={(e) => setSelectedRuleId(e.target.value)}
        >
          <MenuItem value="">Select a Rule</MenuItem>
          {rules.map((rule) => (
            <MenuItem key={rule._id} value={rule._id}>
              {rule.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="User Data (JSON)"
        multiline
        rows={4}
        value={data}
        onChange={(e) => setData(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Button variant="contained" onClick={handleEvaluateRule}>
        Evaluate
      </Button>

      {result && (
        <Typography sx={{ marginTop: 2 }}>Result: {result}</Typography>
      )}
    </Box>
  );
}

export default EvaluateForm;
