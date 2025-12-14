"use client"
import {useEffect, useState} from "react";
import HomeCard from "./homeCard";

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
    const name = props.name;

    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth < 850) {
                setItemsToShow(2);
            } else if (window.innerWidth < 1100){
                setItemsToShow(3);
            }else{
                setItemsToShow(4);
            }
        };

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);
        
        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    useEffect(() => {
        if(mI === 0){
            setArrowL("invisible theme5 font-bold Bigger rounded-full text-2xl min-[1100px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1100px]:w-[75px] min-[1100px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px]");
        } else {
            setArrowL("theme5 font-bold Bigger rounded-full text-2xl min-[1100px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1100px]:w-[75px] min-[1100px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px] opacity-90");
        }
        if(mI >= cArray.length - itemsToShow){
            setArrowR("opacity-0 pointer-events-none theme5 font-bold Bigger rounded-full  text-2xl min-[1100px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1100px]:w-[75px] min-[1100px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px]");
        } else {
            setArrowR("theme5 font-bold Bigger rounded-full text-2xl min-[1100px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1100px]:w-[75px] min-[1100px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px] opacity-90");
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
        <div>
            <div className="grid grid-flow-col place-content-center place-items-center">
                <div className="block custom-500:hidden"><button onClick={PrevF} className="theme5 Bigger rounded-full font-bold text-2xl ml-4 min-[1100px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1100px]:w-[75px] min-[1100px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px]" >{"<"}</button></div>
                <div className="text-center text-3xl font-extrabold p-4">{name}</div>
                <div className="block custom-500:hidden"><button onClick={NextF} className="theme5 Bigger rounded-full font-bold text-2xl mr-4 min-[1100px]:text-4xl min-[1300px]:text-5xl w-[50px] h-[50px] min-[1100px]:w-[75px] min-[1100px]:h-[75px] min-[1300px]:w-[100px] min-[1300px]:h-[100px]">{">"}</button></div>
            </div>
            <div className="Slider mx-auto gap-[20px] w-[350px] min-[550px]:w-[420px] min-[850px]:w-[650px] min-[1100px]:w-[900px] min-[1300px]:w-[1200px] px-4 pb-2">         
                <div className="grid grid-flow-col place-self-center place-content-center place-items-center gap-4">
                    <button className={`${arrowL} hidden custom-500:block`} onClick={PrevF}>{"<"}</button>
                    <div className="grid grid-cols-2 min-[850px]:grid-cols-3 min-[1100px]:grid-cols-4 gap-4 w-[350px] min-[550px]:w-[420px] min-[850px]:w-[650px] min-[1100px]:w-[850px] min-[1300px]:w-[1050px] min-[1500px]:w-[1300px]">
                        {cArray.slice(mI, mI + itemsToShow).map((item, index) => (
                            <div key={index} className={`${index >= itemsToShow ? "hidden" : "block"}`}>
                                {item}
                            </div>
                        ))}
                    </div>
                    <button className={`${arrowR} hidden custom-500:block`} onClick={NextF}>{">"}</button>
                </div>
            </div>
        </div>

    ) 
}