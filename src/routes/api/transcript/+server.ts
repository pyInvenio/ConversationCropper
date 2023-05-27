import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
  const text = await request.json();
  return new Response(JSON.stringify({ test: text }), {
		status: 200
	});
}) satisfies RequestHandler;