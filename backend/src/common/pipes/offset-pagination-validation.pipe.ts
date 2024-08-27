import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OffsetPaginationValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'query') return value;

        let { page, pageSize } = value;
        (page = page ?? 1), (pageSize = pageSize ?? 10);

        const parsedPage = this.parseAndValidateInteger(page, 'page', 1);
        const parsedPageSize = this.parseAndValidateInteger(
            pageSize,
            'pageSize',
            1,
            100,
        );

        const errors: string[] = [];

        if (parsedPage instanceof Error) {
            errors.push(parsedPage.message);
        }
        if (parsedPageSize instanceof Error) {
            errors.push(parsedPageSize.message);
        }

        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        return {
            page: parsedPage as number,
            pageSize: parsedPageSize as number,
        };
    }

    private parseAndValidateInteger(
        value: string,
        fieldName: string,
        min: number = 1,
        max?: number,
    ): number | Error {
        const parsed = parseInt(value);

        if (Number.isNaN(parsed)) {
            return new Error(`${fieldName} must be an integer number`);
        }

        if (parsed < min) {
            return new Error(
                `${fieldName} must be greater than or equal to ${min}`,
            );
        }

        if (max !== undefined && parsed > max) {
            return new Error(
                `${fieldName} must be less than or equal to ${max}`,
            );
        }

        return parsed;
    }
}
