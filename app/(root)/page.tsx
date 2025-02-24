import { findPizza, GetSearchParams } from "@/lib/find-pizza";
import { prisma } from "@/prisma/prisma-client";
import { Container } from "@/shared/components/shared/container";
import { Filters } from "@/shared/components/shared/filters";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { Title } from "@/shared/components/shared/title";
import { TopBar } from "@/shared/components/shared/top-bar";
import { Suspense } from "react";
// import { GET } from "./api/products/search/route";

export default async function Home({searchParams}: {searchParams: GetSearchParams }) {

  const categories=await findPizza(searchParams)

  return (
    <>
      <Container className=" mt-5 ">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0,
        )}
      />
      <Container className="mt-5 mb-6">
        <div className="flex gap-[60px]">
          <div className="w-[350px]">
            <Suspense>
            <Filters />
            </Suspense>
          </div>
          <div>
            <div className="flex-1 flex flex-col gap-16">
                {categories.map(
                  (category) =>
                    category.products.length > 0 && (
                      <ProductsGroupList
                        key={category.id}
                        title={category.name}
                        categoryId={category.id}
                        items={category.products}
                      />
                    ),
                )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
