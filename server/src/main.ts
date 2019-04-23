import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import {LoggerModule, LoggerExceptionFilter, LoggerService} from './logger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const loggerModule = app.select(LoggerModule),
    loggerFilter = loggerModule.get(LoggerExceptionFilter),
    loggerService = loggerModule.get(LoggerService),
    crashAppHandler = err => {
      loggerService.logSync(loggerService.type.fatal, err);
      process.exit(1);
    };

  app.useGlobalFilters(loggerFilter);

  process.on('uncaughtException', crashAppHandler);
  process.on('unhandledRejection', crashAppHandler);

  await app.listen(3344);
}
bootstrap();