"use client";

import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  isLoading?: boolean;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  className,
  title,
  limit = 5,
  searchInputPlaceholder,
  items,
  isLoading,
  onClickCheckbox,
  selected,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState("");
  const list = isOpen
    ? items.filter(
        (value) =>
          value &&
          value.name &&
          value.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : items.slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (isLoading) {
    return (
      <div>
        <p className="font-bold py-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="max-w h-6 mb-4 max-h-96 rounded-[8px]"
            />
          ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold py-3">{title}</p>
      {isOpen && (
        <div className="pb-3">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list &&
          list.map((el, index) => (
            <FilterCheckbox
              key={index}
              name={el.name}
              text={el.name}
              value={el.value}
              checked={selected?.has(String(el.value))}
              onCheckedChange={() => onClickCheckbox?.(String(el.value))}
            />
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
