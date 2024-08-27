import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';

const configuration: DynamicModule = TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: parseInt(configService.getOrThrow('POSTGRES_PORT')),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
    }),
    inject: [ConfigService],
});
export default configuration;
