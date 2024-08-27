import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TrimPipe } from './common/pipes/trim-body.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
        new TrimPipe(),
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
