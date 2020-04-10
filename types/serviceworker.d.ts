interface ServiceworkerEvent {
	waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends Event {
	readonly request: Request;
	respondWith(response: Promise<Response>|Response): Promise<Response>;
}

interface ClientMatchOptions {
	includeUncontrolled?: boolean;
	type?: ClientMatchTypes;
}

type ClientFrameType = "auxiliary" | "top-level" | "nested" | "none";
type ClientMatchTypes = "window" | "worker" | "sharedworker" | "all";
type WindowClientState = "hidden" | "visible" | "prerender" | "unloaded";

interface Client {
	frameType: ClientFrameType;
	id: string;
	url: string;
	postMessage(message: any): void;
}

interface WindowClient extends Client {
	focused: boolean;
	visibilityState: WindowClientState;
	focus(): Promise<WindowClient>;
	navigate(url: string): Promise<WindowClient>;
}

interface Clients {
	claim(): Promise<any>;
	get(id: string): Promise<Client>;
	matchAll(options?: ClientMatchOptions): Promise<Array<WindowClient>>;
	openWindow(url: string): Promise<WindowClient>;
}

interface DedicatedWorkerGlobalScope {
	addEventListener(type: 'install', callback: (event: ServiceworkerEvent) => void): void;
	addEventListener(type: 'fetch', callback: (event: FetchEvent) => void): void;

	skipWaiting(): void;
	clients: Clients;
}