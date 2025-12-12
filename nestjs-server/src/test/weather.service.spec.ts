import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../weather/weather.service';
import { ConfigService } from '@nestjs/config';

const mockRedisClient = {
	get: jest.fn(),
	set: jest.fn(),
};

const mockConfigService = {
	get: jest.fn((key) => {
		if (key === 'WEATHER_API_KEY') return 'test-api-key';
		if (key === 'WEATHER_API_BASE_URL') return 'http://api.weather.com';
		return null;
	}),
};


describe('WeatherService', () => {
	let service: WeatherService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WeatherService,
				{ provide: 'REDIS_CLIENT', useValue: mockRedisClient },
				{ provide: ConfigService, useValue: mockConfigService },
			],
		}).compile();

		service = module.get<WeatherService>(WeatherService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('if cached data exists, should return cached weather data without calling API', async() => {
		mockRedisClient.get.mockResolvedValue(JSON.stringify({
			city: 'Paris',
			temp: 20
		}));

		const result = await service.getWeather('Paris');

		expect(result).toEqual({
			city: 'Paris',
			temp: 20
		});
		expect(mockRedisClient.get).toHaveBeenCalledWith('weather:paris');
	});
});