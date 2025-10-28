const express = require("express");
const router = express.Router();
const { analyzeController } = require("../controllers/analyzeController");

router.post("/", analyzeController);

module.exports = router;
