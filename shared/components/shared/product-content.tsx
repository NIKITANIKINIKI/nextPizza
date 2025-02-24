"use client";
import { ProductWithRelations } from "@/@types/prisma";
import { FC } from "react";
import { ChoosePizzaContent } from "./choose-pizza-content";
import { ChooseProductContent } from "./choose-product-content";
import { Dialog, DialogContent } from "../ui";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

interface ProductContentProps {
  product: ProductWithRelations;
}

export const ProductContent: FC<ProductContentProps> = ({ product }) => {
  const firstItem = product.items[0];
  const isPizza = Boolean(firstItem.pizzaType);

  if (isPizza) {
    return (
        <ChoosePizzaContent product={product} />
    );
  }

  return <ChooseProductContent product={product} />;
};
