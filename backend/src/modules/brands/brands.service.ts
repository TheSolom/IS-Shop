import { DeleteResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsRepository } from './brands.repository';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { OffsetPaginatedEntity } from 'src/common/interfaces/offset-pagination.interface';
import slugifyName from 'src/common/utils/slugify-name.util';

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(BrandsRepository)
        private readonly brandRepository: BrandsRepository,
    ) {}

    async create(createBrandDto: CreateBrandDto): Promise<Partial<Brand>> {
        const {
            brandName,
            brandSlug = slugifyName(brandName),
            brandDescription,
            brandImage,
        } = createBrandDto;

        const brand: Brand = this.brandRepository.create({
            brandName,
            brandSlug,
            brandDescription,
            brandImage,
        });

        const { raw } = await this.brandRepository.insert(brand);

        return raw[0];
    }

    async findAll(
        page: number,
        pageSize: number,
    ): Promise<OffsetPaginatedEntity<Brand>> {
        const skip: number = (page - 1) * pageSize;

        const [brands, count]: [Brand[], number] =
            await this.brandRepository.findAndCount({
                skip,
                take: pageSize,
            });

        if (!brands.length) throw new NotFoundException('No brands found');

        return {
            totalCount: count,
            currentPage: page,
            totalPages: Math.ceil(count / pageSize),
            data: brands,
        };
    }

    async findOne(id: number): Promise<Brand> {
        const brand: Brand = await this.brandRepository.findOne({
            where: { brandId: id },
        });

        if (!brand) throw new NotFoundException('No brand found');

        return brand;
    }

    async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
        const {
            brandName,
            brandSlug = slugifyName(brandName),
            brandDescription,
            brandImage,
        } = updateBrandDto;

        const updatedBrand: Brand = await this.brandRepository.updateAndReturn(
            id,
            {
                brandName,
                brandSlug,
                brandDescription,
                brandImage,
            },
        );

        if (!updatedBrand) throw new NotFoundException('Brand not found');

        return updatedBrand;
    }

    remove(id: number): Promise<DeleteResult> {
        return this.brandRepository.delete({ brandId: id });
    }
}
