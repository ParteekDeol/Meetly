import {
  GoogleGenAI,
} from '@google/genai';

const API_KEY = "NA";

async function GenerateInfo(location) {
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
          text: 'You are a professional travel advisor and trip planner. Based off of the passed location, generate a list of places the user can visit and tips for visiting the location. Ensure the places are diverse and interesting, and include information about how many people usually visit that location. Make the tips actionable and practical. Always respond with a JSON object: { "itinerary": [{"location": "location here", "address": "address here", "description: "description here", "average_people": "average people here"}], "tips": ["tip 1", "tip 2"] }.',
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: location,
        },
      ],
    },
  ];

  // const response = await ai.models.generateContent({
  //   model,
  //   config,
  //   contents,
  // });

  const info = JSON.parse(response.text);
  return info;
}

export default GenerateInfo;