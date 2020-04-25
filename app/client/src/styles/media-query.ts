type RANGE_KEYWORD = 'xs' | 'sm' | 'md' | 'lg';
const RANGE_KEYWORDS: RANGE_KEYWORD[] = ['xs', 'sm', 'md', 'lg'];

const RANGE_PX: {
	[key in RANGE_KEYWORD]: number;
} = {
	xs: 360,
	sm: 576,
	md: 768,
	lg: 992,
};

function getTruthyKey<
	O extends {
		[key: string]: string | undefined;
	}
>(obj: O, keys: (keyof O)[]) {
	for (const key of keys) {
		if (obj[key]) return key;
	}
	return null;
}

interface RangeConfig {
	max: number;
	text: string;
}

export function mediaQuery(
	selector: string | unknown,
	rangeConfig: {
		[key in RANGE_KEYWORD]?: string;
	}
) {
	const ranges: RangeConfig[] = [];

	const lowest = getTruthyKey(rangeConfig, ['xs', 'sm', 'md', 'lg']);
	const highest = getTruthyKey(rangeConfig, ['lg', 'md', 'sm', 'xs']);

	if (lowest === null || highest === null) return '';

	const indices = (Object.keys(rangeConfig) as RANGE_KEYWORD[]).map((k) =>
		RANGE_KEYWORDS.indexOf(k)
	);
	for (let i = 0; i < indices.length; i++) {
		const max =
			i === indices.length - 1
				? Infinity
				: RANGE_PX[RANGE_KEYWORDS[indices[i + 1]]];
		ranges.push({
			max: max,
			text: rangeConfig[RANGE_KEYWORDS[indices[i]]]!,
		});
	}

	return ranges
		.reverse()
		.map(({ max, text }) => {
			const lines = text.split('\n');
			if (max === Infinity) {
				return `${selector!} ${lines[0]}${lines
					.slice(1)
					.map((l) => `\t\t${l}`)
					.join('\n')}`;
			}
			return `@media screen and (max-width: ${max}px) {\n\t${selector!} ${
				lines[0]
			}${lines
				.slice(1)
				.map((l) => `\t\t${l}`)
				.join('\n')}\n}`;
		})
		.join('\n');
}

function objFromEntries<V>(
	entries: [string, V][]
): {
	[key: string]: V;
} {
	const obj: {
		[key: string]: V;
	} = {};
	for (const [key, value] of entries) {
		obj[key] = value;
	}
	return obj;
}

export function mediaQueryRule(
	selector: string | unknown,
	key: string,
	valueConfig: {
		[key in RANGE_KEYWORD]?: string;
	}
) {
	return mediaQuery(
		selector,
		objFromEntries(
			(Object.keys(valueConfig) as RANGE_KEYWORD[]).map((valueKey) => {
				return [valueKey, `{ ${key}: ${valueConfig[valueKey]}; }`];
			})
		)
	);
}
