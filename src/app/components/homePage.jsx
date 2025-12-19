"use client"
import Slider from "./slider"; //importamos el componente slider
import Cart from "./cart";
import { useState } from "react";
import Navbar from "./navbar";
import CirculoCategoria from "./circuloCategoria";
// import noimage from "@/app/images/noimage.webp"; //importamos la imagen por defecto
import SliderPrioridad from "./sliderPrioridad";
import Pie from "./pie";
import Banner from "./banner";
import WSP from "./wsp";

export default function HomePage(props) {
  const items = props.items; //aqui van los items que se pasan al slider, por ahora un array vacio
  const priorityProducts = items.filter(item => item.priority > 0 && item.stock > 0).sort((a, b) => b.priority - a.priority); //productos prioritarios, los que tienen prioridad mayor a 0
  const maltaProducts = items.filter(item => item.type === "Malta" && item.stock > 0).sort((a, b) => b.priority - a.priority);
  //const lupuloProducts = items.filter(item => item.type === "Lupulo").sort((a, b) => b.priority - a.priority);
  const levaduraProducts = items.filter(item => item.type === "Levadura" && item.stock > 0).sort((a, b) => b.priority - a.priority);
  const [displayCart, setDisplayCart] = useState(false); //estado del carrito, si esta abierto o cerrado

  return (
    <div className="min-w-[400px]">
      <Navbar display={displayCart} setDisplay={setDisplayCart}/>     
      <div className="grid h-[120px]"></div> {/* Espacio para el navbar */}
      <Banner/>
      <WSP />
      <div className="w-[400px] min-[550px]:w-[550px] min-[650px]:w-[650px] min-[750px]:w-[750px] min-[900px]:w-[900px] min-[1100px]:w-[1100px] min-[1400px]:w-[1400px] mx-auto">
        <div className="text-center text-3xl font-extrabold p-4">Categorías</div>
        <div className="grid grid-flow-row min-[650px]:grid-flow-col place-self-center place-content-center place-items-center min-[650px]:gap-6 min-[920px]:gap-12 p-4">
          <div className="grid grid-flow-col gap-6 min-[920px]:gap-12">
            <div className="grid grid-flow-row place-content-start place-items-center h-[160px] min-[650px]:h-[200px] min-[1100px]:h-[250px]">
              <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773744/malta_textura_n5cyzi.png"} tipo={"Maltas"}/></div>
              <div className="text-lg min-[920px]:text-xl font-semibold pt-4">Maltas</div>
            </div>
            <div className="grid grid-flow-row place-content-start place-items-center h-[160px] min-[650px]:h-[200px] min-[1100px]:h-[250px]">
              <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773080/levadura_05_small_dusqp1.png"} tipo={"Levaduras"}/></div>
              <div className="text-lg min-[920px]:text-xl font-semibold pt-4">Levaduras</div>
            </div>
            <div className="grid grid-flow-row place-content-start place-items-center h-[160px] min-[650px]:h-[200px] min-[1100px]:h-[250px]">
              <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773578/l%C3%BApulo_small_dbesem.png"} tipo={"Lupulos"}/></div>
              <div className="text-lg min-[920px]:text-xl font-semibold pt-4">Lúpulos</div>
            </div>
          </div>
          <div className="grid grid-flow-col gap-6 min-[920px]:gap-12">
            <div className="grid grid-flow-row place-content-start place-items-center h-[160px] min-[650px]:h-[200px] min-[1100px]:h-[250px]">
              <div><CirculoCategoria img={"https://res.cloudinary.com/dx5i98ab2/image/upload/v1765674184/img_kits_de_elaboraci%C3%B3n_tumy1l.jpg"} tipo={"Kits"}/></div>
              <div className="text-lg min-[920px]:text-xl font-semibold text-center pt-4">Kits de<br/>Elaboración</div>
            </div>
            <div className="grid grid-flow-row place-content-start place-items-center h-[160px] min-[650px]:h-[200px] min-[1100px]:h-[250px]">
              <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773577/equipo_small_h0mhvu.png"} tipo={"Equipamiento"}/></div>
              <div className="text-lg min-[920px]:text-xl font-semibold pt-4">Equipamiento</div>
            </div>
          </div>


        </div>
        
        <div>
          <div className="grid place-content-center place-items-center">
            <Slider items={priorityProducts} name="Productos"/>
          </div>
          <div>
            <SliderPrioridad products={priorityProducts}/>
          </div>
          <div className="grid place-content-center place-items-center">
            <Slider items={maltaProducts} name="Maltas"/>
          </div>
          <div className="grid place-content-center place-items-center">
            <Slider items={levaduraProducts} name="Levaduras"/>
          </div>

        </div>
      </div>
      <Pie/>
      <Cart className active={displayCart} setActive={setDisplayCart}/>
    </div>
  )    
}

//lupulos:
/*
          <div className="grid grid-flow-row place-content-center place-items-center">
            <div className="text-center text-3xl font-extrabold p-4">Lúpulo</div>
            <Slider items={lupuloProducts}/>
          </div>
*/