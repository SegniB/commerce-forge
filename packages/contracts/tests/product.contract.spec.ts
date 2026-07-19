import { describe, expect, it } from 'vitest';

import { ProductSchema, ProductSlugSchema } from '../src';

const validProduct = {
  id: '1f42f576-b17d-4e42-b970-843ad0eb6119',
  name: 'Classic T-Shirt',
  slug: 'classic-t-shirt',
  description: 'A comfortable everyday T-shirt.',
  variants: [
    {
      id: 'e5741265-6934-46b1-8512-b2d34d14c60e',
      sku: 'TSHIRT-BLACK-M',
      color: 'Black',
      size: 'M',
      price: {
        amountMinor: 2999,
        currency: 'EUR',
      },
      inStock: true,
    },
  ],
};

describe('ProductSchema', () => {
  it('accepts a valid product', () => {
    expect(ProductSchema.safeParse(validProduct).success).toBe(true);
  });

  it('rejects an invalid product slug', () => {
    const product = {
      ...validProduct,
      slug: 'Classic T-Shirt',
    };

    expect(ProductSchema.safeParse(product).success).toBe(false);
  });

  it('rejects a product without variants', () => {
    const product = {
      ...validProduct,
      variants: [],
    };

    expect(ProductSchema.safeParse(product).success).toBe(false);
  });
});

describe('ProductSlugSchema', () => {
  it('accepts a lowercase hyphenated slug', () => {
    expect(ProductSlugSchema.safeParse('classic-t-shirt').success).toBe(true);
  });

  it.each([
    'Classic-T-Shirt',
    'classic--t-shirt',
    '-classic-t-shirt',
    'classic-t-shirt-',
  ])('rejects invalid slug: %s', (slug) => {
    expect(ProductSlugSchema.safeParse(slug).success).toBe(false);
  });
});