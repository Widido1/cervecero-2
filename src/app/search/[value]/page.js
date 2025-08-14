"use server"


import SearchResults from "../../components/searchresults";
import { prisma } from "../../libs/prisma";


async function loadProducts(){
    const allProducts = await prisma.product.findMany();
    return allProducts;
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