import { prisma } from "@/prisma/prisma-client";
import { Container } from "@/shared/components/shared/container";
import { ProductContent } from "@/shared/components/shared/product-content";
import { Card } from "@/shared/components/ui/card";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });
  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex items-center justify-center mt-20">
      <Card className="flex ">
        <ProductContent product={product} />
      </Card>
    </Container>
  );
}
