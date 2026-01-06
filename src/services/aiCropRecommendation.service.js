const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const recommendCropsWithAI = async (sensorData) => {
  const prompt = `
You are an agricultural expert.

Based on the following soil and environmental data,
recommend the TOP 3 most suitable crops.

Requirements:
- Rank crops by suitability
- Brief numeric reasoning
- Use general agronomic standards
- Do NOT assume ideal conditions
- No hardcoding crop lists
- JSON output only

Return JSON in this format:

{
  "recommendedCrops": [
    {
      "crop": "crop name",
      "suitability": "High | Medium | Low",
      "reason": "short numeric reasoning"
    }
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
- Recommend crops commonly grown in India
- Consider nutrient availability and climate
- JSON only, no markdown
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return JSON.parse(response.choices[0].message.content);
};

module.exports = recommendCropsWithAI;
