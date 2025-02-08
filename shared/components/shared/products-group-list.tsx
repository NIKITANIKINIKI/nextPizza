"use client";
import React from "react";
import { ProductCard } from "./product-card";
import { ProductWithRelations } from "@/@types/prisma";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";

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
  className,
  listClassName,
  categoryId,
}) => {
  const { setCategoryId } = useCategoryStore();

  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
      <div className={cn(className, title!='Пиццы' ? 'pt-[100px]' : '')} id={title}  ref={intersectionRef} >
        <Title  text={title} size="lg" className="font-extrabold" />
        <div className={cn("grid grid-cols-3 gap-[40px]", listClassName)}  >
          {items.map((product) => (
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
      </div>
  );
};
