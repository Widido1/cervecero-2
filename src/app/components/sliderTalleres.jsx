"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SliderTalleres(props){
    const items = props.items;
    const [mI, setMI] = useState(0);
    const detI = (I) => {
        //esta funcion garantiza que el IndiceMaestro (mI) no se pase de los limites del arreglo
        let i = I; 
        const L = items.length;
        if(i >= L){i = i - L};
        if(i < 0){i = L + i}; 
        return(i);
    }
    const NextF = () => {
        setMI(detI((mI + 1), items.length)); // le suma 3 a mI y utiliza detI para determinar que mI no se alga de los limites del arreglo
        //al modificar el mI cambian todos los componentes que se muestran en el slider
    }
    const PrevF = () => {
        setMI(detI((mI - 1), items.length));// le resta 3 a mI y utiliza detI para determinar que mI no se alga de los limites del arreglo
    }
    const name = items[mI].name;
    const img = items[mI].img;
    const description = items[mI].description;

    return(
        <div className="grid grid-flow-col place-self-center w-[900px] h-[700px] rounded-[20%] pt-8">         
            <Image 
                src={img}
                alt="imagen"
                width={1200}
                height={1200}
                className="mx-auto w-[900px] h-[700px] rounded-[20%]"
            />
            <div className="absolute grid grid-flow-col grid-cols-3 place-self-center place-content-center place-items-center w-[1200px] ">
                <div><button className="theme2 BoxShine3 TextShine Bigger grid place-content-center place-items-center align-middle text-3xl btn2 w-[90px] h-[90px] rounded-full" onClick={PrevF}>{"<"}</button></div>
                <div className="grid grid-flow-col place-self-center rounded-[10%] w-[600px] py-8 px-8 tallerCard text-center">
                    <div>
                        <Link href={`/`}>
                            <Image 
                                src={img}
                                alt="imagen"
                                width={200}
                                height={200}
                                className="bshine mx-auto w-[200px] h-[200px] rounded-[20%]"
                            />
                        </Link>
                    </div>
                    <div className="grid grid-flow-row place-content-center px-2">
                        <div className="shine text-2xl" ><Link href={`/`}>{name}</Link></div>
                        <div className="italic text-sm">{description}</div>
                    </div>
                </div>
                <div><button className="theme2 BoxShine3 TextShine Bigger grid place-content-center place-items-center align-middle text-3xl btn2 w-[90px] h-[90px] rounded-full" onClick={NextF}>{">"}</button></div>

            </div>
            
        </div>
    )
}