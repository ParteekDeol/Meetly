import {
  GoogleGenAI,
} from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}
const ai = new GoogleGenAI({
  apiKey: apiKey,
});
const config = {
  thinkingConfig: {
    thinkingBudget: 0,
  },
};
const model = 'gemini-flash-lite-latest';

async function GenerateLocations(responses) {
  for (let i = 0; i < responses.length; i++) {
    responses[i] = `${responses[i].question}: ${responses[i].answer}`;
  }
  responses = responses.join("; ");

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

  const location = JSON.parse(response.text).location;
  if (!location) {
    location = "Kyoto, Japan";
  }

  return location;
}

async function GenerateInfo(location) {
  const contents = [
    {
      role: 'model',
      parts: [
        {
          text: 'You are a professional travel advisor and trip planner. Based off of the passed location, generate a list of places the user can visit and tips for visiting the location. Ensure the places are diverse and interesting, and include information about how many people usually visit that location. Make the tips actionable and practical, but make them really concise (<10 words). Always respond with a JSON object in one single line (no line breaks): { "itinerary": [{"location": "location here", "address": "address here", "description: "description here", "average_people": "average people here"}], "tips": ["tip 1", "tip 2"] }.',
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

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  let rawInfo = response.text.replace("json", "");
  const info = JSON.parse(rawInfo);

  return info;
}


export { GenerateLocations, GenerateInfo };