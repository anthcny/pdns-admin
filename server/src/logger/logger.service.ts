import { Component } from '@nestjs/common';
import { LogLevel } from './log-level';

@Component()
export class LoggerService {
	readonly type = LogLevel;

	log(level: LogLevel, data) {
		// tslint:disable-next-line:no-console
		console.log(level, data);
	}

	logSync(level: LogLevel, data) {
		// tslint:disable-next-line:no-console
		console.log(level, data);
	}
}