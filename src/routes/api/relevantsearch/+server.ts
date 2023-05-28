import * as cheerio from 'cheerio';

export const POST = async ({ request }) => {
	try {
		const body = await request.json();
		const query = body.query;

		const sourceCount = 4;

		const response = await fetch(`https://www.google.com/search?q=${query}`);
		const html = await response.text();
		const $ = cheerio.load(html);
		const linkTags = $('a');

		let links: string[] = [];

		linkTags.each((i, link) => {
			const href = $(link).attr('href');

			if (href && href.startsWith('/url?q=')) {
				const cleanedHref = href.replace('/url?q=', '').split('&')[0];

				if (!links.includes(cleanedHref)) {
					links.push(cleanedHref);
				}
			}
		});

		const filteredLinks = links.filter((link, idx) => {
			const domain = new URL(link).hostname;

			const excludeList = ['google', 'facebook', 'twitter', 'instagram', 'youtube', 'tiktok'];
			if (excludeList.some((site) => domain.includes(site))) return false;

			return links.findIndex((link) => new URL(link).hostname === domain) === idx;
		});

		const finalLinks = filteredLinks.slice(0, sourceCount);
		return new Response(JSON.stringify(finalLinks), { status: 200 });
	} catch (err) {
		console.log(err);
		return new Response('' + err, { status: 500 });
	}
};
