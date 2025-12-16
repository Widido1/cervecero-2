import { useEffect, useState } from "react";
import { useCart } from "../hooks/usecart";
import CartPages from "./cartPages"; // Importa la API si es necesario
import { customerEmailSC } from "@/app/actions/customerEmailSC";
import { sendEmailSC } from "@/app/actions/sendEmailSC";
import { validateEmail } from "../functions/validateEmail";

const EMAIL = process.env.NEXT_PUBLIC_EMAIL;

export default function Cart(props){
    const {active, setActive} = props; //estado del carrito
    const [style, setStyle] = useState("hidden"); //estilo del carrito
    const {cart} = useCart(); //hook para acceder al carrito
    //const [costo, setCosto] = useState(0); //costo total del carrito
    //const [direccion, setDireccion] = useState(""); //estado para la dirección
    const [otraLoc, setOtraLoc] = useState(""); //estado para la localidad
    const [localidad, setLocalidad] = useState(""); //estado para la localidad
    const [total, setTotal] = useState(0); //estado para el total del carrito
    const [envio, setEnvio] = useState(false); //estado para el envío
    const [displayEnvio, setDisplayEnvio] = useState("hidden"); //estilo del carrito
    const [envioB1, setEnvioB1] = useState("theme3 grid place-content-center rounded-md w-full h-[45px] my-1 text-lg font-bold");
    const [envioB2, setEnvioB2] = useState("theme5 CBShine grid place-content-center rounded-md w-full h-[45px] my-1 text-lg font-bold border border-[2px] border-[var(--color1)]");
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); //calculo del total de items en el carrito

    //solicitud de compra
    const [nombreSol, setNombreSol] = useState("");
    const [telefonoSol, setTelefonoSol] = useState("");
    const [emailSol, setEmailSol] = useState("");

    const [solicitudEnviada, setSolicitudEnviada] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(5);


    useEffect(() => {
        if(active === true){
            setStyle(` 
                grid fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-50
            `);
        }else{
            setStyle("hidden");
        }
    }, [active]); //Aparece y desaparece el carrito, con todos sus estilos basicos

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)); //calcula el total del carrito + COSTO
    }, []); //construye el total del carrito al abrir el carrito

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)); //calcula el total del carrito + COSTO
    }, [total, cart]); //cuando el carrito cambia, se actualiza el total del carrito [, COSTO]

    useEffect(() => {
        if(otraLoc === "Ciudad de Santa Fe"){
            setLocalidad("Ciudad de Santa Fe");
            //setCosto(5);
        }else if(otraLoc === "Otra"){
            setLocalidad("");
            //setCosto(0);
        }else{
            //setCosto(0);
        }
    }, [otraLoc]); //Localidad, a veces automatica, a veces el cliente la debe especificar otraLoc es para el select, localidad es para el input y es el dato real

    useEffect(() => {
        if(envio === false){
            //setCosto(0);
            setDisplayEnvio("hidden"); //oculta el campo de código postal
            setEnvioB1("theme3 grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold");
            setEnvioB2("theme5 CBShine grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold border-[2px] border-[var(--color1)]");
            //setDireccion("Local");
            setLocalidad("Ciudad de Santa Fe");
            setOtraLoc("");
        }else{
            setLocalidad("");
            setDisplayEnvio("grid"); //muestra el campo de código postal
            setEnvioB1("theme5 CBShine grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold border-[2px] border-[var(--color1)]");
            setEnvioB2("theme3 grid place-content-center rounded-md w-[300px] h-[45px] my-1 text-lg font-bold");
            //setDireccion("");
        }
    },[envio]); //Envio y OtraLoc determinan que campos se muestran y cuales no, Envio ademas cambia los estilos de los botones

    useEffect(() => {
        if (solicitudEnviada && tiempoRestante > 0) {
            const timer = setTimeout(() => {
            setTiempoRestante(tiempoRestante - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (solicitudEnviada && tiempoRestante === 0) {
            // Redirigir a la página de inicio
            window.location.href = "/";
        }
    }, [solicitudEnviada, tiempoRestante]); //Cuenta regresiva para redirigir al home despues de enviar la solicitud
    
    /*
    const handleDireccion = event =>{
        const newValue = event.target.value;
        setDireccion(newValue);
    }
    */

    const handleSolicitud = async () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    } else if (localidad.trim() === "") {
        alert("Por favor, ingrese su localidad.");
        return;
    } else if (nombreSol.trim() === "") {
        alert("Por favor, su nombre.");
        return;
    }  else if (telefonoSol.trim() === "") {
        alert("Por favor, ingrese su teléfono.");
        return;
    } else if (emailSol.trim() === "") {
        alert("Por favor, ingrese su email.");
        return;
    } else if (!validateEmail(emailSol)) {
        alert("Por favor, ingrese un email válido.");
        return;
    }try{
        //Email para el vendedor
        let textoVendedor = `
        ¡Hola! Se ha realizado una nueva solicitud de compra para tu tienda:
        Productos solicitados:
        ${cart.map(item => `\t- ${item.name} (Cantidad: ${item.quantity})`).join("\n")}
        Total de la compra: ${total}$

        Información del comprador:
        Nombre: ${nombreSol}
        Localidad: ${localidad}
        Teléfono: ${telefonoSol}
        Email del comprador: ${emailSol}
        `;

        const emailVendedor = { 
            email: `${EMAIL}`,
            text: textoVendedor
        };
        console.log("Datos del email de solicitud:", emailVendedor.email);
        await sendEmailSC(emailVendedor);

        //Email para el cliente
        let textoCliente = `
        ¡Hola ${nombreSol}!
        Hemos recibido tu solicitud de compra con los siguientes detalles:
        Productos solicitados:
        ${cart.map(item => `\t- ${item.name} (Cantidad: ${item.quantity})`).join("\n")}
        Total del pedido: ${total}$

        Nos pondremos en contacto contigo pronto para confirmar los detalles de tu pedido.
        Gracias por elegirnos para tu compra.

        * Los precios son indicativos sujetos a variaciones sin previa notificación.
        * Los precios no incluyen el envío de mercaderia.
        * La venta está sujeta a disponibilidad de stock.
        * El envío del formulario "Solicitar Compra" no implica la compraventa del producto.

        Si tienes alguna pregunta, no dudes en contactarnos: ${EMAIL}
        ¡Gracias por elegir la Boutique del Cervecero!
        `;
        const emailCliente = { 
            email: emailSol,
            text: textoCliente
        };
        console.log("Datos del email al cliente:", emailCliente);
        await customerEmailSC(emailCliente);

        setSolicitudEnviada(true);
        setTiempoRestante(5);

    }catch(error){
        console.error("Error al crear la preferencia de pago:", error);
        alert("Error al enviar la solicitud de compra. Por favor, inténtalo de nuevo.");
    }
    }

    return(
        <div className={style} onClick={() => setActive(!active)}>
            <div className="fixed right-0 top-0 grid grid-flow-row grid-flow-rows-[auto_1fr_auto] h-screen theme2 z-50 w-[350px] min-[700px]:w-[700px]" onClick={(e) => e.stopPropagation()}>
                <div id="problem" className="w-full grid grid-rows-[auto_1fr] min-h-0">
                    <div className="w-full h-[60px] theme2 grid grid-cols-[1fr_auto_1fr] place-items-center px-4">
                        <div></div>
                        <h1 className="text-2xl font-bold mb-1 min-w-0">Mi Compra</h1>
                        <button className="grid cursor-pointer" onClick={() => setActive(!active)}>X Cerrar</button>
                    </div>
                    <div className="w-full theme1 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-0 min-h-0">
                        <div className="w-full text-lg pl-14 min-[700px]:text-xl font-bold px-4 py-3 min-[700px]:py-4 border-b-2 shrink-0">{totalItems} productos dentro del carrito</div>
                        <div className="min-h-0 overflow-hidden">
                            <CartPages items={cart} PerPage={4}/>
                        </div>
                        <div className="theme5">
                            <div className="grid grid-rows-[auto_auto_1fr_auto] place-self-center place-content-center place-items-center py-4 w-full box-border">    
                                <div className="grid grid-flow-row min-[700px]:grid-flow-col place-content-center place-items-center">
                                    <button onClick={() => {setEnvio(false)}}><div className={envioB1}>Retiro por local</div></button>
                                    <button onClick={() => {setEnvio(true)}}> <div className={envioB2}>Envio a domicilio</div></button>
                                </div>
                                {
                                    envio === false ? (
                                        <div className="w-full">
                                            <div className="theme3 grid grid-flow-row min-[700px]:grid-flow-col place-content-center rounded-md w-full h-[55px] min-[700px]:h-[45px] gap-0 min-[700px]:gap-2 my-1 text-lg font-bold"> <div>Retirar en Av. Gral. Paz 7826, </div><div>Santa Fe</div> </div>
                                            <div className="grid grid-flow-row place-content-center min-[700px]:grid-cols-3 gap-2 min-[700px]:gap-5 pt-2">
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={nombreSol} onChange={(e) => setNombreSol(e.target.value)} placeholder="Ingrese su Nombre..."/></div>
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={telefonoSol} onChange={(e) => setTelefonoSol(e.target.value)} placeholder="Ingrese su Telefono..."/></div>
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={emailSol} onChange={(e) => setEmailSol(e.target.value)} placeholder="Ingrese su Email..."/></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full">
                                            <select className="theme3 grid place-content-center rounded-md w-full h-[45px] pl-2 my-1 text-lg font-bold cursor-pointer" value={otraLoc} onChange={(e) => setOtraLoc(e.target.value)}>
                                                <option value={""} disabled className="cursor-pointer">Seleccione su localidad</option>
                                                <option value={"Ciudad de Santa Fe"} className="cursor-pointer">Ciudad de Santa Fe</option>
                                                <option value={"Otra"} className="cursor-pointer">Otra localidad</option>
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
                                            <div className="grid grid-flow-row min-[700px]:grid-cols-3 gap-2 min-[700px]:gap-5 pt-2 w-full">
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={nombreSol} onChange={(e) => setNombreSol(e.target.value)} placeholder="Ingrese su Nombre..."/></div>
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={telefonoSol} onChange={(e) => setTelefonoSol(e.target.value)} placeholder="Ingrese su Telefono..."/></div>
                                                <div><input className="theme5 grid hoverborder w-[250px] min-[700px]:w-[185px] h-[45px] pl-2 rounded-md text-base border-b-[2px] border-[var(--color1)]" value={emailSol} onChange={(e) => setEmailSol(e.target.value)} placeholder="Ingrese su Email..."/></div>
                                            </div>                      
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
                                                    <button className="theme3 BiggerMini textcolor rounded-md w-full h-[45px] my-1 text-lg font-bold" onClick={() => handleSolicitud()}>Solicitar Compra</button>
                                                </div>
                                            ) : (           
                                                <div className="grid grid-flow-row w-full gap-2">
                                                    {/*
                                                    <div className={displayEnvio}>
                                                        <div className="grid grid-cols-[1fr_auto] w-full items-center pt-2">
                                                            <h1 className="text-base font-semibold justify-self-start">Envío:</h1> <h1 className="text-base font-semibold justify-self-end">{costo}$</h1>
                                                        </div>
                                                    </div>
                                                    */}

                                                    <div className="grid grid-cols-[1fr_auto] w-full items-center">
                                                        <h1 className="text-2xl font-bold justify-self-start">TOTAL:</h1> <h1 className="text-2xl font-bold justify-self-end">{total}$</h1>
                                                    </div>
                                                    <div className="grid">
                                                        <button className="theme3 BiggerMini textcolor rounded-md w-full h-[45px] my-1 text-lg font-bold" onClick={() => handleSolicitud()}>Solicitar Compra</button>
                                                    </div>
                                                    

                                                </div>
                                            )
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {solicitudEnviada && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="theme2 rounded-lg p-8 max-w-md mx-4 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold mb-4">¡Solicitud Procesada!</h2>
                    <p className="text-lg mb-2">
                        Hemos recibido tu solicitud de compra correctamente.
                    </p>
                    <p className="text-lg mb-4">
                        Te hemos enviado un email de confirmación y nos pondremos en contacto contigo pronto.
                    </p>
                    <p className="text-sm">
                        Serás redirigido a la página de inicio en{" "}
                        <span className="font-bold text-lg">{tiempoRestante}</span>{" "}
                        segundos...
                    </p>
                    <button
                        className="theme1 mt-4 px-6 py-2 rounded-md font-bold"
                        onClick={() => window.location.href = "/"}
                    >
                        Ir al inicio ahora
                    </button>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

/*Viejo sistema de pago
        const handlePayment = async () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    } else if (direccion.trim() === "") {
        alert("Por favor, ingresa una dirección de envío.");
        return;
    } else if (envio === true && otraLoc.trim() === "") {
        alert("Por favor, seleccione una localidad.");
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

                    <div className="theme5">
                        <div className="grid grid-rows-[auto_auto_1fr_auto] place-self-center place-content-center place-items-center py-4 w-[350px] min-[700px]:w-[700px]">    
                            <div className="grid grid-flow-row min-[700px]:grid-flow-col place-content-center place-items-center">
                                <button onClick={() => {setEnvio(false)}}><div className={envioB1}>Retiro por local</div></button>
                                <button onClick={() => {setEnvio(true)}}> <div className={envioB2}>Envio a domicilio</div></button>
                            </div>
                            {
                                envio === false ? (
                                    <div className="theme3 grid grid-flow-row min-[700px]:grid-flow-col place-content-center rounded-md w-[300px] min-[700px]:w-[600px] h-[55px] min-[700px]:h-[45px] gap-0 min-[700px]:gap-2 my-1 text-lg font-bold"> <div>Retirar en Av. Gral. Paz 7826, </div><div>Santa Fe</div> </div>
                                ) : (
                                    <div>
                                        <select className="theme3 grid place-content-center rounded-md w-[300px] min-[700px]:w-[600px] h-[45px] pl-2 my-1 text-lg font-bold cursor-pointer" value={otraLoc} onChange={(e) => setOtraLoc(e.target.value)}>
                                            <option value={""} disabled className="cursor-pointer">Seleccione su localidad</option>
                                            <option value={"Ciudad de Santa Fe"} className="cursor-pointer">Ciudad de Santa Fe</option>
                                            <option value={"Otra"} className="cursor-pointer">Otra localidad</option>
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
                                                <button className="theme3 BiggerMini textcolor rounded-md w-[300px] min-[700px]:w-[600px] h-[45px] my-1 text-lg font-bold" onClick={() => handleSolicitud()}>Solicitar Compra</button>
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
                                                    <button className="theme3 BiggerMini textcolor rounded-md w-[300px] min-[700px]:w-[600px] h-[45px] my-1 text-lg font-bold" onClick={() => handlePayment()}>Completar Compra</button>
                                                </div>
                                                

                                            </div>
                                        )
                                    }
                            </div>
                        </div>
                    </div>
*/