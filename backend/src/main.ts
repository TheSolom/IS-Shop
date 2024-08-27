import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            stopAtFirstError: true,
            enableDebugMessages: true,
            whitelist: true,
        }),
    );

    await app.listen(process.env.PORT || 3000, '127.0.0.1');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
