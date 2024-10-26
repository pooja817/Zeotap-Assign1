import React from "react";
import RuleForm from "../components/RuleForm";
import { Container, Typography } from "@mui/material";

function CreateRulePage() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Rule
      </Typography>
      <RuleForm />
    </Container>
  );
}

export default CreateRulePage;
