const SensorData = require("../models/SensorData");

exports.receiveSensorData = async (req, res) => {
  try {
    const {
      deviceId,
      soilMoisture,
      soilPH,
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
    } = req.body;

    if (
      deviceId == null ||
      soilMoisture == null ||
      soilPH == null ||
      nitrogen == null ||
      phosphorus == null ||
      potassium == null ||
      temperature == null ||
      humidity == null
    ) {
      return res
        .status(400)
        .json({ message: "Missing one or more sensor fields" });
    }

    const newData = new SensorData({
      deviceId: "ESP32_FIELD_1",
      soilMoisture,
      soilPH,
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
    });

    const saved = await newData.save();

    res.status(201).json({ message: "Sensor data saved", saved });
  } catch (err) {
    console.error("ESP save error FULL:", err);
    res.status(500).json({
      message: "Failed to save sensor data",
      error: err.message,
    });
  }
};
