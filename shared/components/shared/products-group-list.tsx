import React from "react";
import { ProductCard } from "./product-card";
import { ProductWithRelations } from "@/@types/prisma";

interface ProductsGroupList {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<ProductsGroupList> = ({
    title,
    items,
    listClassName,
    categoryId,
    className,
  }) => {
  return(
    <div>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
    </div>
  );
};
