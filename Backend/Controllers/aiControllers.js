import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const getAnimalDetailsAndQuiz = async (req, res) => {
  const { animal } = req.body;

  if (!animal) {
    return res.status(400).json({ error: "Animal name is required" });
  }

  try {
    const prompt = `
      You are an expert wildlife educator AI.

      IMPORTANT:
      ➤ Return ONLY pure JSON.
      ➤ Do NOT use Markdown.
      ➤ Do NOT wrap output in backticks.
      ➤ Do NOT add any explanation.

      Follow this exact JSON structure:

      {
        "info": {
          "name": "",
          "scientificName": "",
          "about": "",
          "diet": "",
          "habitat": "",
          "lifespan": "",
          "conservation": "",
          "funFact": ""
        },
        "quiz": [
          {
            "question": "",
            "options": ["", "", "", ""],
            "answer": ""
          }
        ]
      }

      Requirements:
      - Provide 5 total quiz questions.
      - All facts must be correct.
      - Output must be valid JSON.
      
      Animal: "${animal}"
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // 🔥 CLEAN THE OUTPUT (Remove ```json and ``` )
    let cleanText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let jsonData;

    try {
      jsonData = JSON.parse(cleanText);
    } catch (parseError) {
      return res.status(500).json({
        error: "Invalid JSON returned from AI",
        raw: cleanText,
        details: parseError.message,
      });
    }

    return res.status(200).json(jsonData);

  } catch (error) {
    return res.status(500).json({
      error: "AI processing failed",
      details: error.message,
    });
  }
};
