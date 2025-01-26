import { Ingredient, Product, ProductItems } from "@prisma/client";

export type ProductWithRelations = Product & {
  items: ProductItems[];
  ingredients: Ingredient[];
};
