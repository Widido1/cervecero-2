import { useEffect, useState } from "react";
import { useCart } from "../hooks/usecart";
import CartPages from "./cartPages";
import { createPreference } from "@/app/api"; // Importa la API si es necesario
import { sendEmail } from "@/app/actions/sendEmail";

const EMAIL = process.env.NEXT_PUBLIC_EMAIL;

export default function Cart(props){
    const {active, setActive} = props; //estado del carrito
    const [style, setStyle] = useState("hidden"); //estilo del carrito
    const {cart} = useCart(); //hook para acceder al carrito
    const [costo, setCosto] = useState(0); //costo total del carrito
    const [direccion, setDireccion] = useState(""); //estado para la dirección
    const [otraLoc, setOtraLoc] = useState(""); //estado para la localidad
    const [localidad, setLocalidad] = useState(""); //estado para la localidad
    const [total, setTotal] = useState(0); //estado para el total del carrito
    const [envio, setEnvio] = useState(false); //estado para el envío
    const [displayEnvio, setDisplayEnvio] = useState("hidden"); //estilo del carrito
    const [envioB1, setEnvioB1] = useState("theme3 grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold");
    const [envioB2, setEnvioB2] = useState("theme5 CBShine grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold border border-[2px] border-[var(--color1)]");
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); //calculo del total de items en el carrito

    //solicitud de compra
    const [nombreSol, setNombreSol] = useState("");
    const [telefonoSol, setTelefonoSol] = useState("");
    const [emailSol, setEmailSol] = useState("");


    useEffect(() => {
        if(active === true){
            setStyle(` 
                fixed 
                right-0 
                top-0 
                min-[700px]:w-[700px]
                w-[350px] 
                h-screen
                theme5
                z-50
                grid 
                grid-flow-row
                grid-flow-rows-[auto_1fr_auto]
            `);
        }else{
            setStyle("hidden");
        }
    }, [active]); //cuando el estado cambia, se cambia el estilo del carrito

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + costo); //calcula el total del carrito
    }, [costo, total, cart]); //cuando el carrito cambia, se actualiza el total del carrito

    useEffect(() => {
        if(otraLoc === "Ciudad de Santa Fe"){
            setCosto(5);
        }else{
            setCosto(0);
        }
    }, [otraLoc]);

    useEffect(() => {
        if(envio === false){
            setCosto(0);
            setDisplayEnvio("hidden"); //oculta el campo de código postal
            setEnvioB1("theme3 grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold");
            setEnvioB2("theme5 CBShine grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold border-[2px] border-[var(--color1)]");
        }else{
            setDisplayEnvio("grid"); //muestra el campo de código postal
            setEnvioB1("theme5 CBShine grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold border-[2px] border-[var(--color1)]");
            setEnvioB2("theme3 grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold");
        }
    },[envio]);

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + costo); //calcula el total del carrito
    }, []); //cuando el carrito cambia, se actualiza el total del carrito

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
                description: `- Ciudad de Santa Fe ,- Dirección de Envío: ${direccion}`,
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

    const handleSolicitud = async () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }try{
        let texto = `
        ¡Hola! Se ha realizado una nueva solicitud de compra para tu tienda:
        Productos solicitados:
        ${cart.map(item => `\t- ${item.name} (Cantidad: ${item.quantity})`).join("\n")}
        Total de la compra: ${total}$

        Información del comprador:
        Nombre: ${nombreSol}
        Localidad: ${localidad}
        Dirección: ${direccion}
        Teléfono: ${telefonoSol}
        Email del comprador: ${emailSol}
        `;


        const paymentEmail = { 
            email: `${EMAIL}`,
            text: texto
        };
        console.log("Datos del email de solicitud:", paymentEmail);
        await sendEmail(paymentEmail);

    }catch(error){
        console.error("Error al crear la preferencia de pago:", error);
        alert("Error al enviar la solicitud de compra. Por favor, inténtalo de nuevo.");
    }
    }

    return(
        <div className={style}>
            <div id="problem" className="w-full grid grid-flow-row grid-rows-[auto_minmax(0,1fr)] place-content-start place-items-start min-w-0 overflow-y-auto">
                <div className="w-full h-[60px] theme2 grid grid-flow-col place-self-center place-content-evenly place-items-center">
                    <div></div>
                    <h1 className="text-2xl font-bold mb-1 min-w-0">Mi Compra</h1>
                    <button className="grid" onClick={() => setActive(!active)}>X Cerrar</button>
                </div>
                <div className="w-full theme1 min-w-0 grid grid-rows-[1fr_auto] gap-4 min-h-0 overflow-y-auto">
                    <div className="grid place-self-center w-[95%] text-lg min-[700px]:text-xl font-bold px-8 py-2 min-[700px]:py-4 border-b-2">{totalItems} productos dentro del carrito</div>
                    <CartPages items={cart} PerPage={4}/>
                    {/*cart.map((product) => (
                        <CartCard product={product} key={product.id}/>
                    ))*/}
                    <div className="theme5">
                        <div className="grid grid-rows-[auto_auto_1fr_auto] place-self-center place-content-center place-items-center py-4 w-[350px] min-[700px]:w-[700px]">    
                            <div className="grid grid-flow-row min-[700px]:grid-flow-col place-content-center place-items-center">
                                <button onClick={() => {setEnvio(false)}}><div className={envioB1}>Por Local</div></button>
                                <button onClick={() => {setEnvio(true)}}> <div className={envioB2}>Envio a domicilio</div></button>
                            </div>
                            {
                                envio === false ? (
                                    <div className="theme3 grid grid-flow-row min-[700px]:grid-flow-col place-content-center rounded-md w-[300px] min-[700px]:w-[600px] h-[55px] min-[700px]:h-[45px] gap-0 min-[700px]:gap-2 my-1 text-lg font-bold"> <div>Retirar en Av. Gral. Paz 7826, </div><div>Santa Fe</div> </div>
                                ) : (
                                    <div>
                                        <select className="theme3 grid place-content-center rounded-md w-[300px] min-[700px]:w-[600px] h-[45px] pl-2 my-1 text-lg font-bold" value={otraLoc} onChange={(e) => setOtraLoc(e.target.value)}>
                                            <option value={""} disabled>Seleccione su localidad</option>
                                            <option value={"Ciudad de Santa Fe"} >Ciudad de Santa Fe</option>
                                            <option value={"Otra"} >Otra localidad</option>
                                        </select>
                                    </div>
                                )
                            }
                            {
                                otraLoc === "Otra" ? (
                                    <div className={displayEnvio}>
                                        <div className="grid grid-flow-row place-content-center rounded-md w-full text-lg font-bold">
                                            <input className="theme5 grid hoverborder rounded-md pl-2 w-full h-[45px] border-b-[2px] border-[var(--color1)]" placeholder="Ingrese su localidad..." value={localidad} onChange={(e) => setLocalidad(e.target.value)} />
                                            <div className="grid grid-flow-row min-[700px]:grid-cols-3 gap-2 min-[700px]:gap-5 pt-2">
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={nombreSol} onChange={(e) => setNombreSol(e.target.value)} placeholder="Ingrese su Nombre..."/></div>
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={telefonoSol} onChange={(e) => setTelefonoSol(e.target.value)} placeholder="Ingrese su Telefono..."/></div>
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={emailSol} onChange={(e) => setEmailSol(e.target.value)} placeholder="Ingrese su Email..."/></div>
                                            </div>
                                        </div>
                                    </div>

                                ) : (
                                    <div className={displayEnvio}>
                                        <div className="grid text-lg font-bold"><input className="grid theme5 hoverborder rounded-md pl-2 w-[300px] min-[700px]:w-[600px] h-[45px] border-b-[2px] border-[var(--color1)]" placeholder="Direccion de Envío..." value={direccion} onChange={handleDireccion} /></div>                      
                                    </div>
                                )
                            }
                            <div className="grid grid-flow-row w-full place-items-center gap-2 pt-2 min-[700px]:pt-4">
                                    {
                                        otraLoc === "Otra" ? (
                                            <div className="grid grid-flow-row w-full">
                                                <div className="grid grid-cols-[1fr_auto] w-full">
                                                    <h1 className="text-2xl font-bold justify-self-start">TOTAL:</h1> <h1 className="text-2xl font-bold justify-self-end">{total}$</h1>
                                                </div>
                                                <button className="theme3 BiggerMini BoxShine textcolor rounded-md w-[300px] min-[700px]:w-[600px] h-[45px] my-1 text-lg font-bold" onClick={() => handleSolicitud()}>Solicitar Compra</button>
                                            </div>
                                        ) : (           
                                            <div className="grid grid-flow-row w-full gap-2">
                                                <div className={displayEnvio}>
                                                    <div className="grid grid-cols-[1fr_auto] w-full items-center pt-2">
                                                        <h1 className="text-base font-semibold justify-self-start">Envío:</h1> <h1 className="text-base font-semibold justify-self-end">{costo}$</h1>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-[1fr_auto] w-full items-center">
                                                    <h1 className="text-2xl font-bold justify-self-start">TOTAL:</h1> <h1 className="text-2xl font-bold justify-self-end">{total}$</h1>
                                                </div>
                                                <div className="grid">
                                                    <button className="theme3 BiggerMini BoxShine textcolor rounded-md w-[300px] min-[700px]:w-[600px] h-[45px] my-1 text-lg font-bold" onClick={() => handlePayment()}>Completar Compra</button>
                                                </div>
                                                

                                            </div>
                                        )
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

//necesitamos una variable que detecte si es en santa fe o en otro lugar
//