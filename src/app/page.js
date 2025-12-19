import HomePage from "./components/homePage";
import { prisma } from "@/app/libs/prisma";

//xd
export const metadata = {
  title: "Inicio - La Boutique del Cervecero",
  description: "Bienvenido a La Boutique del Cervecero, tu tienda online de insumos, equipos y accesorios para elaborar cerveza artesanal. Descubre nuestra amplia gama de productos de alta calidad y comienza a crear tus propias cervezas en casa hoy mismo.",
}

async function loadProducts() {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Error loading products:", error);
    return []; // Devuelve un array vacío como fallback
  }
}


export default async function Home() {
  const items = await loadProducts();

  return (
    <div>
      <HomePage items={items}/>
    </div>
  )    
}
