import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	console.log(__dirname);
	const app = await NestFactory.create(AppModule);
	await app.listen(process.env.PORT || 8080);
}
bootstrap();
