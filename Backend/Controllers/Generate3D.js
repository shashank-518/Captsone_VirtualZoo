import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generate3DHologram = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const aiPrompt = `
      You are a 3D model generator AI.  
      Generate a futuristic hologram-style 3D object.

      Output format: JSON ONLY (no markdown)

      {
        "type": "3d-hologram",
        "description": "",
        "depthMap": "",
        "pointCloud": [],
        "colors": []
      }

      Rules:
      - depthMap MUST be a base64 PNG string
      - pointCloud MUST be an array of [x,y,z]
      - colors MUST match number of pointCloud points
      - No explanations or markdown
      - Output ONLY valid JSON

      Create a hologram for: "${prompt}"
    `;

    const result = await model.generateContent(aiPrompt);
    let responseText = result.response.text().trim();

    // Clean extra formatting
    responseText = responseText.replace(/```json/g, "").replace(/```/g, "");

    let jsonData;

    try {
      jsonData = JSON.parse(responseText);
    } catch (parseError) {
      return res.status(500).json({
        error: "Invalid JSON returned from AI",
        raw: responseText,
        details: parseError.message,
      });
    }

    return res.json(jsonData);

  } catch (error) {
    return res.status(500).json({
      error: "AI processing failed",
      details: error.message,
    });
  }
};
