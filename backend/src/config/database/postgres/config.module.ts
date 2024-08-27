import { Module } from '@nestjs/common';
import configuration from './configuration';

@Module({
    imports: [configuration],
})
export class PostgresConfigModule {}
