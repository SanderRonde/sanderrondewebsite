import express from 'express';
import chalk from 'chalk';

export namespace Log {
	let longestTagLength = 10;

	function getPadding(tag: string) {
		if (tag.length > longestTagLength) {
			longestTagLength = tag.length;
		}

		const paddingAmount = longestTagLength - tag.length;
		return `${new Array(paddingAmount).fill(' ').join('')}`;
	}

	export function info(tag: string, ...data: any[]) {
		console.log(chalk.blue(`[ ${tag} ]${getPadding(tag)} -`), ...data);
	}

	export function success(tag: string, ...data: any[]) {
		console.log(
			chalk.green(chalk.bold(`[ ${tag} ]${getPadding(tag)} -`)),
			...data
		);
	}

	export function warning(tag: string, ...data: any[]) {
		console.log(
			chalk.rgb(
				255,
				165,
				0
			)(chalk.bold(`[ ${tag} ]${getPadding(tag)} -`)),
			...data
		);
	}

	export function error(tag: string, ...data: any[]) {
		console.log(
			chalk.red(chalk.bold(`[ ${tag} ]${getPadding(tag)} -`)),
			...data
		);
	}

	export function server(tag: string, ...data: any[]) {
		console.log(chalk.magenta(`[ ${tag} ]${getPadding(tag)} -`), ...data);
	}

	export function getStyledStatus(status: number) {
		if (status < 200) {
			return chalk.red(status);
		}
		if (status < 300) {
			return chalk.green(status);
		}
		if (status < 400) {
			return chalk.blue(status);
		}
		return chalk.red(status);
	}

	export function request(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const originalEnd = res.end;
		const startTime = process.hrtime();
		res.end = (...args: any[]) => {
			const elapsed = process.hrtime(startTime);
			const ms = elapsed[0] * 1e3 + elapsed[1] * 1e-6;

			Log.server(
				'request',
				req.method,
				req.originalUrl || req.url,
				getStyledStatus(res.statusCode),
				`${ms.toFixed(3)}ms`
			);
			return originalEnd.apply(res, args);
		};
		next();
	}
}
