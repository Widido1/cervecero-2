

import SearchResults from "../../components/searchresults";
import { prisma } from "../../libs/prisma";

export async function generateMetadata() {
  return {
    title: `Resultados de búsqueda: - La Boutique del Cervecero`,
    description: `Encuentra los mejores productos de cerveza artesanal. Insumos, equipos y accesorios de calidad.`,
  }
}

async function loadProducts() {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Error loading products:", error);
    return []; // Devuelve un array vacío como fallback
  }
}

export default async function SearchPage({params}){
    const products = await loadProducts();
    const {value} = await params;
    //const products = [
    //   {id: 1, name: "Budweiser", marca: "Budweiser", img: "", description: "Budweiser lager de litro", precio: 350, estilo: "Lager", contenido: "1000"},
    //];
    
    return(
        <div>
            <SearchResults products={products} word={value}/>
        </div>
    )
    
} 