declare module "minimize" {
	class Minimize {
		parse(content: string, callback: (error: Error|void, data: string) => void): void;
	}

	export = Minimize;
}