import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
    private isObject(value: any): boolean {
        return typeof value === 'object' && value !== null;
    }

    private trimValue(value: any): any {
        if (typeof value === 'string') {
            return value.trim();
        }
        if (Array.isArray(value)) {
            return value.map((item) => this.trimValue(item));
        }
        if (this.isObject(value)) {
            return this.trimObject(value);
        }
        return value;
    }

    private trimObject(obj: Record<string, any>): Record<string, any> {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (key !== 'password') {
                acc[key] = this.trimValue(value);
            } else {
                acc[key] = value;
            }
            return acc;
        }, {});
    }

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'body') {
            return value;
        }

        if (!this.isObject(value)) {
            throw new BadRequestException(
                'Invalid input: expected an object body',
            );
        }

        return this.trimObject(value);
    }
}
