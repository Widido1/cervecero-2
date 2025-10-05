"use client"
import { useState } from "react";
import search_icon from "@/app/images/search_icon.png"; // Assuming you have a search icon image
import Image from "next/image";

export default function SearchAgain(props){
    const [searchW, setSearchW] = useState("");

    const change = event =>{
        const newValue = event.target.value;
        setSearchW(newValue);
    }

    const search = () =>{
        props.set(searchW); // Usa searchW directamente en lugar de newSearchW
        setSearchW(searchW); // Actualiza newSearchW para consistencia interna
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevenir comportamiento por defecto
            search(); // Ejecutar la búsqueda
        }
    }

    return(
        <div className="grid grid-flow-col place-self-center place-content-center">
            <input value={searchW} onChange={change} onKeyDown={handleKeyDown} className="rounded-md theme6
              w-[200px] min-[550px]:w-[300px] min-[650px]:w-[450px] min-[850px]:w-[600px] 
              h-[40px] min-[290px]:h-[40px] px-2 min-[550px]:px-8 text-sm min-[550px]:text-lg" placeholder="Buscar maltas, lúpulos y más..."/>
            <button onClick={search} className="rounded-md theme1 place-self-end cursor-pointer absolute w-[40px] h-[40px] text-2xl ">
                <Image
                    src={search_icon}
                    alt="Facebook Icon"
                    width={20}
                    height={20}
                    className="grid place-self-center"
                />
            </button>
        </div>
    )
}

//cuando buscas con este botón, esta barra puede hacer dos cosas:
//1. Puede devolver de alguna manera el nuevo valor de busqueda SearchW a la funcion madre, de esta manera, la funcion madre puede usar esta palabra y
//el arreglo de filtros para filtrar los productos y mostrarlos en la pagina. Creo que para esto voy a necesitar un setNewSearchW, que lo tiene que pasar como props la
//funcion madre, tambien la funcion madre tiene que tener un useEffect con una variable newResults, que se va a modificar cada vez que se modifique el valor de newSearchW
//aquí es donde se utilizaría AllProducts y se filtrarían los resultados utilizando la nueva palabra de busqueda y el arreglo de filtros, el resultado va a utilizar setResults
//lo que va a triggerear el useEffect de la funcion SearchResults, que va a mostrar los resultados filtrados.

//Nuevo codigo a agregar: 
//En searchAgain.jsx, en el button agregar un onClick que utilize setNewSearchW.
//En searchresults.jsx, agregar un useEffect que escuche el nuevo valor de newSearchW y lo utilice para filtrar los resultados utilizando el arreglo de filtros y allProducts.