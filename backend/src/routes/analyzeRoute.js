const express = require("express");
const router = express.Router();
const { analyzeController } = require("../controllers/analyzeController");

// POST /api/analyze
router.post("/", analyzeController);

module.exports = router;
