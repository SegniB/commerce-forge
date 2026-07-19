import { BadRequestException } from '@nestjs/common';
import type { PipeTransform } from '@nestjs/common';
import type { output, ZodType } from 'zod';

export class ZodValidationPipe<
  TSchema extends ZodType,
> implements PipeTransform<unknown, output<TSchema>> {
  constructor(private readonly schema: TSchema) {}

  transform(value: unknown): output<TSchema> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: result.error.issues.map((issue) => ({
          path: issue.path.map(String).join('.'),
          message: issue.message,
        })),
      });
    }

    return result.data;
  }
}
