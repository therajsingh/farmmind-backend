const express = require("express");
const router = express.Router();

const {
  receiveSensorData,
} = require("../controllers/sensorData.controller");

// POST sensor data from ESP
router.post("/esp", receiveSensorData);

module.exports = router;
