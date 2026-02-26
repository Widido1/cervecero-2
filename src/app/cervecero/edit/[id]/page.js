import ProductForm from "@/app/components/productForm";
import { prisma } from "@/app/libs/prisma";

export default async function NewProduct({params}){
    const { id: productId } = await params;
        
    const product = await prisma.product.findFirst({
        where: {
          id: productId  // Cambiar params.id por productId
        }
    });

    return (
        <div>
            <ProductForm value="Edit" product={product}/>
        </div>
    )
}