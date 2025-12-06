import {useEffect, useState } from "react";

export default function ButtonF(props){
    const [status, setStatus] = useState(false);
    const text = props.text;
    const value = props.value;
    const set = props.set;
    const global = props.global;  // Ahora es string: "Ingrediente", "default", etc.
    const filterType = props.filterType;
    const head = props.head;
    const resetSearch = props.setSearch;
    
    // Determinar si está activo
    useEffect(() => {
        // Si el valor global es igual al valor de este botón, está activo
        setStatus(global === value);
    }, [global, value]);  // Se actualiza cuando cambia global o value

    const handleClick = () => {
        const nuevoEstado = !status;
        setStatus(nuevoEstado);
        
        if (resetSearch) {
            resetSearch("");
        }
        
        if (filterType && set) {
            // Si está activándolo, pasa el value; si está desactivándolo, pasa "default"
            set(filterType, nuevoEstado ? value : "default");
        }
    };

    // Determinar clases visuales basadas en el estado
    const getVisualClasses = () => {
        if (head) {
            // EXACTAMENTE como en tu código original
            return status 
                ? "grid text-left Subrayado cursor-pointer font-bold text-xl min-[1700px]:text-2xl"
                : "grid theme1 cursor-pointer text-left TextShine3 font-bold text-lg min-[1400px]:text-xl min-[1700px]:text-2xl";
        } else {
            // EXACTAMENTE como en tu código original
            return status
                ? "grid grid-flow-col text-left gap-2 place-items-center theme1 cursor-pointer rounded-md text-base min-[1400px]:text-lg min-[1700px]:text-xl"
                : "grid grid-flow-col text-left gap-2 place-items-center theme1 cursor-pointer TextShine3 text-base min-[1400px]:text-lg min-[1700px]:text-xl";
        }
    };

    // Determinar clases del checkbox
    const getCheckboxClass = () => {
        // Si es botón principal (head), NO mostrar checkbox
        if (head) {
            return "invisible-checkbox";  // o podrías usar una clase que lo oculte completamente
        }
        // Si es subfiltro, usar la lógica normal
        return status ? "custom-checkbox" : "invisible-checkbox";
    };

    return(
        <button className={getVisualClasses()} onClick={handleClick}>
            <input 
                type="checkbox" 
                checked={status} 
                readOnly 
                className={getCheckboxClass()}
            />
            <p>{text}</p>
        </button>
    );
}

/*export default function ButtonF(props){
    const [status, setStatus] = useState(false); //status del boton
    const text = props.text; //texto del boton
    const value = props.value; //valor del boton //variable que va a contener el render del boton
    const set = props.set; //set del boton //funcion que va a cambiar el valor del boton
    const global = props.global; //valor global del boton
    const filterType = props.filterType; //tipo de filtro
    const [visual, setVisual] = useState("grid grid-flow-col place-items-center text-left theme1 cursor-pointer TextShine3 text-base min-[1400px]:text-lg min-[1700px]:text-xl"); //estado visual del boton
    const head = props.head; //si es un boton principal o secundario
    const resetSearch = props.setSearch; //funcion para resetear la busqueda
    const [cBox, setCBox] = useState("invisible-checkbox")

    useEffect(() => {
        // Si el valor global es igual al valor de este botón, está activo
        setStatus(global === value);
    }, [global, value]);  // Se actualiza cuando cambia global o value

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

    const filter = () => {
        const nuevoEstado = !status;
        setStatus(nuevoEstado);
        
        if (filterType) {
            // Usa la nueva función handleFilterChange
            set(filterType, nuevoEstado ? value : "default");
        }
    }


    return(
        <button className={visual} onClick={()=> {filter(); resetSearch("")} }> <input type="checkbox" checked readOnly className={cBox}/> <p>{text}</p></button>
    )
}
*/