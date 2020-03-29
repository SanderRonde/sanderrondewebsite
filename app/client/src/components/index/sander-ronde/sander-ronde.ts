import {
    ConfigurableWebComponent,
    config,
    TemplateFn,
    CHANGE_TYPE,
} from 'wc-lib';
import { render, html } from 'lit-html';

@config({
    is: 'sander-ronde',
    html: new TemplateFn<SanderRonde>(
        () => {
            return html`
                <div>Hi!</div>
            `;
        },
        CHANGE_TYPE.NEVER,
        render
    ),
    css: null,
})
export class SanderRonde extends ConfigurableWebComponent {}
