const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeSoilWithAI = async (sensorData) => {
  const prompt = `
You are an agricultural soil expert.

Analyze the soil data using general agronomic standards
commonly used for field crops (not crop-specific).

IMPORTANT RULES:
- Always mention numeric thresholds.
- Always compare actual value vs recommended value.
- Issues MUST be quantitative.
- Actions MUST include approximate quantities with units.
- If values are within acceptable range, say so explicitly.

Return ONLY valid JSON in this format:

{
  "healthStatus": "Healthy | Moderate | Poor",
  "issues": [
    "Nitrogen level is X mg/kg, recommended minimum is Y mg/kg",
    "Soil moisture is X%, recommended range is A–B%"
  ],
  "actions": [
    "Apply approximately X kg/ha nitrogen fertilizer",
    "Increase irrigation to raise moisture to A–B%"
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

General Reference Ranges (use these explicitly in reasoning):
- Ideal Nitrogen: ≥ 50 mg/kg
- Ideal Phosphorus: ≥ 40 mg/kg
- Ideal Potassium: ≥ 40 mg/kg
- Ideal Soil Moisture: 50–70%
- Ideal pH: 6.0–7.5

Fertilizer Guidance (approximate, not crop-specific):
- Nitrogen deficiency: 40–60 kg/ha urea equivalent
- Phosphorus deficiency: 30–50 kg/ha DAP or SSP
- Potassium deficiency: 20–40 kg/ha MOP

No markdown.
No explanations outside JSON.
`;


  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
  });

  return JSON.parse(response.choices[0].message.content);
};

module.exports = analyzeSoilWithAI;
