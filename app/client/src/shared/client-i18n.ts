import { Part, directive } from 'lit-html';

export const I18NReturner = directive(
	(promise: Promise<any>) => (part: Part) => {
		promise.then((str) => {
			part.setValue(str);
			part.commit();
		});
	}
);
