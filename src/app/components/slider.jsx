"use client"
import {useEffect, useState} from "react";
import HomeCard from "./homeCard";
import left_arrow from "@/app/images/left_arrow.webp";
 function makeArr(objArr){
    const arr = objArr.map((x,i) => (
        <HomeCard key={i} id={x.id} name={x.name} img={x.imageUrl} des={x.description} price={x.price}/>
        /*acá usamos ProductBox, pero en este lugar va el componente del arreglo de componentes (en este caso objArr es un arreglo de varios Productbox)*/
    ));
    return arr
}

export default function Slider(props){
    const cArray = makeArr(props.items); //creamos el arreglo de componentes usando el arreglo de las props
    const [mI, setMI] = useState(0); //creamos el indice maestro del slider
    const [itemsToShow, setItemsToShow] = useState(4);
    const [arrowL, setArrowL] = useState("");
    const [arrowR, setArrowR] = useState("");

    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth < 1150) {
                setItemsToShow(3);
            } else {
                setItemsToShow(4);
            }
        };

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);
        
        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    useEffect(() => {
        if(mI === 0){
            setArrowL("invisible theme6 Bigger rounded-full text-2xl min-[1150px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1150px]:w-[75px] min-[1150px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px]");
        } else {
            setArrowL("theme6 Bigger rounded-full text-2xl min-[1150px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1150px]:w-[75px] min-[1150px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px] opacity-90");
        }
        if(mI >= cArray.length - itemsToShow){
            setArrowR("opacity-0 pointer-events-none theme6 Bigger rounded-full text-2xl min-[1150px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1150px]:w-[75px] min-[1150px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px]");
        } else {
            setArrowR("theme6 Bigger rounded-full text-2xl min-[1150px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1150px]:w-[75px] min-[1150px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px] opacity-90");
        }
    }, [mI, itemsToShow, cArray.length]);

    const detI = (index) => {
        const length = cArray.length;
        if (index >= length) return index % length;
        if (index < 0) return length + (index % length);
        return index;
    }

    //const NextF = () => setMI(detI(mI + itemsToShow));
    //const PrevF = () => setMI(detI(mI - itemsToShow));
    const NextF = () => {
        let N = itemsToShow;
        console.log("N cumple y es: "+ N);
        while (N > 0 && mI + N >= cArray.length - (itemsToShow - 1)) {
            N -= 1; // Reduce N by perPage until it is within bounds
        }
        if(N > 0){
            setMI(mI + N); // le suma 3 a mI y utiliza detI para determinar que mI no se salga de los limites del arreglo
            //al modificar el mI cambian todos los componentes que se muestran en el slider
        }
    }
    const PrevF = () => {
        let N = itemsToShow;
        console.log("N cumple y es: "+ N);
        while (N > 0 && mI - N < 0) {
            N -= 1; // Reduce N by perPage until it is within bounds
        }
        if(N > 0){
            setMI(mI - N); // le resta 3 a mI y utiliza detI para determinar que mI no se salga de los limites del arreglo
        }
    }
    

    return(
        <div className="Slider mx-auto gap-[20px] min-w-[250px] min-[400px]:w-[400px] min-[650px]:w-[650px] lg:w-[900px] xl:w-[1200px] px-4 pb-2">         
            <div className="grid grid-flow-col place-self-center place-content-center place-items-center gap-4">
                <button className={arrowL} onClick={PrevF}>{"<"}</button>
                <div className="grid grid-cols-3 min-[1150px]:grid-cols-4 gap-4 w-[580px] min-[920px]:w-[650px] min-[1150px]:w-[850px] min-[1300px]:w-[1050px] min-[1500px]:w-[1300px]">
                    {cArray.slice(mI, mI + itemsToShow).map((item, index) => (
                        <div key={index} className={index >= 3 ? "hidden min-[1150px]:block" : "block"}>
                            {item}
                        </div>
                    ))}
                </div>
                <button className={arrowR} onClick={NextF}>{">"}</button>
            </div>

        </div>
    ) 
}