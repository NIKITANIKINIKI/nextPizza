"use client";
import { cn } from "@/lib/utils";
import { useAnchorStore } from "@/store/anchor";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
  className?: string;
  categories: Category[];
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
  const { currentCategoryId, setCategoryId } = useCategoryStore();

  const { setAnchor } = useAnchorStore();

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => {
            setCategoryId(category.id), setAnchor(category.name);
          }}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            currentCategoryId == category.id &&
              "bg-white shadow-md shadow-gray-200 text-primary",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
