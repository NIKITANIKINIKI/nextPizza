import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams{
    query?: string;
    sortBy?: string
    sizes?: string;
    pizzaType?: string;
    selectedIds?: string;
    priceFrom?: string;
    priceTo?: string;
}


export const findPizza= async (searchParams: GetSearchParams) =>{

    const {  sizes, pizzaType, selectedIds, priceFrom, priceTo } = searchParams

    const sizesArray=sizes?.split(',').map(Number)
    const ingredientsArray=selectedIds?.split(',').map(Number)
    const pizzaTypesArray=pizzaType?.split(',').map(Number)

    const categories = await prisma.category.findMany({
        include: {
          products: {
            where:{
                ingredients: ingredientsArray ? {
                    some:{
                        id:{
                            in: ingredientsArray
                        }
                    }
                } : undefined,
                items:{
                    some:{
                        size:{
                            in: sizesArray
                        },
                        pizzaType:{
                            in:pizzaTypesArray
                        },
                        price:{
                            gte: Number(priceFrom ?? 1000),
                            lte: Number(priceTo ?? 0),
                        }
                    }
                }
            },
            include: {
                ingredients: true, 
                items: {
                  where: {
                    price: {
                      gte: Number(priceFrom ?? 1000),
                      lte: Number(priceTo ?? 0),
                    },
                  },
                  orderBy: {
                    price: 'asc',
                  },
                },
              },
          },
        },
      });

    return categories

}