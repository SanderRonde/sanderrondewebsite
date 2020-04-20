export interface I18NMessage {
	message: string;
}

export type I18NTree = {
	[key: string]: I18NMessage;
}|{
	[key: string]: I18NTree;
}

export type I18NRoot = {
	[key: string]: I18NTree;
}