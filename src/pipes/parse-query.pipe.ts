import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseQueryPipe implements PipeTransform {
  constructor(private readonly defaultValue: number = 0) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    return isNaN(val) ? this.defaultValue : val;
  }
}
