import React from "react";
import EvaluateForm from "../components/EvaluateForm";
import { Container, Typography } from "@mui/material";

function EvaluatePage() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Evaluate Rule
      </Typography>
      <EvaluateForm />
    </Container>
  );
}

export default EvaluatePage;
