"use client"
import {useEffect, useState} from "react";
import HomeCard from "./homeCard";


 //ruta de la imagen que se va a mostrar en el slider
 //
 //

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

    const detI = (index) => {
        const length = cArray.length;
        if (index >= length) return index % length;
        if (index < 0) return length + (index % length);
        return index;
    }

    const NextF = () => setMI(detI(mI + itemsToShow));
    const PrevF = () => setMI(detI(mI - itemsToShow));

    return(
        <div className="Slider mx-auto mt-8 gap-[20px] w-[250px] min-[400px]:w-[400px] min-[650px]:w-[650px] lg:w-[900px] xl:w-[1200px] px-4 pb-2">         
            <div className="grid grid-flow-col place-self-center place-content-center place-items-center gap-4">
                <button className="theme6 Bigger rounded-full text-5xl w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] xl:w-[100px] xl:h-[100px] opacity-90" onClick={PrevF}>{"<"}</button>
                <div className="grid grid-cols-3 min-[1150px]:grid-cols-4 gap-4 w-[580px] min-[920px]:w-[650px] min-[1150px]:w-[850px] min-[1300px]:w-[1050px] min-[1500px]:w-[1300px]">
                    {cArray.slice(mI, mI + itemsToShow).map((item, index) => (
                        <div key={index} className={index >= 3 ? "hidden min-[1150px]:block" : "block"}>
                            {item}
                        </div>
                    ))}
                </div>
                <button className="theme6 Bigger rounded-full text-5xl w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] xl:w-[100px] xl:h-[100px] opacity-90" onClick={NextF}>{">"}</button>
            </div>

        </div>
    ) 
}