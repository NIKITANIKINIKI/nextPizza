"use client";

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  name: string;
  isLoading: boolean
}


export const CheckboxFiltersGroup: React.FC<Props> = ({
  className,
  title,
  limit = 5,
  searchInputPlaceholder,
  items
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState("");
  const list = isOpen
    ? items.filter((value) => value && value.text &&
        value.text.includes(searchValue.toLocaleLowerCase())
      )
    : items.slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={className}>
      <p className="py-3">{title}</p>
      {isOpen && (
        <div className="py-3">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((el, index) => (
          <FilterCheckbox key={index} text={el.text} value={el.value} />
        ))}
      </div>
      {list.length + 1 > limit && (
        <div className={isOpen ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary mt-3"
          >
            {isOpen ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
