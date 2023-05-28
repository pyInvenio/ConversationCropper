import { OPEN_AI_KEY } from '$lib/server/config.js';
import { Configuration, OpenAIApi } from 'openai';

export const POST = async ({ request }) => {
  const body = await request.json();
  const transcript = body.transcript;
  const tags = body.tags;
  const accessToken = OPEN_AI_KEY;

  const prompt = `Given the provided transcript of a conversation between a farmer and a representative from a tech startup specializing in agriculture-based carbon removal, please analyze the conversation. Using the following categories ${tags}, determine the frequency of each topic's mention, any associated data or statistics, and the sentences related to them in the form of {label:{data, frequency, sentences}}. In addition, identify topics that were discussed but not listed in the given categories and provide the same details for them. Also, determine if there were any issues or blockers that were brought up during the conversation. Based on the discussion, list the next steps as action items for the tech startup representative with the json label "action-items", and propose some potential future questions (labeled "future-questions") for the representative to ask the farmer in their next conversation. Also provide four relevant search terms to help the representative, labeled "queries". If there are any possible "issues-or-blockers" for the farmer, put it in the json too. The output should be in the JSON format. The transcript is ${transcript}.`;

  const configuration = new Configuration({
    apiKey: accessToken
  });

  const openai = new OpenAIApi(configuration);

  const res = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });

  if (res.status !== 200) {
    return new Response('Error', { status: 500 });
  }

  const data = await res.data;
  const response_text = data.choices[0].message.content;
  return new Response(JSON.stringify({ data: response_text }));
};
