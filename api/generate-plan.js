import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "Gemini API key missing" });
        }

        const ai = new GoogleGenAI({ apiKey });
        const config = { thinkingConfig: { thinkingBudget: 0 } };
        const model = "gemini-flash-lite-latest";

        const location = JSON.parse(req.body).location;

        const contents = [
            {
            role: "model",
            parts: [
            {
                text:
                "You are a professional travel advisor and trip planner. " +
                "Based off of the passed location, generate a list of places the user can visit and tips for visiting the location. " +
                "Ensure the places are diverse and interesting, and include information about how many people usually visit that location. " +
                "Make the tips actionable and practical, but make them really concise (<10 words). " +
                "Respond with a JSON object in one line: " +
                '{ "itinerary": [ {"location": "[...]", "address": "[...]", "description: "[...]", "average_people": "[...]"} ], "tips": [ "[...]", "[...]"] }',
            },
            ],
        },
        {
            role: "user",
            parts: [{ text: location }],
        },
        ];

        const response = await ai.models.generateContent({ model, config, contents });
        const raw = response.text;

        const formattedResponse = raw.replace(/```json|```/gi, "").trim();

        const plan = JSON.parse(formattedResponse);
        return res.status(200).json(plan);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}