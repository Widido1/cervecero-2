"use server"

import SearchResults from "../components/searchresults"
import { prisma } from "../libs/prisma";


async function loadProducts() {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Error loading products:", error);
    return []; // Devuelve un array vacío como fallback
  }
}

export default async function SearchPage({params}){
    //const products = await loadProducts();
    const {value} = await params;
    const products = await loadProducts();
    //const products = [
    //    {id: 1, name: "Budweiser", marca: "Budweiser", img: "", description: "Budweiser lager de litro", precio: 100, estilo: "Lager", contenido: "1000"},
    //];
    
    return(
        <div>
            <SearchResults products={products} word={value}/>
        </div>
    )
} 