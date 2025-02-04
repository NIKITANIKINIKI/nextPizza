"use client";
import { FC } from "react";
import { Dialog, DialogContent } from "../../ui";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { ProductWithRelations } from "@/@types/prisma";
import { ProductContent } from "../product-content";

interface ProductModalProps {
  className?: string;
  product: ProductWithRelations;
}

export const ProductModal: FC<ProductModalProps> = ({ className, product }) => {
  const router = useRouter();

  return (
    <Dialog
      open={true}
      onOpenChange={() => router.back()}
      modal={true}
      defaultOpen={false}
    >
      <DialogContent
        className={cn(
          "flex  justify-center max-w-[1300px] max-h-[750px] overflow-hidden border-none  ",
          className,
        )}
      >
        <ProductContent product={product} />
      </DialogContent>
    </Dialog>
  );
};
