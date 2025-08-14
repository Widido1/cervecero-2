"use client"
import {useState} from "react";
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

    const detI = (I) => {
        //esta funcion garantiza que el IndiceMaestro (mI) no se pase de los limites del arreglo
        let i = I; 
        const L = cArray.length;
        if(i >= L){i = i - L};
        if(i < 0){i = L + i}; 
        return(i);
    }

    const NextF = () => {
        setMI(detI((mI + 4), cArray.length)); // le suma 3 a mI y utiliza detI para determinar que mI no se alga de los limites del arreglo
        //al modificar el mI cambian todos los componentes que se muestran en el slider
    }

    const PrevF = () => {
        setMI(detI((mI - 4), cArray.length));// le resta 3 a mI y utiliza detI para determinar que mI no se alga de los limites del arreglo
    }

    return(
        <div className="Slider mx-auto mt-8 gap-[20px] w-[250px] min-[400px]:w-[400px] min-[650px]:w-[650px] lg:w-[900px] xl:w-[1200px] px-4 pb-2">         
            <div className="grid grid-flow-col place-self-center place-content-center place-items-center gap-4">
                <button className="theme6 Bigger rounded-full text-5xl w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] xl:w-[100px] xl:h-[100px] opacity-90" onClick={PrevF}>{"<"}</button>
                <div>{cArray[detI(mI)]} </div>
                <div>{cArray[detI(mI+1)]} </div>
                <div>{cArray[detI(mI+2)]} </div>
                <div>{cArray[detI(mI+3)]} </div>
                <button className="theme6 Bigger rounded-full text-5xl w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] xl:w-[100px] xl:h-[100px] opacity-90" onClick={NextF}>{">"}</button>
            </div>

        </div>
    ) 
}