const SensorData = require("../models/SensorData");
const analyzeCropSuitabilityWithAI = require("../services/aiCropAnalysis.service");
const CropAnalysis = require("../models/CropAnalysis");

const analyzeCropSuitability = async (req, res) => {
  try {
    let { crop } = req.body;

    if (!crop || typeof crop !== "string") {
      return res.status(400).json({
        message: "Valid crop name is required",
      });
    }

    // normalize crop name
    crop = crop.trim().toLowerCase();

    const latestData = await SensorData.findOne().sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({
        message: "No sensor data available",
      });
    }

    const analysis = await analyzeCropSuitabilityWithAI(latestData, crop);

    const savedAnalysis = await CropAnalysis.create({
      crop,
      suitability: analysis.suitability,
      issues: analysis.issues,
      actions: analysis.actions,
      sensorSnapshot: latestData,
    });

    res.status(200).json(savedAnalysis);
  } catch (error) {
    res.status(500).json({
      message: "Crop analysis failed",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeCropSuitability,
};
