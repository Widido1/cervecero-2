"use client"
import {useState} from "react";

export default function PaginatorSlider(props){
    const cArray = props.items; //creamos el arreglo de componentes usando el arreglo de las props
    const setPage = props.setPage; //funcion para cambiar la pagina
    const page = props.page; //pagina actual
    const [mI, setMI] = useState(0); //creamos el indice maestro del slider
    const perPage = 5; //numero de componentes que se muestran por pagina

    const NextF = () => {
        let N = perPage;
        console.log("N cumple y es: "+ N);
        while (N > 0 && mI + N >= cArray.length - 4) {
            N -= 1; // Reduce N by perPage until it is within bounds
        }
        if(N > 0){
            setMI(mI + N); // le suma 3 a mI y utiliza detI para determinar que mI no se alga de los limites del arreglo
            //al modificar el mI cambian todos los componentes que se muestran en el slider
        }
    }
    const PrevF = () => {
        let N = perPage;
        console.log("N cumple y es: "+ N);
        while (N > 0 && mI - N < 0) {
            N -= 1; // Reduce N by perPage until it is within bounds
        }
        if(N > 0){
            setMI(mI - N); // le resta 3 a mI y utiliza detI para determinar que mI no se alga de los limites del arreglo
        }
    }
    const FirstF = () => {
        setMI(0);
    }
    const LastF = () => {
        setMI(cArray.length - perPage);
    }


    return(
        <div className="grid grid-flow-col place-self-center place-content-center place-items-center gap-4 mt-4">
            <button className="theme2 Bigger rounded-md text-3xl w-[50px] h-[50px]" onClick={FirstF}>{"|<"}</button>
            <button className="theme2 Bigger rounded-md text-3xl w-[50px] h-[50px]" onClick={PrevF}>{"<"}</button>
                <div>
                    <button onClick={() => setPage(cArray[mI])} className={
                        page === cArray[mI] ? "rounded-md theme2 BoxShine2 Bigger w-[40px] h-[40px] text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[40px] h-[40px] text-2xl"
                    }>{cArray[mI]}</button>
                </div>
                <div>
                    <button onClick={() => setPage(cArray[mI+1])} className={
                        page === cArray[mI+1] ? "rounded-md theme2 BoxShine2 Bigger w-[40px] h-[40px] text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[40px] h-[40px] text-2xl"
                    }>{cArray[mI+1]}</button>
                </div>
                <div>
                    <button onClick={() => setPage(cArray[mI+2])} className={
                        page === cArray[mI+2] ? "rounded-md theme2 BoxShine2 Bigger w-[40px] h-[40px] text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[40px] h-[40px] text-2xl"
                    }>{cArray[mI+2]}</button>
                </div>
                <div>
                    <button onClick={() => setPage(cArray[mI+3])} className={
                        page === cArray[mI+3] ? "rounded-md theme2 BoxShine2 Bigger w-[40px] h-[40px] text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[40px] h-[40px] text-2xl"
                    }>{cArray[mI+3]}</button>
                </div>
                <div>
                    <button onClick={() => setPage(cArray[mI+4])} className={
                        page === cArray[mI+4] ? "rounded-md theme2 BoxShine2 Bigger w-[40px] h-[40px] text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[40px] h-[40px] text-2xl"
                    }>{cArray[mI+4]}</button>
                </div>
                <button className="theme2 Bigger rounded-md text-3xl w-[50px] h-[50px]" onClick={NextF}>{">"}</button>
                <button className="theme2 Bigger rounded-md text-3xl w-[50px] h-[50px]" onClick={LastF}>{">|"}</button>
            </div>
    ) 
}