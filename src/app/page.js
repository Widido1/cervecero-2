"use server"
import HomePage from "./components/homePage";
import { prisma } from "@/app/libs/prisma";


async function loadProducts(){
    const allProducts = await prisma.product.findMany();
    return allProducts;
}


export default async function Home() {
  const items = await loadProducts();

  return (
    <div>
      <HomePage items={items}/>
    </div>
  )    
}
