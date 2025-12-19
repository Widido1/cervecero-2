"use client";
import Image from "next/image";
import Navbar from "./navbar";
import { useState } from "react";
import Pie from "./pie";
import about01 from "@/app/images/about01.webp"
import Cart from "./cart";
import imgvision from "@/app/images/imgvision.webp";
import imgvalores1 from "@/app/images/imgvalores1.webp";
import imgvalores2 from "@/app/images/imgvalores2.webp";
import WSP from "./wsp";


export default function About(props) {
    const [displayCart, setDisplayCart] = useState(false); //estado del carrito, si esta abierto o cerrado

  return (
    <div className="min-w-[400px]">
        <Navbar display={displayCart} setDisplay={setDisplayCart}/>
        <div className="grid h-[100px]"></div> {/* Espacio para el navbar */}
        <WSP/>
        <div className="theme3b grid grid-flow-row place-content-center place-items-center text-center py-14 min-[750px]:py-20">
            <div className="Merry text-xl min-[960px]:text-2xl min-[1200px]:text-3xl">Nuestra misión</div>
            <div className="Merry text-3xl min-[750px]:text-4xl min-[960px]:text-5xl min-[1200px]:text-6xl min-[1400px]:text-7xl font-semibold px-4">Fomentar la cultura cervecera artesanal<br/> con insumos, formación y<br/> asesoramiento de confianza. </div>
        </div>
        <div className="w-[90%] min-[1050px]:w-[80%] mx-auto my-8">
            <div className="grid grid-flow-row min-[950px]:grid-flow-col min-[950px]:grid-cols-2 pt-8 min-[750px]:pt-16 gap-8 min-[750px]:gap-16">
                <div>
                    <Image
                        src={about01}
                        alt="no image"
                        width={720}
                        height={456}
                        className="mx-auto w-full h-[275px] min-[750px]:h-[350px] min-[1450px]:h-[500px] rounded-lg"
                    />
                </div>
                <div className="grid grid-flow-row place-self-center place-content-center place-items-start text-left px-2">
                    <div className="text-xl min-[950px]:text-2xl min-[1300px]:text-3xl font-semibold">Nuestra Historia</div>
                    <div className="grid grid-flow-row gap-2 min-[1100px]:gap-4 pt-2 min-[1600px]:pt-4">
                        <div className="text-sm min-[1450px]:text-base min-[1600px]:text-lg">
                        <p>La “Boutique del Cervecero” es un proyecto que nace en el corazón del Barrio Barranquitas, 
                            en la ciudad de Santa Fe, hace cerca de una década, para satisfacer las necesidades de los 
                            cerveceros caseros locales. Una iniciativa de Marcelo Gil, por entonces Homebrewer, y que hoy 
                            lidera una de las cervecerías artesanales más importantes de América Latina: Okcidenta.
                        </p>
                        </div>
                        <div className="text-sm min-[1450px]:text-base min-[1600px]:text-lg"><p>
                            A fines de 2019 la familia Luengo toma la posta en este proyecto y le da continuidad en el
                             Barrio de Guadalupe, manteniendo el objetivo de acercar al Cervecero Casero Santafecino 
                             los insumos y la capacitación necesarias para que la ciudad de Santa Fe y la región puedan 
                             disponer de los mejores recursos para seguir siendo líderes en la producción de cervezas de 
                             todo tipo, especialmente artesanales.
                        </p></div>
                    </div>
                </div>
            </div>
            <div>
                <Image
                    src={imgvision}
                    alt="no image"
                    width={1200}
                    height={1200}
                    className="mx-auto w-full h-[275px] min-[750px]:h-[350px] min-[1250px]:h-[500px] rounded-lg my-10 min-[750px]:my-16"
                />
            </div>
            <div>
                <div className="text-xl min-[950px]:text-2xl min-[1300px]:text-3xl font-semibold">Nuestra Visión</div>
                <div className="text-sm min-[1100px]:text-base min-[1300px]:text-lg min-[1600px]:text-xl text-left">
                    Aspiramos a que La Boutique del Cervecero sea la plataforma que potencie a generaciones de cerveceros artesanales: ofrecer insumos confiables, capacitación
                    práctica y redes de apoyo que acompañen el aprendizaje, la experimentación y el crecimiento de cada proyecto. Visualizamos expansión nacional de nuestros
                    servicios, programas formativos reconocidos y un espacio físico de encuentro (bar) que celebre la tradición y la innovación cervecera.
                </div>
            </div>
            <div className="grid grid-flow-row min-[550px]:grid-flow-col min-[550px]:grid-cols-2 pt-8 min-[750px]:pt-16 gap-8 min-[750px]:gap-16">
                <div className="grid grid-flow-col min-[550px]:grid-flow-row gap-4 min-[500px]:gap-8">
                    <div>
                        <Image
                            src={imgvalores1}
                            alt="no image"
                            width={600}
                            height={600}
                            className="mx-auto w-full h-[180px] min-[1250px]:h-[350px] rounded-lg"
                        />
                    </div>
                    <div>
                        <Image
                            src={imgvalores2}
                            alt="no image"
                            width={600}
                            height={600}
                            className="mx-auto w-full h-[180px] min-[500px]:h-[250px] min-[1250px]:h-[350px] rounded-lg"
                        />
                    </div>
                </div>
                <div>
                    <div className="text-xl min-[950px]:text-2xl min-[1300px]:text-3xl font-semibold">Nuestros Valores</div>
                    <div className="grid gap-2 min-[950px]:gap-4 min-[1300px]:gap-8 pt-2 min-[950px]:pt-4">
                        <div>
                            <div className="text-lg min-[950px]:text-xl min-[1300px]:text-2xl font-semibold">• Calidad</div>
                            <div className="text-sm min-[1100px]:text-base min-[1300px]:text-lg min-[1600px]:text-xl pl-8">Selección exigente de insumos y equipos<br/> para resultados consistentes.</div>
                        </div>
                        <div>
                            <div className="text-lg min-[950px]:text-xl min-[1300px]:text-2xl font-semibold">• Confianza</div>
                            <div className="text-sm min-[1100px]:text-base min-[1300px]:text-lg min-[1600px]:text-xl pl-8">Honestidad en la venta, transparencia<br/> en precios y procesos.</div>
                        </div>
                        <div>
                            <div className="text-lg min-[950px]:text-xl min-[1300px]:text-2xl font-semibold">• Accesibilidad y sencillez</div>
                            <div className="text-sm min-[1100px]:text-base min-[1300px]:text-lg min-[1600px]:text-xl pl-8">Hacemos simple lo técnico: productos<br/> y explicaciones claras para<br/> quienes arrancan.</div>
                        </div>
                        <div>
                            <div className="text-lg min-[950px]:text-xl min-[1300px]:text-2xl font-semibold">• Cercanía</div>
                            <div className="text-sm min-[1100px]:text-base min-[1300px]:text-lg min-[1600px]:text-xl pl-8">Atención personalizada, hablamos con la gente<br/> y entendemos sus proyectos.</div>
                        </div>
                        <div>
                            <div className="text-lg min-[950px]:text-xl min-[1300px]:text-2xl font-semibold">• Comunidad</div>
                            <div className="text-sm min-[1100px]:text-base min-[1300px]:text-lg min-[1600px]:text-xl pl-8">Fomentamos el encuentro entre cerveceros:<br/> compartir recetas, concursos y eventos.</div>  
                        </div>
                        <div>
                            <div className="text-lg min-[950px]:text-xl min-[1300px]:text-2xl font-semibold">• Pasión por lo artesanal</div>
                            <div className="text-sm min-[1100px]:text-base min-[1300px]:text-lg min-[1600px]:text-xl pl-8">Valoramos el proceso, la dedicación y la tradición<br/> detrás de cada birra casera.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Cart className active={displayCart} setActive={setDisplayCart}/>
        <Pie/>

    </div>
  )    
}