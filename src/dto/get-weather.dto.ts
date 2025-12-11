import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetWeatherDto {
	@IsString()
	@IsNotEmpty()
	@Length(2, 50)
	city: string;
}