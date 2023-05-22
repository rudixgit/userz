export function onRequest({ locals, request }, next) {
	// intercept response data from a request
	// optionally, transform the response by modifying `locals`
	locals.title = "New title"
	console.log(request)

	// return a Response or the result of calling `next()`
	return next()
};