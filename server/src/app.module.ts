import { Module } from '@nestjs/common';
import { LoggerModule } from './logger';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './main/data.module';

@Module({
  imports: [LoggerModule, AuthModule, DataModule],
})
export class ApplicationModule {}