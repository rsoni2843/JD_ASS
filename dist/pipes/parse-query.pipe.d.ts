import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParseQueryPipe implements PipeTransform {
    private readonly defaultValue;
    constructor(defaultValue?: number);
    transform(value: any, metadata: ArgumentMetadata): number;
}
