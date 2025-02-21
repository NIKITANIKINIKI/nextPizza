"use client";
import { FC } from "react";
import { Dialog, DialogContent } from "../../../ui";
import { useRouter } from "next/navigation";

import { ProductWithRelations } from "@/@types/prisma";
import { ProductContent } from "../../product-content";

interface ProductModalProps {
  product: ProductWithRelations;
}

export const ProductModal: FC<ProductModalProps> = ({ product }) => {
  const router = useRouter();

  return (
    <Dialog
      open={true}
      onOpenChange={() => router.back()}
      modal={true}
      defaultOpen={false}
    >
      <DialogContent
        className={
          "flex  justify-center max-w-[1300px] max-h-[750px] overflow-hidden border-none "
        }
      >
        <ProductContent product={product} />
      </DialogContent>
    </Dialog>
  );
};
