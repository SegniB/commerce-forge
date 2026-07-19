import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from './zod-validation.pipe.js';

describe('ZodValidationPipe', () => {
  const pipe = new ZodValidationPipe(z.string().trim().min(1));

  it('returns the parsed value', () => {
    expect(pipe.transform('  valid  ')).toBe('valid');
  });

  it('throws BadRequestException for invalid input', () => {
    expect(() => pipe.transform('')).toThrow(BadRequestException);
  });
});
