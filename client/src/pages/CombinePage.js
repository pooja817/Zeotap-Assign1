import React from "react";
import CombineForm from "../components/CombineForm";
import { Container, Typography } from "@mui/material";

function CombinePage() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Combine Rules
      </Typography>
      <CombineForm />
    </Container>
  );
}

export default CombinePage;
