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
    <div>
      <Link href={""}>
        <div>
          <img src={imageUrl} alt={name} />
        </div>
        <Title text={name} />
        <p>{ingredients.map((el) => el.name).join(" ,")}</p>
        <div>
          <span>
            oт <b>{price} ₽</b>
          </span>
          <Button>
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
