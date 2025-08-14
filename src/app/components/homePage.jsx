"use client"
import Slider from "./slider"; //importamos el componente slider
import Cart from "./cart";
import { useState } from "react";
import Navbar from "./navbar";
import CirculoCategoria from "./circuloCategoria";
// import noimage from "@/app/images/noimage.webp"; //importamos la imagen por defecto
import SliderPrioridad from "./sliderPrioridad";
import Pie from "./pie";

export default function HomePage(props) {
  const items = props.items; //aqui van los items que se pasan al slider, por ahora un array vacio
  const priorityProducts = items.filter(item => item.priority > 0).sort((a, b) => b.priority - a.priority); //productos prioritarios, los que tienen prioridad mayor a 0
  const maltaProducts = items.filter(item => item.type === "Malta").sort((a, b) => b.priority - a.priority);
  const lupuloProducts = items.filter(item => item.type === "Lupulo").sort((a, b) => b.priority - a.priority);
  const levaduraProducts = items.filter(item => item.type === "Levadura").sort((a, b) => b.priority - a.priority);
  const [displayCart, setDisplayCart] = useState(false); //estado del carrito, si esta abierto o cerrado

  return (
    <div>
      <Navbar display={displayCart} setDisplay={setDisplayCart}/>
      <div className="grid h-[100px]"></div> {/* Espacio para el navbar */}
      <div className="w-[900px] min-[1100px]:w-[1100px] min-[1400px]:w-[1400px] mx-auto">
        <div className="text-center text-3xl font-extrabold p-4">Categorías</div>
        <div className="grid grid-flow-col place-self-center place-content-center place-items-center gap-12 p-4">
          <div className="grid grid-flow-row place-content-start place-items-center h-[200px] min-[1100px]:h-[250px]">
            <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773744/malta_textura_n5cyzi.png"}/></div>
            <div className="text-xl font-semibold">Maltas</div>
          </div>
          <div className="grid grid-flow-row place-content-start place-items-center h-[200px] min-[1100px]:h-[250px]">
            <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773578/l%C3%BApulo_small_dbesem.png"}/></div>
            <div className="text-xl font-semibold">Lúpulos</div>
          </div>
          <div className="grid grid-flow-row place-content-start place-items-center h-[200px] min-[1100px]:h-[250px]">
            <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773080/levadura_voss_mntsin.png"}/></div>
            <div className="text-xl font-semibold">Levaduras</div>
          </div>
          <div className="grid grid-flow-row place-content-start place-items-center h-[200px] min-[1100px]:h-[250px]">
            <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773578/kits_small_iy1yxj.png"}/></div>
            <div className="text-xl font-semibold text-center">Kits de<br/>Elaboración</div>
          </div>
          <div className="grid grid-flow-row place-content-start place-items-center h-[200px] min-[1100px]:h-[250px]">
            <div><CirculoCategoria img={"https://res.cloudinary.com/drh0qrube/image/upload/v1754773577/equipo_small_h0mhvu.png"}/></div>
            <div className="text-xl font-semibold">Equipamiento</div>
          </div>
        </div>
        <div>
          <div className="grid grid-flow-row place-content-center place-items-center">
            <div className="text-center text-3xl font-extrabold p-4">Productos</div>
            <Slider items={priorityProducts}/>
          </div>
          <div>
            <SliderPrioridad products={priorityProducts}/>
          </div>
          <div className="grid grid-flow-row place-content-center place-items-center">
            <div className="text-center text-3xl font-extrabold p-4">Malta</div>
            <Slider items={maltaProducts}/>
          </div>
          <div className="grid grid-flow-row place-content-center place-items-center">
            <div className="text-center text-3xl font-extrabold p-4">Levadura</div>
            <Slider items={levaduraProducts}/>
          </div>
          <div className="grid grid-flow-row place-content-center place-items-center">
            <div className="text-center text-3xl font-extrabold p-4">Lúpulo</div>
            <Slider items={lupuloProducts}/>
          </div>
        </div>
      </div>
      <Pie/>
      <Cart className active={displayCart}/>
      
      
    </div>
  )    
}