import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from '../weather/weather.controller';
import { WeatherService } from '../weather/weather.service';

const mockWeatherService = {
	getWeather: jest.fn().mockResolvedValue({ city: 'Paris', temp: 20 }),
}

describe('WeatherController', () => {
	let controller: WeatherController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WeatherController],
			providers: [
				{ provide: WeatherService, useValue: mockWeatherService }
			],
		}).compile();

		controller = module.get<WeatherController>(WeatherController);
	});

	it('When give the city name, then it should return the weather data', async () => {
		const result = await controller.getWeather({ city: 'Paris' });

		expect(result).toEqual({ city: 'Paris', temp: 20 });
		expect(mockWeatherService.getWeather).toHaveBeenCalledWith('Paris');
	});
});
