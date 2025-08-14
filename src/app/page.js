"use server"
import HomePage from "./components/homePage";
import { prisma } from "@/app/libs/prisma";


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
