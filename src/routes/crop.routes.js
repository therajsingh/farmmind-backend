const express = require("express");
const router = express.Router();

const { analyzeCropSuitability } = require("../controllers/crop.controller");

// POST /api/crop-analysis
router.post("/", analyzeCropSuitability);

module.exports = router;
