import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

import { DataController } from './controllers';
import { DataService } from './services';

@Module({
	components: [DataService],
	controllers: [DataController],
})
export class DataModule implements NestModule {
	configure(consumer: MiddlewaresConsumer) {
		HelmetMiddleware.configure({});
		return consumer.apply(HelmetMiddleware)
			.forRoutes(DataController);
	}
}