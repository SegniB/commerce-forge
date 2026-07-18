import { z } from 'zod';

export const CurrencySchema = z.enum(['EUR']);

export const MoneySchema = z.object({
  amountMinor: z.number().int().nonnegative(),
  currency: CurrencySchema,
});

export type Currency = z.infer<typeof CurrencySchema>;
export type Money = z.infer<typeof MoneySchema>;