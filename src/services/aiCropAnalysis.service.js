const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeCropSuitabilityWithAI = async (sensorData, crop) => {
  const prompt = `
You are an agricultural decision-support expert.

A farmer wants to grow the crop: "${crop}".

Using general agronomic standards for this crop:
- Evaluate whether the current soil and environmental conditions are suitable.
- Compare each relevant parameter numerically.
- Mention recommended thresholds explicitly.
- Issues MUST be numeric.
- Actions MUST include approximate quantities with units (kg/ha, %, range).

Return ONLY valid JSON in this format:

{
  "crop": "${crop}",
  "suitability": "Suitable | Partially Suitable | Not Suitable",
  "issues": [
    "Issue 1 with numeric comparison",
    "Issue 2 with numeric comparison"
  ],
  "actions": [
    "Action 1 with numeric quantity and unit",
    "Action 2 with numeric quantity and unit"
  ]
}

Soil Data:
- Soil pH: ${sensorData.soilPH}
- Soil Moisture (%): ${sensorData.soilMoisture}
- Nitrogen (mg/kg): ${sensorData.nitrogen}
- Phosphorus (mg/kg): ${sensorData.phosphorus}
- Potassium (mg/kg): ${sensorData.potassium}
- Temperature (°C): ${sensorData.temperature}
- Humidity (%): ${sensorData.humidity}

Rules:
- If all parameters meet crop requirements, suitability = "Suitable"
- If some parameters are slightly off, suitability = "Partially Suitable"
- If critical parameters are far off, suitability = "Not Suitable"
- Do not assume values are optimal by default
- No markdown
- No explanations outside JSON
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
  });

  return JSON.parse(response.choices[0].message.content);
};

module.exports = analyzeCropSuitabilityWithAI;
