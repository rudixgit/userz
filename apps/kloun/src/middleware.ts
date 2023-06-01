const userAgents = [
	'Mozilla', // Common string for multiple browsers
	'Chrome', // Chrome browser
	'Firefox', // Firefox browser
	'Safari', // Safari browser
	'Edg', // Microsoft Edge browser
	'Opera', // Opera browser
	'Trident', // Internet Explorer browser
	'AppleWebKit', // WebKit-based browsers
	'Googlebot',
	'AdsBot',
	'Mediapartners',
	'Bingbot', // Bingbot crawler
	'Slurp', // Yahoo Slurp crawler
	'DuckDuckBot', // DuckDuckGo crawler
	'Baiduspider', // Baidu spider
	'YandexBot', // Yandex crawler // Googlebot crawler
	'facebookexternalhit',
	'Twitterbot',
	'TwitterBot'
];

export function onRequest({ locals, request }: { locals: { url: string }, request: { url: string, headers: { get: (x: string) => string } } }, next: () => void) {
	const userAgentHeader = request.headers.get('user-agent');
	const userAgent = userAgentHeader ? userAgentHeader : 'Unknown';
	console.log('User Agent:', userAgent);
	locals.url = request.url
	const isSupportedBrowser = userAgents.some(agent => userAgent.includes(agent));
	if (isSupportedBrowser) {
		if (request.url.includes('www.')) {
			return new Response('', {
				status: 301,
				headers: {
					'Location': request.url.replace('www.', '')
				}
			});
		}
		return next()
	} else {
		return new Response('Method not Allowed', {
			status: 405,
		});
	}

};