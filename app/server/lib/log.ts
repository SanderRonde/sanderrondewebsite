import chalk from 'chalk';

export namespace Log {
	let longestTagLength = 10;

	function getPadding(tag: string) {
		if (tag.length > longestTagLength) {
			longestTagLength = tag.length;
		}

		const paddingAmount = longestTagLength - tag.length;
		return `${new Array(paddingAmount).fill(' ').join('')}`
	}

	export function info(tag: string, ...data: any[]) {
		console.log(chalk.blue(`[ ${tag} ]${getPadding(tag)} -`), ...data);
	}

	export function success(tag: string, ...data: any[]) {
		console.log(chalk.green(chalk.bold(`[ ${tag} ]${getPadding(tag)} -`)), ...data);
	}

	export function warning(tag: string, ...data: any[]) {
		console.log(chalk.rgb(255, 165, 0)(chalk.bold(`[ ${tag} ]${getPadding(tag)} -`)), ...data);
	}

	export function error(tag: string, ...data: any[]) {
		console.log(chalk.red(chalk.bold(`[ ${tag} ]${getPadding(tag)} -`)), ...data);
	}
}