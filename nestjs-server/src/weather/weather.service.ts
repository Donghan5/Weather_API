import { Injectable, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { Redis } from "ioredis";

@Injectable()
export class WeatherService {
	constructor(
		private readonly configService: ConfigService,
		@Inject('REDIS_CLIENT') private readonly redis: Redis,
	) {}

	async getWeather(city: string): Promise<any> {
		const cacheKey = `weather:${city.toLowerCase()}`;

		const cachedData = await this.redis.get(cacheKey);
		if (cachedData) {
			console.log(`Cache hit for ${city}`);
			return JSON.parse(cachedData);
		}

		console.log(`Cache Miss. Fetching from External API for ${city}`);

		try {
			const apiKey = this.configService.get('WEATHER_API_KEY');
			const baseUrl = this.configService.get('WEATHER_API_BASE_URL');

			console.log(`Debug -> API key: ${apiKey}, Base URL: ${baseUrl}`);
			
			const response = await axios.get(`${baseUrl}/${city}`, {
				params: {
					key: apiKey,
					unitGroup: 'metric',
					contentType: 'json',
				},
			});

			const weatherData = response.data;

			await this.redis.set(cacheKey,
				JSON.stringify(weatherData),
				'EX',
				43200
			);
			return weatherData;
		} catch (error) {
			console.error(`Error details: ${(error as Error).message}`);
			
			throw new HttpException('Failed to fetch weather data', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
