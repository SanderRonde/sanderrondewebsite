interface ServiceworkerEvent {
	waitUntil(fn: Promise<any>): void;
}

interface DedicatedWorkerGlobalScope {
	addEventListener(type: 'install', callback: (event: ServiceworkerEvent) => void): void;
}