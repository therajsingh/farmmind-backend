const express = require("express");
const router = express.Router();

const {
  addSensorData,
  getLatestSensorData,
  getSensorDataHistory,
  getSoilHealthAnalysis,
} = require("../controllers/sensor.controller");

// POST sensor data
router.post("/", addSensorData);

// GET latest data
router.get("/latest", getLatestSensorData);

// GET history
router.get("/history", getSensorDataHistory);

// GET soil health analysis
router.get("/analysis", getSoilHealthAnalysis);

module.exports = router;
