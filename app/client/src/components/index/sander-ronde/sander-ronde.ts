import {
    ConfigurableWebComponent,
    config,
    TemplateFn,
    CHANGE_TYPE,
} from '../../../../../../node_modules/wc-lib/build/es/wc-lib.js';
import {
    render,
    html,
} from '../../../../../../node_modules/lit-html/lit-html.js';

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
