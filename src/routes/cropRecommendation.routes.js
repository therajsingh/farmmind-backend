const express = require("express");
const router = express.Router();

const {
  getCropRecommendations,
} = require("../controllers/cropRecommendation.controller");

router.get("/", getCropRecommendations);

module.exports = router;
