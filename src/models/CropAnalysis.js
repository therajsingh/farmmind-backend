const mongoose = require("mongoose");

const cropAnalysisSchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: true,
    },
    suitability: {
      type: String,
      required: true,
    },
    issues: {
      type: [String],
      default: [],
    },
    actions: {
      type: [String],
      default: [],
    },
    sensorSnapshot: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CropAnalysis", cropAnalysisSchema);
