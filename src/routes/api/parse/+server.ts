import { OPEN_AI_KEY } from '$lib/server/config.js';
import { Configuration, OpenAIApi } from 'openai';

export const POST = async ({ request }) => {
	const text = await request.json();
	const transcript = text.transcript;
	const tags = text.tags;
	const accessToken = OPEN_AI_KEY;

	let prompt =
		'Here is a transcript of a conversation with a farmer about topics. Parse it and output a JSON object with this format. Use semantic analysis for the enthusiasm level of the farmer.' +
		' Add recommendations for fields if there are none in the transcript->' +
		'{' +
		tags +
		'}: ' +
		text;

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
