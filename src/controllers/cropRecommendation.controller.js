const SensorData = require("../models/SensorData");
const recommendCropsWithAI = require("../services/aiCropRecommendation.service");

const getCropRecommendations = async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({
        message: "No sensor data available",
      });
    }

    const recommendations = await recommendCropsWithAI(latestData);

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: "Crop recommendation failed",
      error: error.message,
    });
  }
};

module.exports = {
  getCropRecommendations,
};
