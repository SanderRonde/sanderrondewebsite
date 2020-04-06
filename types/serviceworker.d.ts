interface ServiceworkerEvent {
	waitUntil(fn: Promise<any>): void;
}

interface FetchEvent extends Event {
	readonly request: Request;
	respondWith(response: Promise<Response>|Response): Promise<Response>;
}

interface DedicatedWorkerGlobalScope {
	addEventListener(type: 'install', callback: (event: ServiceworkerEvent) => void): void;
	addEventListener(type: 'fetch', callback: (event: FetchEvent) => void): void;

	skipWaiting(): void;
}