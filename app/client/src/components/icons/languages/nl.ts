import { svg } from 'lit-html';

export const NL = ({
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
			enable-background="new 0 0 512 512" 
			viewBox="0 0 512 512" 
			width="${width}px" 
			height="${height}px" 
			id=${id}
		>
			<circle style="fill:#F0F0F0;" cx="256" cy="256" r="256"/>
			<path style="fill:#A2001D;" d="M256,0C145.929,0,52.094,69.472,15.923,166.957h480.155C459.906,69.472,366.071,0,256,0z"/>
			<path style="fill:#0052B4;" d="M256,512c110.071,0,203.906-69.472,240.077-166.957H15.923C52.094,442.528,145.929,512,256,512z"/>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
		</svg>
	`;

export default NL;
