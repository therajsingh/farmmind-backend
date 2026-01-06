const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    soilMoisture: {
      type: Number,
      required: true,
    },
    soilPH: {
      type: Number,
      required: true,
    },
    nitrogen: {
      type: Number,
      required: true,
    },
    phosphorus: {
      type: Number,
      required: true,
    },
    potassium: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("SensorData", sensorDataSchema);
