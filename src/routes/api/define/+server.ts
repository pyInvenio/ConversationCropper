import { OPEN_AI_KEY } from '$lib/server/config.js';
import { Configuration, OpenAIApi } from 'openai';

export const POST = async ({ request }) => {
	const text = await request.json();
	const transcript = text.transcript;
	const words = text.words;
	const accessToken = OPEN_AI_KEY;

	let prompt =
		'Here is a transcript of a conversation with a farmer about topics. You want to define some phrases in the conversation, which could be related to farming and be farming slang. Output a json object with the phrases and their definitions in the form {phrase:definition}.' +
		'Transcript: ' +
		transcript +
		'Words: ' +
		words;

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
	let response_text = data.choices[0].message.content;
	return new Response(String(JSON.stringify({ data: response_text })));
};
