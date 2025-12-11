import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({

	// import -> like #include in C/C++
	imports: [ConfigModule],

	// controllers: API (public)
	controllers: [WeatherController],

	// providers: services (private)
	providers: [WeatherService],

	// Declare the other module which can export it
	exports: []
})

export class WeatherModule {}