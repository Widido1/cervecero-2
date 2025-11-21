"use client"
import { useEffect, useState } from "react";
import CartCard from "./cartCard";

export default function CartPages(props){
    const items = props.items;
    const [currentPage, setCurrentPage] = useState(1);
    const PerPage = props.PerPage; //items por pagina
    const currentItems = items.slice((currentPage - 1) * PerPage, currentPage * PerPage); //items actuales 
    const totalPages = Math.ceil(items.length / PerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1); //total de paginas

    useEffect(() => {
        // If current page is beyond the new total pages, go to last page
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
        // If items were empty and now we have some, go to first page
        else if (totalPages > 0 && currentPage < 1) {
            setCurrentPage(1);
        }
    }, [items.length, totalPages, currentPage]);
 
    return(
        <div className="grid grid-flow-row place-content-center w-full h-full py-4 overflow-hidden min-h-0">
            <div className="grid grid-flow-row place-content-center w-full h-full py-4 overflow-y-auto min-h-0">
                <div className="grid grid-flow-row place-content-start place-items-center gap-4 w-full h-full overflow-y-scroll">
                    {items.map((item) => (
                        <div key={item.id}><CartCard product={item}/></div>
                    ))}
                </div>
            </div>

        </div>
    )
}


/*
        <div className="grid grid-flow-row w-full h-[600px] px-4">
            <div className="grid grid-flow-row grid-rows-3 gap-4">
                {currentItems.map((item) => (
                    <div key={item.id} ><CartCard product={item}/></div>
                ))}
            </div>
            <div className="grid grid-flow-col place-content-center gap-4 pt-4">
                {pages.map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={
                        currentPage === page ? "rounded-md theme2 BoxShine w-[40px] h-[40px] text-2xl" : "rounded-md theme1 BoxShine w-[40px] h-[40px] text-2xl"
                    }>{page}</button>
                ))}
            </div>
        </div>

*/