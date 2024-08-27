import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    HttpCode,
    UseFilters,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PostgresExceptionFilter } from 'src/common/filters/postgres.exception.filter';
import { OffsetPaginationValidationPipe } from 'src/common/pipes/offset-pagination-validation.pipe';

@Controller('brands')
@UseFilters(
    new PostgresExceptionFilter({
        '23505': 'A brand with this name already exists',
    }),
)
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Post()
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.brandsService.create(createBrandDto);
    }

    @Get()
    findAll(
        @Query(OffsetPaginationValidationPipe)
        { page, pageSize }: { page: number; pageSize: number },
    ) {
        return this.brandsService.findAll(page, pageSize);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.brandsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
        return this.brandsService.update(id, updateBrandDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: number) {
        this.brandsService.remove(id);
    }
}
