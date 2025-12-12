import { Controller, Get, Query } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { GetWeatherDto } from "../dto/get-weather.dto";

@Controller('weather')
export class WeatherController {
	// DI inject
	constructor(private readonly weatherService: WeatherService) {}

	@Get()
	async getWeather(@Query() query: GetWeatherDto) {
		const weatherData = await this.weatherService.getWeather(query.city);
		console.log(`Server response: ${weatherData}`);
		return weatherData;
	}

}