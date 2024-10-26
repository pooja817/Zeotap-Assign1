import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

function RuleDropdown({ rules, selectedRuleId, handleSelect }) {
  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }} variant="outlined">
      <InputLabel>Select Rule</InputLabel>
      <Select
        value={selectedRuleId}
        onChange={(e) => handleSelect(e.target.value)}
        displayEmpty
        sx={{ borderRadius: "4px" }} // Ensure rounded edges
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 300, // Limit dropdown height
            },
          },
        }}
      >
        {rules.map((rule) => (
          <MenuItem key={rule._id} value={rule._id}>
            {rule.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default RuleDropdown;
