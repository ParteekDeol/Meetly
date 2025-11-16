import {
  GoogleGenAI,
} from '@google/genai';

async function GenerateLocations(responses) {
  for (let i = 0; i < responses.length; i++) {
    responses[i] = `${responses[i].question}: ${responses[i].answer}`;
  }
  responses = responses.join("; ");

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


export default GenerateLocations;