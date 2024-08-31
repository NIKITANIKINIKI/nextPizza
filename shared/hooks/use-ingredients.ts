import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

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
  };
};
