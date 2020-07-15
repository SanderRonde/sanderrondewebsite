import { svg } from 'lit-html';

export const Document = ({
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
			width="${width}px" 
			height="${height}px" 
			id=${id} 
			xmlns="http://www.w3.org/2000/svg" 
			fill-rule="evenodd" 
			clip-rule="evenodd"
			viewBox="0 0 24 24"
		>
			<path d="M22 24h-20v-24h14l6 6v18zm-7-23h-12v22h18v-16h-6v-6zm3 15v1h-12v-1h12zm0-3v1h-12v-1h12zm0-3v1h-12v-1h12zm-2-4h4.586l-4.586-4.586v4.586z"/>
		</svg>
	`;

export default Document;
