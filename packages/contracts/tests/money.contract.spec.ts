import { describe, expect, it } from 'vitest';

import { MoneySchema } from '../src';

describe('MoneySchema', () => {
  it('accepts money expressed in integer minor units', () => {
    const result = MoneySchema.safeParse({
      amountMinor: 1999,
      currency: 'EUR',
    });

    expect(result.success).toBe(true);
  });

  it.each([
    { amountMinor: 19.99, currency: 'EUR' },
    { amountMinor: -1, currency: 'EUR' },
    { amountMinor: 100, currency: 'USD' },
  ])('rejects invalid money: %o', (value) => {
    expect(MoneySchema.safeParse(value).success).toBe(false);
  });
});