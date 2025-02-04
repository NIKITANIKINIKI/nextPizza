"use client";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
  categories: Category[];
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
  const { currentCategoryId, setCategoryId } = useCategoryStore();

  const route=useRouter()

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map((category) => (
        <a
          key={category.id}
          onClick={() => setCategoryId(category.id)}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            currentCategoryId == category.id &&
              "bg-white shadow-md shadow-gray-200 text-primary",
          )}
          href={`/#${category.name}`}
        >
          <button onClick={() => route.push(`/#${category.name}`)}>{category.name}</button>
        </a>
      ))}
    </div>
  );
};
