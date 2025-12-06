"use client"
import { useEffect, useState } from "react";
import ProductCard from "./productcard";
import PaginatorSlider from "./paginatorSlider";

export default function PageResults(props){
    const items = props.items;
    const [currentPage, setCurrentPage] = useState(1);
    const PerPage = props.PerPage; //items por pagina
    const currentItems = items.slice((currentPage - 1) * PerPage, currentPage * PerPage); //items actuales
    //currentPage -1 es porque el slice empieza desde 0, pero para nosotros y para el usuario es la pagina 1.
    //el slice empieza desde currentPage - 1 (es decir, 0) * PerPage, y termina en currentPage * PerPage (es decir PerPage -1)
    //si el slice tomara 6 items, arranca y termina siempre 1 elemento menos, si fuese 1, arrancaría en 0 y terminaría en 5, es decir, los primeros 6 elementos.
    const totalPages = Math.ceil(items.length / PerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1); //total de paginas
    //misma logica que currentItems, pero para el paginador.

    useEffect(() => {
        // Este useEffect se asegura de que el currentPage y currentPaginator se ajusten cuando se caplican los filtros de busqueda
        // If current page is beyond the new total pages, go to last page
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
        // If items were empty and now we have some, go to first page
        else if (totalPages > 0 && currentPage < 1) {
            setCurrentPage(1);
        }
    }, [items.length, totalPages, currentPage]);

    useEffect(() => {
    // Resetear a la primera página cuando los resultados cambian
    setCurrentPage(1);
    }, [items]); // items es results en SearchResults

 
    return(
        <div>
        {items.length === 0 ? (
            <div className="flex justify-center items-center min-[1100px]:text-3xl text-center 
            min-w-[230px] min-[650px]:w-[800px] min-[1100px]:w-[1100px] h-96">
                No se encontraron resultados.<br/>
                Intente con otros filtros o palabras clave.
            </div>
        ):(
         <div className="flex flex-col min-w-[230px] max-[1100px]:h-[700px] overflow-hidden">
            {/* Contenedor de productos con scroll controlado */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 gap-4 justify-center justify-items-center justify-self-center min-[650px]:grid-cols-2 min-[1100px]:grid-cols-4 min-[1100px]:grid-rows-2">
                    {currentItems.map((item) => (
                        <div key={item.id} className="w-full">
                            <ProductCard 
                                id={item.id} 
                                name={item.name} 
                                img={item.imageUrl} 
                                des={item.description} 
                                price={item.price}
                            />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Paginador fijo */}
            <div className="flex-shrink-0 py-4 border-t">
                <div className="flex justify-center">
                    <PaginatorSlider items={pages} page={currentPage} setPage={setCurrentPage} />
                </div>
            </div>
        </div>
        )}
        </div>
        
    )
}

//si el paginador está x > 1, se muestra el botón anterior
//si el paginador está en x < lastpage, se muestra el botón siguiente
//si el paginador está en el último slot, el botón siguiente, el ... y la última pagina no se muestran
//si mas de 5, se muestra ... y la primera pagina
//si el paginador esta en x < lastpage - 5, se muestra el ... y la última pagina.



