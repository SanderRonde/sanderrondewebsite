function getCookieValue(name: string): string | undefined {
	if (typeof document === undefined || !('cookie' in document)) {
		return undefined;
	}

	const cookies = document.cookie.split(';').map((cookieString) => {
		const [key, ...rest] = cookieString.trim().split('=');
		return {
			key,
			value: rest.join('='),
		};
	});

	for (const { key, value } of cookies) {
		if (key === name) return value;
	}

	return undefined;
}

export function getCookie(name: string): string | undefined;
export function getCookie<V extends string>(
	name: string,
	defaultValue: V
): string | V;
export function getCookie<V extends string>(
	name: string,
	defaultValue?: V
): string | V | undefined {
	const cookieValue = getCookieValue(name);
	if (!cookieValue && defaultValue) {
		setCookie(name, defaultValue);
		return defaultValue;
	}
	return cookieValue;
}

export function setCookie(name: string, value: string) {
	document.cookie = `${name}=${value}`;
}
