import { Ingredient } from "@prisma/client";
import { FC } from "react";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface IngredientItemProps {
  ingredient: Ingredient;
  className?: string;
  onClick: () => void;
  active: boolean;
}

export const IngredientItem: FC<IngredientItemProps> = ({
  ingredient,
  className,
  onClick,
  active,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col p-2 items-center justify-center relative h-[193px]  w-[130px] bg-white rounded-[15px] cursor-pointer border hover:border-primary transition-all duraction-600",
        { "border border-primary": active },
        className,
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img src={ingredient.imageUrl} alt="ingredient" />
      <span className="text-xs mb-1">{ingredient.name}</span>
      <span className="font-bold">{ingredient.price} ₽</span>
    </div>
  );
};
