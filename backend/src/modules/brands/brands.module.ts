import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { BrandsRepository } from './brands.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Brand])],
    controllers: [BrandsController],
    providers: [BrandsService, BrandsRepository],
})
export class BrandsModule {}
