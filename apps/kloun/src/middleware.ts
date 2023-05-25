export function onRequest({ locals, request }: { locals: { url: string }, request: { url: string } }, next: () => void) {

	locals.url = request.url

	return next()
};