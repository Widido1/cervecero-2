"use client"
import { useEffect, useState } from "react";
import SearchAgain from "./searchAgain"; //importa el componente de busqueda
import ButtonF from "./buttonF";
import PageResults from "./pageResults";
import Link from "next/link";
import Cart from "./cart";
import CartButton from "./cartButton";
import { useCart } from "../hooks/usecart";
import Pie from "./pie";
import logo from "@/app/images/logo.png";
import Image from "next/image";

export default function SearchResults(props){
    const allProducts = props.products; //arreglo que contiene todos los productos, de acá se sacan los resultados
    const searchW = props.word; //palabra de busqueda
    const [newSearchW, setNewSearchW] = useState("default"); //nuevo valor de busqueda
    const [results, setResults] = useState([...allProducts]); //resultados de la busqueda
    const [cantidadR, setCantidadR] = useState("default"); //cantidad de resultados

    //Carrito
    const {cart} = useCart();
    const [displayCart, setDisplayCart] = useState(false); //estado del carrito, si esta abierto o cerrado
    
    //Filtros de busqueda
    const [orden, setOrden] = useState("Relevancia"); //orden de los productos
    const [cervezaTipo, setCervezaTipo] = useState("default"); //Tipo de cerveza
    const [ingredienteTipo, setIngredienteTipo] = useState("default"); //tipo de ingrediente
    const [tipoElemento, setTipoElemento] = useState("default"); //tipo de elemento
    const [producto, setProducto] = useState("default"); //libros y revistas


    const purgeSearch = (word) => {
        let purged = word.toLowerCase(); //pasa la palabra de busqueda a minisculas, para que las mayusculas no entorpezcan la busqueda
        let borrar = /%20/; // crea un regEx /%2/ para reemplazar ese valor por un espacio tradicional
        if(borrar.test(purged)){
            purged = purged.split("%20").join(" "); //separa el string cada vez que hay un 2% formando un arreglo, luego lo vuelve a unir entre " " con join()
        }
        return purged
    }
    
    const findResults = (purged) => {
        const findW = new RegExp(purged); //construlle un RegEx usando la palabra de la busqueda purgada para evitar errores
        const results = allProducts.reduce((res, x) => { //construye un arreglo filtrando los productos que tienen un nombre que coincide con el regEx
            if(findW.test(x.name.toLowerCase())){ //testea con los nombres en minuscula, se comparan minusculas con minusculas, y eso deja de ser un problema
                res.push(x)
            } 
            return res
        }, [],);
        console.log("Resultados de la busqueda: " + results); //muestra los resultados de la busqueda en la consola
        return results //devuelve el arreglo de productos que coinciden con la busqueda
    }

    useEffect(()=>{
        const purged = purgeSearch(searchW); //purgueSearch se encarga de purgar la palabra de busqueda para evitar errores como 2% o mayusculas
        setResults(findResults(purged)); //arma el arreglo con los resultados de la busqueda
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if(searchW === "empty"){
            setCantidadR(allProducts.length); //si la palabra de busqueda es vacia, se le asigna el valor de "empty" para que no haya errores
            setNewSearchW(purged); //actualiza el valor de la nueva busqueda
        }else if(searchW === "Maltas"){setResults(results.filter(x => x.type === "Malta")); setCantidadR(results.length); setNewSearchW("Maltas");
        }else if(searchW === "Levaduras"){setResults(results.filter(x => x.type === "Levadura")); setCantidadR(results.length); setNewSearchW("Levaduras");
        }else if(searchW === "Lupulos"){setResults(results.filter(x => x.type === "Lupulo")); setCantidadR(results.length); setNewSearchW("Lupulos");
        }else if(searchW === "Kits"){setResults(results.filter(x => x.productType === "Kit")); setCantidadR(results.length); setNewSearchW("Kits");
        }else if(searchW === "Equipamiento"){setResults(results.filter(x => x.productType === "Insumo")); setCantidadR(results.length); setNewSearchW("Equipamiento");
        }else{
            setCantidadR(results.length); //si la palabra de busqueda no es vacia, se le asigna el valor de la cantidad de resultados
            setNewSearchW(purged); //actualiza el valor de la nueva busqueda
        } //si la palabra de busqueda es vacia, se le asigna el valor de "empty" para que no haya errores
        
    },[])

    useEffect(() => {
    
    let filtered = [...allProducts];

    // Apply search term filter
    if (newSearchW !== "" && newSearchW !== "default" && newSearchW !== "empty") {
        //Filtros de CirculoCategorias
        if(newSearchW === "Maltas"){filtered = allProducts.filter(x => x.type === "Malta"); setIngredienteTipo("Malta");
        }else if(newSearchW === "Levaduras"){filtered = allProducts.filter(x => x.type === "Levadura"); setIngredienteTipo("Levadura");
        }else if(newSearchW === "Lupulos"){filtered = allProducts.filter(x => x.type === "Lupulo"); setIngredienteTipo("Lupulo");
        }else if(newSearchW === "Kits"){filtered = allProducts.filter(x => x.productType === "Kit"); setProducto("Kit");
        }else if(newSearchW === "Equipamiento"){filtered = allProducts.filter(x => x.productType === "Insumo"); setProducto("Insumo");
        //================================================
        }else{
            const purged = purgeSearch(newSearchW);
            filtered = findResults(purged); //solo purgamos acá, porque en la base de datos las categorías están en mayusculas.
        }
    }

    // Apply other filters
    if (producto !== "default") filtered = filtered.filter(x => x.productType === producto);
    if (cervezaTipo !== "default") filtered = filtered.filter(x => x.productType === "Cerveza" && x.type === cervezaTipo);
    if (ingredienteTipo !== "default") { filtered = filtered.filter(x => x.type === ingredienteTipo)};
    if (tipoElemento !== "default") { filtered = filtered.filter(x => x.type === tipoElemento)};
    //if (cervezaCapacidad !== "default") filtered = filtered.filter(x => x.productType === "Cerveza" && x.quantity === cervezaCapacidad);
    //if (precioCerveza !== "default" ) {
    //    switch (precioCerveza) {
    //       case "-4000":
    //           filtered = filtered.filter(x => x.price < 4000 && x.productType === "Cerveza");
    //           break;
    //       case "4000-7000":
    //           filtered = filtered.filter(x => x.price >= 4000 && x.price <= 7000 && x.productType === "Cerveza");
    //            break;
    //        case "+7000":
    //            filtered = filtered.filter(x => x.price > 7000 && x.productType === "Cerveza");
    //            break;
    //        default:
    //            break;
    //    }
    //}

    if(orden === "Relevancia"){
        filtered = filtered.sort((a, b) => b.priority - a.priority); // Ordena por prioridad
    } else if (orden === "Mayor") {
        filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (orden === "Menor") {
        filtered = filtered.sort((a, b) => a.price - b.price);
    }

    setResults(filtered);
    setCantidadR(filtered.length); // Update count

    }, [newSearchW, producto, cervezaTipo, ingredienteTipo, tipoElemento, orden, allProducts]);

 //cuando se cambia el valor de results, se ejecuta el useEffect

    return(
        <div>
            <div className="w-full grid theme2 fixed top-0 z-25 min-w-[600px] overflow-hidden">
                <div className="grid grid-flow-col mx-2 min-[550px]:mx-auto min-[1000px]:grid-cols-3 place-self-start place-content-start min-[1000px]:place-content-center text-center place-items-start min-[1000px]:place-items-center h-[80px] px-2 font-bold text-4xl w-[500px] min-[650px]:w-[650px] min-[800px]:w-[800px] min-[1000px]:w-[1100px] min-[1400px]:w-[1400px] gap-4 pt-4 min-[1000px]:pt-1">
                    {/* Otro Navbar, este necesita un buscador diferente <Link href="/talleres/"><h1 className="TextShine Bigger">Talleres</h1></Link> para que no se recarge la pagina al buscar en la misma */}
                    <div>
                        <Image
                            src={logo}
                            alt="no image"
                            width={400}
                            height={400}
                            className="mx-auto w-[60px] h-[50px]"
                        />
                    </div>
                    <div className="grid grid-flow-row place-content-center place items-center gap-2">
                        <div className="grid grid-flow-col place-content-center place-self-center place-items-center align-middle">
                            <SearchAgain set={setNewSearchW}/>
                        </div>
                    </div>
                    <div>
                        <CartButton setDisplay={setDisplayCart} display={displayCart} cart={cart}/>
                    </div>           
                </div>
                <div className="grid grid-flow-col theme4 w-full gap-8 min-[550px]:gap-8 place-self-start min-[550px]:place-self-center place-content-start min-[550px]:place-content-center place-items-start text-center text-xl">
                    <div className="grid grid-flow-col w-[340px] min-[550px]:w-[500px] gap-8 place-self-start min-[550px]:place-self-center place-content-center place-items-start text-center text-lg min-[550px]:text-xl py-2 pl-6">
                        <Link href="/"><h1 className="TextShine Bigger">Inicio</h1></Link>
                        <Link href="/search/empty"><h1 className="TextShine Bigger">Productos</h1></Link>
                        <Link href="/about"><h1 className="TextShine Bigger">Sobre Nosotros</h1></Link>
                    </div>
                </div>


            </div>

            <div className="grid grid-flow-col place-self-start min-[650px]:place-self-center place-content-center place-items-center pt-[130px]">
                {/* Barra de filtros / listado de productos / carrito (cuando se activa) */}
                <div className="grid grid-flow-col place-self-center place-content-start p-2 gap-2">
                    <div className="grid grid-flow-row place-self-start text-left pt-2 gap-4 w-[130px] min-[550px]:w-[180px] min-[750px]:w-[275px] min-[1200px]:w-[300px] min-[1400px]:w-[350px]">
                        <div className="text-lg min-[1200px]:text-xl min-[1400px]:text-2xl min-[1700px]:text-3xl font-extrabold">Filtros de Busqueda</div>
                        <div>
                            <ButtonF head={true} set={setProducto} global={producto} value={"Cerveza"} text={"Cervezas"} setSearch={setNewSearchW}/>
                            <div className="grid grid-flow-row place-self-start place-content-start place-items-start">
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"Amber"} text={"Amber"} setSearch={setNewSearchW}/>
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"APA"} text={"APA"} setSearch={setNewSearchW}/>
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"Blonde"} text={"Blonde"} setSearch={setNewSearchW}/>
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"Golden"} text={"Golden"} setSearch={setNewSearchW}/>
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"Honey"} text={"Honey"} setSearch={setNewSearchW}/>
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"IPA"} text={"IPA"} setSearch={setNewSearchW}/>
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"Porter"} text={"Porter"} setSearch={setNewSearchW}/>
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"Red"} text={"Red"} setSearch={setNewSearchW}/>
                                <ButtonF set={setCervezaTipo} global={cervezaTipo} value={"Stout"} text={"Stout"} setSearch={setNewSearchW}/>
                            </div>
                        </div>
                        <div>
                            <ButtonF head={true} set={setProducto} global={producto} value={"Ingrediente"} text={"Materias Primas"} setSearch={setNewSearchW}/>
                            <div className="grid grid-flow-row place-content-start place-items-start">
                                <ButtonF set={setIngredienteTipo} global={ingredienteTipo} value={"Lupulo"} text={"Lúpulo"} setSearch={setNewSearchW}/>
                                <ButtonF set={setIngredienteTipo} global={ingredienteTipo} value={"Malta"} text={"Maltas"} setSearch={setNewSearchW}/>
                                <ButtonF set={setIngredienteTipo} global={ingredienteTipo} value={"Levadura"} text={"Levaduras"} setSearch={setNewSearchW}/>
                                <ButtonF set={setIngredienteTipo} global={ingredienteTipo} value={"Ingrediente"} text={"Otros Ingredientes"} setSearch={setNewSearchW}/>
                            </div> 
                        </div>
                        <div>
                            <ButtonF head={true} set={setProducto} global={producto} value={"Insumo"} text={"Equipamiento"} setSearch={setNewSearchW} />
                            <div className="grid grid-flow-row place-content-start place-items-start">
                                <ButtonF set={setTipoElemento} global={tipoElemento} value={"Instrumento"} text={"Medición"} setSearch={setNewSearchW}/>
                                <ButtonF set={setTipoElemento} global={tipoElemento} value={"Envase"} text={"Envases y Tapas"} setSearch={setNewSearchW}/>
                                <ButtonF set={setTipoElemento} global={tipoElemento} value={"Limpieza"} text={"Limpieza"} setSearch={setNewSearchW}/>
                                <ButtonF set={setTipoElemento} global={tipoElemento} value={"Pala"} text={"Palas de Madera"} setSearch={setNewSearchW}/>
                                <ButtonF set={setTipoElemento} global={tipoElemento} value={"Elemento"} text={"Otros Elementos"} setSearch={setNewSearchW}/>
                            </div>
                        </div>
                        <div><ButtonF head={true} set={setProducto} global={producto} value={"Kit"} text={"Kits de Elaboración"} setSearch={setNewSearchW}/></div>
                        <div><ButtonF head={true} set={setProducto} global={producto} value={"Otro"} text={"Otros"} setSearch={setNewSearchW}/></div>
                    </div>
                    

                    <div className="grid place-content-start w-[220px] min-[550px]:w-[320px] min-[650px]:w-[440px] min-[1100px]:w-[800px] min-[1500px]:w-[1100px] min-[1700px]:w-[1200px]">
                        <div className="grid grid-flow-row min-[650px]:grid-flow-col pb-4">
                            <div className="grid font-bold text-sm min-[650px]:text-base min-[900px]:text-lg pl-2">{cantidadR} productos encontrados</div>
                            <select className="grid place-self-start min-[650px]:place-self-end theme6 p-2 w-full min-[650px]:w-[80%] min-[1050px]:w-[50%]" value={orden} onChange={(e) => setOrden(e.target.value)}>
                                <option value="Relevancia">Relevancia</option>
                                <option value="Mayor">Mayor a menor precio</option>
                                <option value="Menor">Menor a mayor precio</option>
                            </select>
                        </div>
                        <div>
                            <PageResults items={results} PerPage={8}/>
                        </div>
                    </div>  
                </div>
                <Cart active={displayCart} setActive={setDisplayCart}/>
            </div>
            <Pie/>
        </div>

    );
}