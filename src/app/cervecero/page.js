import TableP from "../components/tableP";
import { prisma } from "../libs/prisma";

async function loadProducts() {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Error loading products:", error);
    return []; // Devuelve un array vacío como fallback
  }
}


export default async function TablePage() {
    const products = await loadProducts();

    return (
        <div>
            <TableP products={products}/>
        </div>
    )    
}