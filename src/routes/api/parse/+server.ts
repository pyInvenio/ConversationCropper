import { OPEN_AI_KEY } from '$lib/server/config.js';
import { Configuration, OpenAIApi } from 'openai';

export const POST = async ({ request }) => {
  const body = await request.json();
  const transcript = body.transcript;
  const tags = body.tags;
  const accessToken = OPEN_AI_KEY;

  const prompt =
    `Please perform a semantic analysis on the given transcript of a conversation. Categorize sentences or groups of sentences into the provided categories. Exclude any sentences that are merely questions or do not offer significant insights into the subject matter. If a sentence contains a statistic or concrete data point that pertains to a category, include this information in a 'data' subsection under that category. If it's appropriate, name the keys under 'data' to match the category name. Provide a frequency score for how often each topic was discussed.

    Structure your output as a JSON. The JSON should have two high-level sections: 'mentioned' for the categories explicitly referenced in the conversation, and 'unmentioned' for categories not directly referenced but still relevant to the conversation. Each category should contain the 'sentences', 'frequency', and 'data' sections, with 'data' being an optional section that only appears if there are relevant data points to include.
    
    Transcript: ${transcript}
    
    Tags: ${tags}`;

  const configuration = new Configuration({
    apiKey: accessToken
  });

  const openai = new OpenAIApi(configuration);

  const res = await openai.createChatCompletion({
    model: 'gpt-4',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }]
  });

  if (res.status !== 200) {
    return new Response('Error', { status: 500 });
  }

  const data = await res.data;
  const response_text = data.choices[0].message.content;
  return new Response(JSON.stringify({ data: response_text }));
};
