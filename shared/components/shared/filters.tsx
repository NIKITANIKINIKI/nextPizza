"use client";

import React, { useState } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients } from "@/shared/hooks/use-ingredients";
import { useSet } from "react-use";
import { pizzaSizes, pizzaTypes } from "@/shared/constants/pizza";
import { PriceProps, useFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {

  const { ingredients, isLoading, onAddId, selectedIds } = useIngredients();

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  });

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaType, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices({
      ...prices,
      [name]: value,
    });
  };

  useFilters({ selectedIds, prices, sizes, pizzaType });

  const items = ingredients.map((el) => ({
    name: String(el.name),
    value: String(el.id),
  }));

  return (
    <div className={className}>
      <Title text="Фильтрация" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaType}
        items={pizzaTypes}
      />
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={pizzaSizes}
      />

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
