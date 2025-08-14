import { useEffect, useState } from "react";
import { useCart } from "../hooks/usecart";
import CartPages from "./cartPages";
import { createPreference } from "@/app/api"; // Importa la API si es necesario

export default function Cart(props){
    const active = props.active; //estado del carrito
    const [style, setStyle] = useState("hidden"); //estilo del carrito
    const {cart, clearCart} = useCart(); //hook para acceder al carrito
    const [costo, setCosto] = useState(0); //costo total del carrito
    const [direccion, setDireccion] = useState(""); //estado para la dirección
    const [postal, setPostal] = useState(0); //estado para el código postal
    const [total, setTotal] = useState(0); //estado para el total del carrito
    const [envio, setEnvio] = useState(false); //estado para el envío
    const [displayEnvio, setDisplayEnvio] = useState("hidden"); //estilo del carrito


    useEffect(() => {
        if(active === true){
            setStyle(`
                theme2 
                fixed 
                right-0 
                top-24 
                w-[700px] 
                h-[calc(100vh-90px)]
                grid 
                grid-rows-[auto_1fr_auto]
                overflow-hidden
            `);
        }else{
            setStyle("hidden");
        }
    }, [active]); //cuando el estado cambia, se cambia el estilo del carrito

    useEffect(() => {
        if(postal > 0){

            setCosto(200); //calcula el costo basado en el código postal
        }else{
            setCosto(0); //si no hay código postal, el costo es 0
        }
    }, [postal]); //cuando el carrito cambia, se actualiza el estado del carrito

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + costo); //calcula el total del carrito
    }, [costo, total, cart]); //cuando el carrito cambia, se actualiza el total del carrito

    useEffect(() => {
        if(envio === false){
            setPostal(0); //si el envío es local, el costo es 0
            setDisplayEnvio("hidden"); //oculta el campo de código postal      
        }else{
            setDisplayEnvio("grid grid-flow-row place-content-center place-self-center gap-4"); //muestra el campo de código postal     
        }
    },[envio]);

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + costo); //calcula el total del carrito
    }, []); //cuando el carrito cambia, se actualiza el total del carrito

    const handleCosto = event =>{
        const newValue = event.target.value;
        setPostal(newValue);
    }
    const handleDireccion = event =>{
        const newValue = event.target.value;
        setDireccion(newValue);
    }

    const handlePayment = async () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }try {
        const preferenceData = cart.map(item => ({
                id: item.id, // Asegúrate de que cada item tenga un ID único
                title: item.name,
                unit_price: item.price,
                quantity: item.quantity,
                currency_id: "ARS", // Ensure currency is specified
            }));
        
        if(costo > 0){
            preferenceData.push({
                id: "shipping_cost", // Un ID único para el costo de envío
                title: "Envío",
                description: `- Código Postal: ${postal},- Dirección de Envío: ${direccion}`,
                unit_price: costo,
                quantity: 1,
                currency_id: "ARS",
            });


        }
        console.log("Datos de la preferencia:", preferenceData);

        const initPoint = await createPreference(
            preferenceData          //metadata: {codigoPostal: postal, direccion: "Calle Falsa 123"}, // Puedes agregar más metadatos si es necesario        
        );
        console.log("Punto de inicio de pago:", initPoint);
        
        if (!initPoint) {
            throw new Error("No init_point returned from MercadoPago");
        }

        window.location.href = initPoint;

    } catch (error) {
        console.error("Error al crear la preferencia de pago:", error);
        alert("Error al procesar el pago. Por favor, inténtalo de nuevo.");
    }}

    return(
        <div className={style}>
            <div id="problem" className="w-full h-full grid grid-rows-[auto_minmax(0,1fr)] gap-4 min-w-0">
                <div className="w-full min-w-0 px-4"><h1 className="text-2xl font-bold mb-1 min-w-0">Productos en el carrito:</h1></div>
                <div className="w-full min-w-0 grid grid-rows-[1fr_auto] gap-4 min-h-0 overflow-y-auto">
                    <CartPages items={cart} PerPage={4}/>
                    {/*cart.map((product) => (
                        <CartCard product={product} key={product.id}/>
                    ))*/}
                    <div className="theme5 grid grid-rows-[auto_auto_1fr_auto] gap-4 p-4">
                        <div className="font-bold text-xl">Metodo de retiro: </div>
                        <div className="grid grid-flow-col grid-cols-2 place-content-center place-items-center gap-4">
                            <button onClick={() => {setEnvio(false)}}><div className="grid place-content-center Bigger theme2 rounded-md w-[300px] h-[45px] my-1 text-lg font-bold">Por Local</div></button>
                            <button onClick={() => {setEnvio(true)}}> <div className="grid place-content-center Bigger theme2 rounded-md w-[300px] h-[45px] my-1 text-lg font-bold">Envio a domicilio</div></button>
                        </div>
                        <div className={displayEnvio}>
                            <div className="grid grid-flow-col grid-cols-2 place-content-center place-items-center gap-4">
                                <div className="text-xl font-bold">Codigo Postal: <input className="theme1 rounded-md pl-2 w-[80px] h-[30px]" value={postal} onChange={handleCosto} /></div>
                                <div className="text-xl font-bold">Costo envío: {costo}$</div>
                            </div>    
                            <div className="text-xl font-bold">Direccion: <input className="theme1 rounded-md pl-2 w-[360px] h-[30px]" value={direccion} onChange={handleDireccion} /></div>
                        </div>
                        <div className="mt-auto">
                            <div><h1 className="text-xl font-bold">Total: {total}$</h1></div>
                            <div className="grid grid-flow-col grid-cols-2 place-content-center place-items-center gap-4">
                                <button className="theme3 BoxShine Bigger rounded-md w-[300px] h-[45px] my-1 text-lg font-bold" onClick={() => handlePayment()}>Completar Compra</button>
                                <button className="theme4 BoxShine Bigger rounded-md w-[300px] h-[45px] my-1 text-lg font-bold" onClick={() => clearCart()}>Vaciar Carrito</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}