const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS middleware
const ruleRoutes = require("./routes/ruleRoutes");

dotenv.config();

const app = express();

// Enable CORS for all requests
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json()); // Parse JSON bodies
app.use("/api/rules", ruleRoutes); // Use routes

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
