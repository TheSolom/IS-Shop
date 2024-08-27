import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigModule } from './config/database/postgres/config.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PostgresConfigModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
