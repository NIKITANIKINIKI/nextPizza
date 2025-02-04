import { ProductWithRelations } from "@/@types/prisma";
import { Button } from "../ui";
import { Title } from "./title";
import { FC } from "react";

interface ChooseProductContent {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductContent: FC<ChooseProductContent> = ({ product }) => {

  return (
    <div className="flex bg-white rounded-lg  h-[500px]">
      <div className="flex items-center justify-center flex-1 relative ">
        <img src={product.imageUrl} className="w-[400px]"/>
      </div>
      <div className="flex flex-col gap-3 flex-1 items-center justify-center text-center bg-[#f7f6f5] rounded-r-lg">
        <Title text={product.name} size="md" className="font-extrabold mb-1" />
        <Button>Добавить в корзину за {product.items[0].price} ₽</Button>
      </div>
    </div>
  );
};
