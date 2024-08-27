import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigModule } from './config/database/postgres/config.module';
import { BrandsModule } from './modules/brands/brands.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PostgresConfigModule,
        BrandsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
