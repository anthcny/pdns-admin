import { Module } from '@nestjs/common';
import { LoggerExceptionFilter } from './logger-exception.filter';
import { LoggerService } from './logger.service';

@Module({
  components: [LoggerExceptionFilter, LoggerService],
})
export class LoggerModule {}