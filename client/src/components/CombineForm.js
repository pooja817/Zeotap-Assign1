import React, { useState, useEffect } from "react";
import { getAllRules, combineRules } from "../api";
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
  Typography,
  Alert,
} from "@mui/material";

function CombineForm() {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [operator, setOperator] = useState("");
  const [combinedAST, setCombinedAST] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleCombineRules = async () => {
    if (selectedRules.length < 2) {
      setError("Select at least two rules.");
      return;
    }
    try {
      const ruleIds = selectedRules.map((rule) => rule._id);
      const response = await combineRules(ruleIds, operator);
      setCombinedAST(response.data.combinedAST);
      setError(null);
    } catch {
      setError("Error combining rules.");
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Combine Rules
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Select Rules</InputLabel>
              <Select
                multiple
                value={selectedRules}
                onChange={(e) => setSelectedRules(e.target.value)}
              >
                {rules.map((rule) => (
                  <MenuItem key={rule._id} value={rule}>
                    {rule.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Operator (Optional)</InputLabel>
              <Select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
              >
                <MenuItem value="AND">AND</MenuItem>
                <MenuItem value="OR">OR</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCombineRules}
              sx={{ marginBottom: 2 }}
            >
              Combine Rules
            </Button>

            {combinedAST && (
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(combinedAST, null, 2)}
              </Typography>
            )}

            {error && <Alert severity="error">{error}</Alert>}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default CombineForm;
