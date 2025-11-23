import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "GeminiAPI key missing" });
        }

        const ai = new GoogleGenAI({ apiKey });
        const config = { thinkingConfig: { thinkingBudget: 0 } };
        const model = "gemini-flash-lite-latest";

        const request = JSON.parse(req.body).answers;
        const formatted = request
            .map(r => `${r.question}: ${r.answer}`)
            .join("; ");
        
        const contents = [
        {
            role: "model",
            parts: [
                {
                    text:
                    "You are a professional travel advisor and trip planner. " +
                    "Based off of the user's responses, generate a list of one travel destination. " +
                    "Ensure the places are diverse and interesting, and will be appealing to the user." +
                    'Response must be a JSON object: { "location": "..." }. ',
                },
            ],
        },
        {
            role: "user",
            parts: [{ text: formatted }],
        },
        ];

        const response = await ai.models.generateContent({ model, config, contents });
        const raw = response.text;

        const formattedResponse = raw.replace(/```json|```/gi, "").trim();

        const location = JSON.parse(formattedResponse) ?? {location: "Kyoto, Japan"};
        return res.status(200).json(location);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}