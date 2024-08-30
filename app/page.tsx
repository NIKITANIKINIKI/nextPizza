import { prisma } from "@/prisma/prisma-client";
import { Container } from "@/shared/components/shared/container";
import { Filters } from "@/shared/components/shared/filters";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { Title } from "@/shared/components/shared/title";
import { TopBar } from "@/shared/components/shared/top-bar";
// import { GET } from "./api/products/search/route";



export default async  function Home() {


  return (
    <>
      <Container className=" mt-10 ">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar/>
      
      <Container className="mt-5">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div>
            <div className="flex-1">
              {/* <div>
              {pizzas.map(
                (pizza) =>
                  pizza.length > 0 && (
                    <ProductsGroupList
                      key={pizza.id}
                      title={pizza.name}
                      categoryId={pizza.id}
                      items={pizza.products}
                    />
                  ),
              )}
              </div> */}
            </div>
          </div>
        </div>

      </Container>

      
    </>
  );
}
