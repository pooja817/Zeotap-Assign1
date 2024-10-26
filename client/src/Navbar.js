import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Rule Engine UI
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/create">
            Create Rule
          </Button>
          <Button color="inherit" component={Link} to="/modify">
            Modify Rule
          </Button>
          <Button color="inherit" component={Link} to="/combine">
            Combine Rules
          </Button>
          <Button color="inherit" component={Link} to="/evaluate">
            Evaluate Rule
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
