"use client"
import {useEffect, useState} from "react";

export default function PaginatorSlider(props){
    const cArray = props.items; //creamos el arreglo de componentes usando el arreglo de las props
    const setPage = props.setPage; //funcion para cambiar la pagina
    const page = props.page; //pagina actual
    const [mI, setMI] = useState(0); //creamos el indice maestro del slider
    const perPage = 5; //numero de componentes que se muestran por pagina
    const [arrowL, setArrowL] = useState("");
    const [arrowR, setArrowR] = useState("");
    const [arrowFirst, setArrowFirst] = useState("");
    const [arrowLast, setArrowLast] = useState("");

    const NextF = () => {
        // Verifica que no nos salgamos del límite del array
        if (mI + 1 < cArray.length) {
            if(page > 2 && page < cArray.length - 2){
                setMI(mI + 1);
            }
            setPage(page + 1);
        }
    }

    const PrevF = () => {
        // Verifica que no vayamos a un índice negativo
        if (mI >= 0) {
            if(page > 3 && page < cArray.length - 1){
                setMI(mI - 1);
            }
            setPage(page - 1);
        }
    }

    const FirstF = () => {
        setMI(0);
        setPage(1);
    }
    const LastF = () => {
        setPage(cArray.length);
        if(cArray.length - perPage > 0){
            setMI(cArray.length - perPage);
        } else {
            setMI(0);
        }
    }

    const ClickBtn = (num) => {
        setPage(num);
        // Si hay 5 o menos páginas, siempre mostrar desde la primera
        if (cArray.length <= perPage) {
            setMI(0);
            return;
        }

        if (num > 3 && num < cArray.length - 2) {
        setMI(num - 3);
        }else if (num <= 3) {
        setMI(0);
        }else if (num >= cArray.length - 2) {
        setMI(cArray.length - perPage);
        }
    };

    useEffect(() => {
        if(page === 1){
            setArrowL("opacity-0 pointer-events-none theme2 Bigger rounded-md w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl");
            setArrowFirst("opacity-0 pointer-events-none max-[550px]:invisible theme2 Bigger rounded-md w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl");
        } else {
            setArrowL("theme2 Bigger rounded-md w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl");
            setArrowFirst("max-[550px]:invisible theme2 Bigger rounded-md w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl");
        }
        if(page >= cArray.length){
            setArrowR("opacity-0 pointer-events-none theme2 Bigger rounded-md w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl");
            setArrowLast("opacity-0 pointer-events-none max-[550px]:invisible theme2 Bigger rounded-md w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl");
        } else {
            setArrowR("theme2 Bigger rounded-md w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl");
            setArrowLast("max-[550px]:invisible theme2 Bigger rounded-md w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl");
        }
    }, [page, mI, cArray.length]);

    useEffect(() => {
        // Resetea el índice maestro y la página cuando el arreglo de componentes cambia
        setMI(0);
        setPage(1);
    }, [cArray.length]);


    return(
        <div className="grid grid-flow-col place-self-center place-content-center place-items-center gap-1 min-[550px]:gap-2 min-[1100px]:gap-4 mt-4">
            <button className={arrowFirst} onClick={FirstF}>{"|<"}</button>
            <button className={arrowL} onClick={PrevF}>{"<"}</button>
                <div>
                    <button onClick={() => ClickBtn(cArray[mI])} className={
                        mI < cArray.length && (
                        page === cArray[mI] ? "rounded-md theme2 BoxShine2 Bigger w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl"
                        ) || "invisible"
                    }>{cArray[mI]}</button>
                </div>
                <div>
                    <button onClick={() => ClickBtn(cArray[mI+1])} className={
                        mI+1 < cArray.length && (
                        page === cArray[mI+1] ? "rounded-md theme2 BoxShine2 Bigger w-[25px] min-[650px]::w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl"
                        ) || "invisible"
                    }>{cArray[mI+1]}</button>
                </div>
                <div>
                    <button onClick={() => ClickBtn(cArray[mI+2])} className={
                        mI+2 < cArray.length && (
                        page === cArray[mI+2] ? "rounded-md theme2 BoxShine2 Bigger w-[25px] min-[650px]::w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl"
                        ) || "invisible"
                    }>{cArray[mI+2]}</button>
                </div>
                <div>
                    <button onClick={() => ClickBtn(cArray[mI+3])} className={
                        mI+3 < cArray.length && (
                        page === cArray[mI+3] ? "rounded-md theme2 BoxShine2 Bigger w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl"
                        ) || "invisible"
                    }>{cArray[mI+3]}</button>
                </div>
                <div>
                    <button onClick={() => ClickBtn(cArray[mI+4])} className={
                        mI+4 < cArray.length && (
                            page === cArray[mI+4] ? "rounded-md theme2 BoxShine2 Bigger w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl" : "rounded-md theme1 BoxShine2 Bigger w-[25px] min-[650px]:w-[30px] min-[1100px]:w-[40px] h-[25px] min-[650px]:h-[30px] min-[1100px]:h-[40px] text-sm min-[650px]:text-xl min-[1100px]:text-2xl"
                        ) || "invisible"
                        
                    }>{cArray[mI+4]}</button>
                </div>
                <button className={arrowR} onClick={NextF}>{">"}</button>
                <button className={arrowLast} onClick={LastF}>{">|"}</button>
            </div>
    ) 
}

//Paginador viejo (salta toda la seccion de paginas en vez de 1 a 1)
/*
    const NextF = () => {
        let N = perPage;
        console.log("N cumple y es: "+ N);
        while (N > 0 && mI + N >= cArray.length - 4) {
            N -= 1; // Reduce N by perPage until it is within bounds
        }
        if(N > 0){
            setMI(mI + N); // le suma 3 a mI y utiliza detI para determinar que mI no se salga de los limites del arreglo
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
            setMI(mI - N); // le resta 3 a mI y utiliza detI para determinar que mI no se salga de los limites del arreglo
        }
    }
*/