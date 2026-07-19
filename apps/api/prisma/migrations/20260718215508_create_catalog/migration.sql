-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR');

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT uuidv7(),
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(160) NOT NULL,
    "description" VARCHAR(5000) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
   "id" UUID NOT NULL DEFAULT uuidv7(),
    "product_id" UUID NOT NULL,
    "sku" VARCHAR(64) NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "size" VARCHAR(20) NOT NULL,
    "price_amount_minor" INTEGER NOT NULL,
    "price_currency" "Currency" NOT NULL DEFAULT 'EUR',
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_sku_key" ON "product_variants"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_product_id_color_size_key" ON "product_variants"("product_id", "color", "size");

-- AddForeignKey
ALTER TABLE "product_variants"
ADD CONSTRAINT "product_variants_product_id_fkey"
FOREIGN KEY ("product_id")
REFERENCES "products"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

-- AddCheckConstraint
ALTER TABLE "products"
ADD CONSTRAINT "products_slug_format_check"
CHECK ("slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

-- AddCheckConstraint
ALTER TABLE "product_variants"
ADD CONSTRAINT "product_variants_price_amount_minor_nonnegative_check"
CHECK ("price_amount_minor" >= 0);

-- AddCheckConstraint
ALTER TABLE "product_variants"
ADD CONSTRAINT "product_variants_stock_quantity_nonnegative_check"
CHECK ("stock_quantity" >= 0);
