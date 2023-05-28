import { OPEN_AI_KEY } from '$lib/server/config.js';
import { Configuration, OpenAIApi } from 'openai';

export const POST = async ({ request }) => {
  const body = await request.json();
  const transcript = body.transcript;
  const tags = body.tags;
  const accessToken = OPEN_AI_KEY;

  const prompt =
    `Please perform a semantic analysis on the given transcript of a conversation. Categorize sentences or groups of sentences into the provided categories, while excluding any sentences that are simply questions without significant insights or concrete data related to the farming practices or conditions. If a sentence includes a statistic or relevant data point pertaining to a category, please include this information in a 'data' subsection under that category. If appropriate, name the keys in 'data' to match the category name. Also, provide a frequency score representing how often each topic was discussed.

    Structure your output as a JSON. This JSON should have three high-level sections: 'mentioned' for categories explicitly discussed in the conversation, 'unmentioned' for categories not directly referenced but still relevant to the conversation, and 'issues_and_blockers' for problems or impediments mentioned during the conversation. Each category should contain the 'sentences', 'frequency', and 'data' sections, with 'data' being an optional section that only appears if there are relevant data points to include.
    
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
