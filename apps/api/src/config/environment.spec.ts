import { ZodError } from 'zod';

import { validateEnvironment } from './environment.js';

describe('validateEnvironment', () => {
  it('accepts a PostgreSQL connection URL', () => {
    const environment = validateEnvironment({
      DATABASE_URL:
        'postgresql://commerce_forge:password@127.0.0.1:5433/commerce_forge',
    });

    expect(environment.DATABASE_URL).toContain('commerce_forge');
  });

  it('rejects a missing database URL', () => {
    expect(() => validateEnvironment({})).toThrow(ZodError);
  });

  it('rejects a non-PostgreSQL URL', () => {
    expect(() =>
      validateEnvironment({
        DATABASE_URL: 'https://example.com/database',
      }),
    ).toThrow('DATABASE_URL must be a valid PostgreSQL connection URL');
  });
});
