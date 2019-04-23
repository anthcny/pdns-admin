import express = require('express');
import { ExceptionFilter, Catch, Component } from '@nestjs/common';

import { LoggerService } from './logger.service';
import { HttpException } from '@nestjs/common';

@Catch()
export class LoggerExceptionFilter implements ExceptionFilter {

	constructor(protected logger: LoggerService) {}

  catch(exception: Error | HttpException, response: express.Response) {
		this.logger.log(this.logger.type.error, exception);

		let statusCode = 500,
			errorData: any = {
				statusCode,
				message: 'Internal server error',
			};

		if (exception instanceof HttpException) {
			statusCode = exception.getStatus();
			errorData = exception.getResponse();
		}

		response.status(statusCode).json(errorData);
	}
}