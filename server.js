require("dotenv").config();
const cors = require("cors");

const express = require("express");
const connectDB = require("./src/config/db");

const cropRoutes = require("./src/routes/crop.routes");
const sensorRoutes = require("./src/routes/sensor.routes");
const cropRecommendationRoutes = require("./src/routes/cropRecommendation.routes");
const sensorDataRoutes = require("./src/routes/sensorData.routes");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

// connect database
connectDB();
console.log("OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);

// routes
app.use("/api/sensor-data", sensorRoutes);
app.use("/api/crop-analysis", cropRoutes);
app.use("/api/crop-recommendation", cropRecommendationRoutes);
app.use("/api/sensor", sensorDataRoutes);

app.get("/", (req, res) => {
  res.send("FarmMind Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
