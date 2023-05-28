import { OPEN_AI_KEY } from '$lib/server/config';
import { Configuration, OpenAIApi } from 'openai';
let chatHistory: { role: string; content: string }[] = [];

export const POST = async ({ request }) => {
	const { message, parsedData } = await request.json();
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPEN_AI_KEY}`
		},
		method: 'POST',
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: 'Parsed Data:' + parsedData
				},
				...chatHistory,
				{
					role: 'user',
					content: message
				}
			],
			max_tokens: 2000
		})
	});
	if (res.status !== 200) {
		throw new Error('OpenAI API returned an error');
	}
	// check if res has "Response: " in the beginning. if so, remove it and return the rest of the string

	const data = await res.json();
	chatHistory.push({ role: 'system', content: data.choices[0].message.content });
	chatHistory.push({ role: 'user', content: query });
	if (chatHistory.length > 5) {
		chatHistory = chatHistory.slice(1);
	}
	console.log(chatHistory);
	console.log(data);
	return new Response(JSON.stringify({ answer: data.choices[0].message.content }), {
		status: 200
	});
};
