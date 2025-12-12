import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { WeatherModule } from './weather/weather.module';

@Module({
	imports: [
		// Setting up environment variables
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env`,
		}),
	
		// Redis Modules
		RedisModule,

		// Weather Module
		WeatherModule,
	],
})
export class AppModule {}