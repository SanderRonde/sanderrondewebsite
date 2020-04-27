import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { InfoBlock } from './info-block.js';
import { render } from 'lit-html';

export const InfoBlockHTML = new TemplateFn<InfoBlock>(
	function (html) {
		return html`
			<div id="block">
				<div class="vertical-centerer fill-x" id="main-content">
					<div class="horizontal-centerer">
						<div id="container">
							Some content
						</div>
					</div>
				</div>
			</div>
		`;
	},
	CHANGE_TYPE.PROP,
	render
);
