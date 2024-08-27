import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import isImageUrl from '../utils/check-image-url.util';

export default function IsImageUrl(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isImageUrl',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') {
                        return false;
                    }

                    return await isImageUrl(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid image URL`;
                },
            },
        });
    };
}
