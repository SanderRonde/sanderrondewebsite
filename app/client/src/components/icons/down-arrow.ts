import { svg } from 'lit-html';

export const DownArrow = ({
	height = 25,
	width = 25,
	id,
}: {
	width?: number;
	height?: number;
	id: string;
}) =>
	svg`
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			x="${width}px"
			y="${height}px"
			viewBox="0 0 1000 1000"
			id=${id}
		>
			<g>
				<g>
					<path
						d="M77.3,249.3c-15.4-15.2-40.4-15.2-55.8,0c-15.4,15.2-15.4,40,0,55.2l450.6,446.1c15.4,15.2,40.4,15.2,55.8,0l450.6-446.1c15.4-15.2,15.4-40,0-55.2c-15.4-15.2-40.4-15.2-55.8,0L500,656.2L77.3,249.3z"
					/>
				</g>
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
				<g />
			</g>
		</svg>`;
export default DownArrow;
