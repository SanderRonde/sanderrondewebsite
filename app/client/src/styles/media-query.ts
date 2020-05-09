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
	min: number;
	max: number;
	text: string;
}

export function mediaQuery(
	selector: string | unknown,
	rangeConfig: Map<[RANGE_KEYWORD | number, RANGE_KEYWORD | number], string>
) {
	const ranges: RangeConfig[] = [...rangeConfig.entries()].map(
		([[min, max], value]) => {
			if (typeof min === 'string') {
				min = RANGE_PX[min];
			}
			if (typeof max === 'string') {
				max = RANGE_PX[max];
			}
			return {
				min,
				max,
				text: value,
			};
		}
	);

	const sorted = ranges.sort((a, b) => {
		return b.min - a.min;
	});

	return sorted
		.reverse()
		.map(({ min, max, text }) => {
			const lines = text.split('\n');
			const rules = ['screen'];
			if (min !== 0) {
				rules.push(`(min-width: ${min}px)`);
			}
			if (max !== Infinity) {
				rules.push(`(max-width: ${max - 1}px)`);
			}
			return `@media ${rules.join(' and ')} {\n\t${selector!} ${
				lines[0]
			}${lines
				.slice(1)
				.map((l) => `\t\t${l}`)
				.join('\n')}\n}`;
		})
		.join('\n');
}

export function mediaQueryRule(
	selector: string | unknown,
	styleKey: string,
	valueConfig: Map<[RANGE_KEYWORD | number, RANGE_KEYWORD | number], string>
) {
	return mediaQuery(
		selector,
		new Map(
			[...valueConfig.entries()].map(([key, value]) => {
				return [key, `{ ${styleKey}: ${value}; }`];
			})
		)
	);
}
