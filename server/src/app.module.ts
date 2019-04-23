import { Module } from '@nestjs/common';
import { LoggerModule } from './logger';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LoggerModule, AuthModule],
})
export class ApplicationModule {}