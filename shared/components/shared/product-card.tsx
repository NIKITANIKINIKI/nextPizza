import React from "react";
import Link from "next/link";
import { Ingredient } from "@prisma/client";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img src={imageUrl} alt={name} className="w-[215px] h-[215px]" />
        </div>
        <Title text={name} size="sm" className="font-bold" />
        <p className="text-sm text-gray-500">
          {ingredients.map((el) => el.name).join(" ,")}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            oт <b>{price} ₽</b>
          </span>
          <Button className="text-base font-bo">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
