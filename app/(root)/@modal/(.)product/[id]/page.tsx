import { prisma } from "@/prisma/prisma-client";
import { ProductModal } from "@/shared/components/shared";
import { notFound } from "next/navigation";



export default async function ProductModalPage({params:{id}}: {params: {id: string}}) {


    const product= await prisma.product.findFirst({
        where: {id: Number(id)},
        include: {
            ingredients: true,
            items: true,
        }
    })
    
    if(!product){
        return notFound()
    }


    return(
        <ProductModal product={product}/>
    )
    
}