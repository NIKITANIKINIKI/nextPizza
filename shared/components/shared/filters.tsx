"use client";

import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients } from "@/shared/hooks/use-ingredients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter } from "next/navigation"; // важно!

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, isLoading, onAddId, selectedIds } = useIngredients();
  const router = useRouter();

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  });

  // const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  // const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
  //   new Set<string>([]),
  // );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices({
      ...prices,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   const filters = {
  //     ...prices,
  //     pizzaTypes: Array.from(pizzaTypes),
  //     sizes: Array.from(sizes),
  //     ingredients: Array.from(selectedIds),
  //   };

  //   const query = qs.stringify(filters, { arrayFormat: "comma" });

  //   router.push(`?${query}`, { scroll: false });
  // }, [sizes, pizzaTypes, prices, selectedIds]);

  console.log(selectedIds);

  const items = ingredients.map((el) => ({
    value: String(el.id),
    text: String(el.name),
  }));

  return (
    <div className={className}>
      <Title text="Фильтрация" className="mb-5 font-bold" />

      {/* <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1'},
          { text: 'Традиционное', value: '2'},
        ]}
      />
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      /> */}

      <div className="flex flex-col gap-3 mt-3 border-y border-y-neutral-100 py-5">
        <p>Цены от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
            value={String(prices.priceFrom)}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0 && value <= 1000) {
                updatePrice("priceFrom", value);
              }
            }}
          />
          <Input
            type="number"
            placeholder="0"
            min={100}
            max={1000}
            defaultValue={0}
            value={String(prices.priceTo)}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0 && value <= 1000) {
                updatePrice("priceTo", value);
              }
            }}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([from, to]) =>
            setPrices({ priceFrom: from, priceTo: to })
          }
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        searchInputPlaceholder="Введите ингридиент"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        isLoading={isLoading}
        onClickCheckbox={onAddId}
        selected={selectedIds}
      />
    </div>
  );
};
