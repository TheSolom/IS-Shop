import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Brand } from './entities/brand.entity';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsRepository extends Repository<Brand> {
    constructor(private readonly dataSource: DataSource) {
        super(Brand, dataSource.createEntityManager());
    }

    async updateAndReturn(
        brandId: number,
        updateBrandDto: UpdateBrandDto,
    ): Promise<Brand | null> {
        const { raw } = await this.createQueryBuilder('brand')
            .update(Brand)
            .set(updateBrandDto)
            .where('brandId = :brandId', { brandId })
            .returning('*')
            .execute();

        return raw.length > 0 ? raw[0] : null;
    }
}
