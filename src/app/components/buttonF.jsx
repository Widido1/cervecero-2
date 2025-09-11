import {useEffect, useState } from "react";

export default function ButtonF(props){
    const [status, setStatus] = useState(false); //status del boton
    const text = props.text; //texto del boton
    const value = props.value; //valor del boton //variable que va a contener el render del boton
    const set = props.set; //set del boton //funcion que va a cambiar el valor del boton
    const global = props.global; //valor global del boton
    const [visual, setVisual] = useState("grid grid-flow-col place-items-center text-left theme1 cursor-pointer TextShine3 text-base min-[1400px]:text-lg min-[1700px]:text-xl"); //estado visual del boton
    const head = props.head; //si es un boton principal o secundario
    const resetSearch = props.setSearch; //funcion para resetear la busqueda
    const [cBox, setCBox] = useState("invisible-checkbox")

    useEffect(() => {
        if(global !== value){
            setStatus(false); //si el valor global es diferente al valor del boton, se cambia el estado del boton
        }else{
            setStatus(true);
        }
    }, []) //cuando el valor global cambia, se cambia el estado del boton

    useEffect(() => {
        if(global !== value){
            setStatus(false); //si el valor global es diferente al valor del boton, se cambia el estado del boton
        }else{
            setStatus(true);
        }
    }, [global]) //cuando el valor global cambia, se cambia el estado del boton

    useEffect(() => {
        if(status === true){
            if(head === true){
                setVisual("grid text-left Subrayado cursor-pointer font-bold text-xl min-[1700px]:text-2xl");
                set(value);
            }else{
                set(value);
                setVisual("grid grid-flow-col text-left gap-2 place-items-center theme1 cursor-pointer rounded-md text-base min-[1400px]:text-lg min-[1700px]:text-xl");
                setCBox("custom-checkbox");
            }
        }else{
            if(head === true){
                setVisual("grid theme1 cursor-pointer text-left TextShine3 font-bold text-lg min-[1400px]:text-xl min-[1700px]:text-2xl");
                set("default");
            }else{
                set("default");
                setVisual("grid grid-flow-col text-left gap-2 place-items-center theme1 cursor-pointer TextShine3 text-base min-[1400px]:text-lg min-[1700px]:text-xl");
                setCBox("invisible-checkbox");
            }
        }
    }, [status]) //cuando el estado cambia, se cambia el valor del boton




    return(
        <button className={visual} onClick={()=> {setStatus(!status); resetSearch("")} }> <input type="checkbox" checked readOnly className={cBox}/> <p>{text}</p></button>
    )
}