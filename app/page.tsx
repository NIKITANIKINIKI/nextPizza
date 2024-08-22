import { Container } from "@/shared/components/shared/container";
import { Filters } from "@/shared/components/shared/filters";
import { Title } from "@/shared/components/shared/title";
import { TopBar } from "@/shared/components/shared/top-bar";

export default function Home() {
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
              <div>
                Список товаров
              </div>
            </div>
          </div>
        </div>

      </Container>

      
    </>
  );
}
