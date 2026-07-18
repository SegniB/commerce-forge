import { z } from 'zod';

import { MoneySchema } from '../common/money.contract';

export const ProductVariantSchema = z.object({
  id: z.uuid(),
  sku: z.string().trim().min(1).max(64),
  color: z.string().trim().min(1).max(50),
  size: z.string().trim().min(1).max(20),
  price: MoneySchema,
  inStock: z.boolean(),
});

export const ProductSchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1).max(120),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(5000),
  variants: z.array(ProductVariantSchema).min(1),
});

export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type Product = z.infer<typeof ProductSchema>;