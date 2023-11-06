export const runtime = "edge";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const generatePrompt = (req) => {
  const { country, days, type, arrival, departure } = req.body;
  const promptTemplate = `Plan a ${days} days trip to ${country} for 2 people, it should be of type ${type} and give me an overall cost estimate at the end in INR. The trip plan should consider the city of arrival which is ${arrival} and departure which is ${departure}.
    Provide a RFC8259 compliant JSON response  following this format without deviation.
    {
        "plans":[{
            "day": "1",
            "places": "some description of place and where to go",
            "weather": "expecting rains"
        }],
        "cost": "1000 INR"
    }`;
  return promptTemplate;
};

/*
const handler = async (req, res) => {
  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: generatePrompt(req),
      temperature: 0.6,
      max_tokens: 2048,
    });
    console.log(completion.choices[0].text);
    res.status(200).json({
      result: completion.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: "An error occurred during the request.",
      },
    });
  }
};
*/

export default async function handler(request) {
  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: generatePrompt(request),
      temperature: 0.6,
      max_tokens: 2048,
    });
    return new Response(
      JSON.stringify({
        result: completion.choices[0].text,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: {
          message: "An error occurred during the request.",
        },
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
