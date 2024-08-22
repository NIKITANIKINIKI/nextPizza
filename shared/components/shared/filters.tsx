import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Новинки" value="1" />
        <FilterCheckbox text="Старинки" value="2" />
      </div>

      <div className="flex flex-col gap-3 mt-3 border-y border-y-neutral-100 py-5">
        <p>Цены от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input
            type="number"
            placeholder="0"
            min={100}
            max={1000}
            defaultValue={0}
          />
        </div>
        <RangeSlider min={0} max={1000} step={10} />
      </div>
      <CheckboxFiltersGroup title='Ингридиенты' searchInputPlaceholder='Поиск' />
    </div>
  );
};
