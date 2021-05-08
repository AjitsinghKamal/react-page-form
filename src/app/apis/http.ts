import qs from 'qs';

class HttpError {
	statusCode: number;
	response: any;
	constructor(statusCode: number, response: any) {
		this.statusCode = statusCode;
		this.response = response;
	}
}

export default async function Http(
	url: string,
	{
		method = 'GET',
		params = '',
		paramsEncoder,
		body,
		headers = {},
		...rest
	}: {
		method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
		params?: any;
		paramsEncoder?: any;
		body?: any;
		headers?: Record<string, string>;
		[x: string]: any;
	}
) {
	if (params) {
		params = '?' + qs.stringify(params, paramsEncoder);
	}
	const _options: Record<string, any> = {
		method,
		...rest,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	};
	if (body) {
		_options.body = JSON.stringify(body);
	}
	const data = await fetch(`${url}${params}`, _options);
	const response = await data.json();
	if (data.ok) {
		return response;
	} else {
		throw new HttpError(data.status, response);
	}
}
