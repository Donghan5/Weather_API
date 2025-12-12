import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
	// Create the NestJS application
	const app = await NestFactory.create(AppModule);
	
	const configService = app.get(ConfigService);
	const port = configService.get<number>('PORT') || 3000;

	// verify placeholder
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true, // remove any properties that are not in the dto
		transform: true, // transform the data to the type defined in the dto
		forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are present
	}))

	app.enableCors(); // enable CORS

	// open the port
	await app.listen(port);
	console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
