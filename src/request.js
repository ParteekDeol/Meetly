import {
  GoogleGenAI,
} from '@google/genai';

const API_KEY = "REDACTED";

async function GenerateLocations(responses) {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
  };
  const model = 'gemini-flash-lite-latest';
  const contents = [
    {
      role: 'model',
      parts: [
        {
          text: 'You are a professional travel advisor and trip planner. Based off of the user\'s responses, generate a list of one travel destinations. Ensure the places are diverse and interesting, and will be appealing to the user. Always respond with a JSON object: { "location": "location here" }.',
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: responses,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const locations = JSON.parse(response.text).location;
  return locations;
}


export default GenerateLocations;