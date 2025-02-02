"use-client";
import { ProductWithRelations } from "@/@types/prisma";
import { FC, useMemo, useState } from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingredients-item";
import { Button } from "../ui";
import { mapPizzaSize, mapPizzaType } from "@/shared/constants/pizza";
import { cn } from "@/lib/utils";

type PizzaType = 20 | 30 | 40;

interface ChoosePizzaContent {
  product: ProductWithRelations;
  className?: string
}

export const ChoosePizzaContent: FC<ChoosePizzaContent> = ({ product, className }) => {
  const [size, setSize] = useState<PizzaType>(20);
  const [type, setType] = useState<number>(1);

  const [selectedIngredients, setSelectedIngredients] = useState<
    typeof product.ingredients
  >([]);

  const upperFirstChar = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const allSizes = product.items.map((item) => ({
    name: upperFirstChar(mapPizzaSize[Number(item.size) as keyof typeof mapPizzaSize]),
    value: String(item.size),
    disabled: false,
  }));

  const allTypes = product.items.map((item) => ({
    name: upperFirstChar(mapPizzaType[Number(item.pizzaType) as keyof typeof  mapPizzaType]),
    value: String(item.pizzaType),
    disabled: false,
  }));

  const pizzaTextDetails = `${size} см, ${mapPizzaType[Number(type) as keyof typeof mapPizzaType]} пицца`;

  const availabledSizes = allSizes.filter(
    (size, index, self) =>
      index === self.findIndex((t) => t.value === size.value),
  );
  const availableTypes = allTypes.filter(
    (size, index, self) =>
      index == self.findIndex((t) => t.value === size.value),
  );

  const changeSelectedIngredients = (
    ingredient: (typeof product.ingredients)[0],
  ) => {
    setSelectedIngredients((prevIngredients) => {
      const isInclude = prevIngredients.some(
        (selectedIngredient) => selectedIngredient.id === ingredient.id,
      );

      if (isInclude) {
        return prevIngredients.filter(
          (selectedIngredient) => selectedIngredient.id !== ingredient.id,
        );
      } else {
        return [...prevIngredients, ingredient];
      }
    });
  };

  const countTotalPrice = () => {
    const sumOfIngredient = selectedIngredients.reduce(
      (sum, priceOfIng) => sum + priceOfIng.price,
      0,
    );
    const priceOfSelectedPizza =
      product.items.find(
        (pizza) => pizza.pizzaType === type && pizza.size === size,
      )?.price ?? 0;

    return sumOfIngredient + priceOfSelectedPizza;
  };

  const totalPrice = useMemo(
    () => countTotalPrice(),
    [selectedIngredients, product, type, size],
  );

  return (
    <div className={cn("flex bg-white rounded-lg", className)}>
      <PizzaImage size={size} imageUrl={product.imageUrl} />
      <div className=" flex-1 bg-[#f7f6f5] rounded-r-lg">
        <div className="flex flex-col my-2 px-20">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />
          <p className="text-gray-400">{pizzaTextDetails}</p>
          <div className="flex flex-1 flex-col gap-3 my-1">
            <GroupVariants
              value={String(size)}
              items={availabledSizes}
              onClick={(value) => setSize(Number(value) as PizzaType)}
            />
            <GroupVariants
              value={String(type)}
              items={availableTypes}
              onClick={(value) => setType(Number(value) as PizzaType)}
            />
          </div>

          <div className="flex flex-col h-[234px] min-[1700px]:h-[435px] overflow-auto scrollbar mb-2">
            <Title
              text={"Добавить по вкусу"}
              size="sm"
              className="font-extrabold mb-1"
            />
            <div className="grid grid-cols-3 gap-3">
              {product.ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  ingredient={ingredient}
                  onClick={() => changeSelectedIngredients(ingredient)}
                  active={
                    !!selectedIngredients.find(
                      (ingredientActive) =>
                        ingredientActive.id == ingredient.id,
                    )
                  }
                />
              ))}
            </div>
          </div>
          <Button>Добавить в корзину за {totalPrice}</Button>
        </div>
      </div>
    </div>
  );
};
