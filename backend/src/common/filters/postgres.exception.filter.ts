import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg';

@Catch(QueryFailedError)
export class PostgresExceptionFilter implements ExceptionFilter {
    constructor(private readonly customMessages: Record<string, string>) {}

    catch(exception: QueryFailedError<DatabaseError>, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const { code } = exception.driverError;
        if (code === '23505') {
            response.status(HttpStatus.CONFLICT).json({
                message: this.customMessages['23505'] || 'Invalid data',
                error: 'Conflict',
                statusCode: HttpStatus.CONFLICT,
            });
        } else if (code === '23503') {
            response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                message: this.customMessages['23503'] || 'Invalid data',
                error: 'Unprocessable Entity',
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            });
        }
    }
}
