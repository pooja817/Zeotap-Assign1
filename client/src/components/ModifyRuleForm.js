import React, { useState, useEffect } from "react";
import { getAllRules, modifyRule } from "../api";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import RuleDropdown from "./RuleDropdown"; // Reuse dropdown component

const VALID_OPERATORS = ["AND", "OR"]; // Define valid operators

function ModifyRuleForm() {
  const [rules, setRules] = useState([]);
  const [selectedRuleId, setSelectedRuleId] = useState("");
  const [updates, setUpdates] = useState({ operator: "", left: "", right: "" });
  const [modifiedRule, setModifiedRule] = useState(null); // Store modified rule
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all rules on component load
  useEffect(() => {
    const fetchRules = async () => {
      try {
        setLoading(true);
        const response = await getAllRules();
        setRules(response.data);
      } catch {
        setError("Failed to fetch rules.");
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  // Handle form submission with validation
  const handleModifyRule = async () => {
    if (
      !selectedRuleId ||
      !updates.operator ||
      !updates.left ||
      !updates.right
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await modifyRule(selectedRuleId, updates);
      setMessage(response.data.message);
      setModifiedRule(response.data.rule); // Store modified rule
      setError(null); // Clear previous errors
    } catch (err) {
      setError("Error modifying rule.");
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Modify Rule
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <RuleDropdown
              rules={rules}
              selectedRuleId={selectedRuleId}
              handleSelect={setSelectedRuleId}
            />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Operator</InputLabel>
              <Select
                value={updates.operator}
                onChange={(e) =>
                  setUpdates({ ...updates, operator: e.target.value })
                }
              >
                {VALID_OPERATORS.map((op) => (
                  <MenuItem key={op} value={op}>
                    {op}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                label="Left Operand"
                value={updates.left}
                onChange={(e) =>
                  setUpdates({ ...updates, left: e.target.value })
                }
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                label="Right Operand"
                value={updates.right}
                onChange={(e) =>
                  setUpdates({ ...updates, right: e.target.value })
                }
                required
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleModifyRule}
              sx={{ marginBottom: 2 }}
            >
              Modify Rule
            </Button>

            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            {modifiedRule && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Modified Rule:</Typography>
                <pre>{JSON.stringify(modifiedRule, null, 2)}</pre>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ModifyRuleForm;
