type RANGE_KEYWORD = 'xs' | 'sm' | 'md' | 'lg';

const RANGE_PX: {
	[key in RANGE_KEYWORD]: number;
} = {
	xs: 360,
	sm: 576,
	md: 768,
	lg: 992,
};

interface RangeConfig {
	max: number;
	text: string;
}

export function mediaQuery(
	selector: string | unknown,
	rangeConfig: {
		[key in RANGE_KEYWORD]?: string;
	} & {
		[key: number]: string;
	}
) {
	const ranges: RangeConfig[] = [];

	const sorted: RangeConfig[] = (Object.keys(rangeConfig) as (
		| RANGE_KEYWORD
		| number
	)[])
		.map((key) => {
			if (typeof key === 'string') {
				return {
					max: RANGE_PX[key],
					text: rangeConfig[key]!,
				};
			}
			return {
				max: key,
				text: rangeConfig[key]!,
			};
		})
		.sort((a, b) => a.max - b.max);
	for (let i = 0; i < sorted.length; i++) {
		const max = i === sorted.length - 1 ? Infinity : sorted[i + 1].max;
		ranges.push({
			max: max,
			text: sorted[i].text!,
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
