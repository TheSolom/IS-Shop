import { IsString, Length, IsOptional } from 'class-validator';
import IsImageUrl from 'src/common/decorators/check-image-url.decorator';

export class CreateBrandDto {
    @Length(3, 32)
    @IsString()
    brandName: string;

    @Length(3, 32)
    @IsString()
    @IsOptional()
    brandSlug?: string | null;

    @Length(3, 128)
    @IsString()
    @IsOptional()
    brandDescription?: string | null;

    @IsImageUrl()
    @IsOptional()
    brandImage?: string;
}
