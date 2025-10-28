const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyzeRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/analyze", analyzeRoute);

// Test endpoint
app.get("/ping", (req, res) => res.send("Backend is working!"));

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is on port ${PORT}`));
