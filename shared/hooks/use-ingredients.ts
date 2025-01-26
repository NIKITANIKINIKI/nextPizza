import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface ReturnIngredientsProps {
  ingredients: Ingredient[];
  isLoading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useIngredients = (): ReturnIngredientsProps => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  React.useEffect(() => {
    async function fetchIngeredients() {
      try {
        const res = await Api.ingredients.getAll();
        setIngredients(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIngeredients();
  }, []);

  return {
    ingredients,
    isLoading,
    onAddId: toggle,
    selectedIds,
  };
};
