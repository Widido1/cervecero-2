import SinglePage from "@/app/components/singlePage";
import { prisma } from "@/app/libs/prisma";

export async function generateMetadata({ params }) {
  // SOLO AGREGAR ESTA LÍNEA
  const { id: productId } = await params;
  
  const product = await prisma.product.findFirst({
    where: { id: productId },  // Cambiar params.id por productId
    select: { name: true, description: true }
  });

  return {
    title: product ? `${product.name} - La Boutique del Cervecero` : "Producto No Encontrado",
    description: product?.description || "Producto para cerveza artesanal"
  }
}

export default async function ProductPage({ params }){
  // SOLO AGREGAR ESTA LÍNEA
  const { id: productId } = await params;
    
  const product = await prisma.product.findFirst({
    where: {
      id: productId  // Cambiar params.id por productId
    }
  });

  const items = await prisma.product.findMany({
    where: {
      type: product.type,
      stock: { gt: 0 }
    },
    orderBy: { 
      priority: 'desc' 
    }
  });

  if(items.length < 8){
    const itemsNeeded = 8 - items.length;
    let moreItems = [];
    for(let i = 0; i < itemsNeeded; i++){
      const randomItem = await prisma.product.findFirst({
        where: {
          productType: product.productType,
          stock: { gt: 0 },
          NOT: { id: product.id }
        }
      });
      moreItems.push(randomItem);
    }
    moreItems = moreItems.sort((a, b) => b.priority - a.priority);
    items.push(...moreItems);
  }

  return(
    <div>
      <SinglePage product={product} items={items}/>
    </div>
  );
}

/*
    const purgeWord = (word) => {
        try {
            // Decodificar primero cualquier caracter codificado en URL
            let purged = decodeURIComponent(word);
            
            // Luego limpiar el texto
            purged = purged.toUpperCase()
                        .normalize("NFD")
                        .replace(/\p{Diacritic}/gu, "")
                        .trim();
            
            return purged;
        } catch (e) {
            // En caso de error en decodificación, usar método original
            return word.toUpperCase()
                    .normalize("NFD")
                    .replace(/\p{Diacritic}/gu, "")
                    .trim();
        }
    }


*/