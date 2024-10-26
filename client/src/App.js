import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import CreateRulePage from "./pages/CreateRulePage";
import CombinePage from "./pages/CombinePage";
import EvaluatePage from "./pages/EvaluatePage";
import ModifyRuleForm from "./pages/ModifyRuleForm";
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Navbar />
      <Box sx={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/create" />} />
          <Route path="/create" element={<CreateRulePage />} />
          <Route path="/modify" element={<ModifyRuleForm />} />
          <Route path="/combine" element={<CombinePage />} />
          <Route path="/evaluate" element={<EvaluatePage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
