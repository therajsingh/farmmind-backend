const SensorData = require("../models/SensorData");
const analyzeSoilWithAI = require("../services/aiSoilAnalysis.service");


// POST: receive sensor data
const addSensorData = async (req, res) => {
  try {
    const data = req.body;

    const savedData = await SensorData.create(data);

    res.status(201).json({
      message: "Sensor data saved successfully",
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save sensor data",
      error: error.message,
    });
  }
};

// GET: latest sensor data
const getLatestSensorData = async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ createdAt: -1 });

    res.status(200).json(latestData);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch latest sensor data",
      error: error.message,
    });
  }
};

// GET: sensor data history
const getSensorDataHistory = async (req, res) => {
  try {
    const history = await SensorData.find().sort({ createdAt: -1 }).limit(50);

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sensor data history",
      error: error.message,
    });
  }
};

// GET: soil health analysis
const getSoilHealthAnalysis = async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({ message: "No sensor data available" });
    }

    const analysis = await analyzeSoilWithAI(latestData);

    res.status(200).json({
      latestData,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      message: "AI soil analysis failed",
      error: error.message,
    });
  }
};

module.exports = {
  addSensorData,
  getLatestSensorData,
  getSensorDataHistory,
  getSoilHealthAnalysis,
};

