import { defineAction } from "astro:actions";
import { count, db, eq, Product, ProductImage } from "astro:db";
import { z } from "astro:schema";

export const getProductsByPage = defineAction({
  accept: "json",
  input: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(12),
  }),

  handler: async ({ page, limit }) => {
    page = page <= 0 ? 1 : page;

    const [totalRecords] = await db.select({ count: count() }).from(Product);
    const totalPages = Math.ceil(totalRecords.count / limit);

    if (page > totalPages) {
      return {
        products: [],
        totalPages: totalPages,
      };
    }

    const products = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .limit(limit)
      .offset((page - 1) * 12);

    return {
      products: products,
      totalPages: totalPages,
    };
  },
});
