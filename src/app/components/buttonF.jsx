import {useEffect, useState } from "react";

export default function ButtonF(props){
    const [status, setStatus] = useState(false); //status del boton
    const text = props.text; //texto del boton
    const value = props.value; //valor del boton //variable que va a contener el render del boton
    const set = props.set; //set del boton //funcion que va a cambiar el valor del boton
    const global = props.global; //valor global del boton
    const [visual, setVisual] = useState("theme1 TextShine3 Bigger text-base min-[1400px]:text-lg min-[1700px]:text-xl"); //estado visual del boton
    const head = props.head; //si es un boton principal o secundario
    const resetSearch = props.setSearch; //funcion para resetear la busqueda

    useEffect(() => {
        if(status === true){
            if(head === true){
                setVisual("theme2 px-2 py-1 rounded-md font-bold text-xl min-[1700px]:text-2xl");
                set(value);
            }else{
            set(value);
            setVisual("theme2 px-2 py-1 rounded-md text-base min-[1400px]:text-lg min-[1700px]:text-xl");
            }
        }else{
            if(head === true){
                setVisual("theme1 TextShine3 font-bold text-lg min-[1400px]:text-xl min-[1700px]:text-2xl");
                set("default");
            }else{
            set("default");
            setVisual("theme1 TextShine3 Bigger text-base min-[1400px]:text-lg min-[1700px]:text-xl");
            }
        }
    }, [status]) //cuando el estado cambia, se cambia el valor del boton

    useEffect(() => {
        if(global !== value){
            setStatus(false); //si el valor global es diferente al valor del boton, se cambia el estado del boton
        }
    }, [global]) //cuando el valor global cambia, se cambia el estado del boton


    return(
        <div className={visual}>
            <button onClick={()=> {setStatus(!status); resetSearch("")} }>{text}</button>
        </div>
    )
}