import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

import { SignController, TestController } from './controllers';
import { SignService, UuidService } from './services';

@Module({
	components: [UuidService, SignService],
	controllers: [SignController, TestController],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewaresConsumer) {
		HelmetMiddleware.configure({});
		return consumer.apply(HelmetMiddleware)
			.forRoutes(SignController);
	}
}