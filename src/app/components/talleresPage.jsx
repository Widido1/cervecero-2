"use client";
import { useState } from "react";
import Cart from "../components/cart";
import Navbar from "../components/navbar";
import SliderTalleres from "./sliderTalleres";

export default function TalleresPage(props) {
  const [displayCart, setDisplayCart] = useState(false); //estado del carrito, si esta abierto o cerrado
  const items = props.talleres.map(taller => ({
    name: taller.name,
    img: taller.img,
    description: taller.description
  }));

  return (
    <div>
      <Navbar display={displayCart} setDisplay={setDisplayCart}/>
      <div>
        <SliderTalleres items={items}/>
        <Cart className active={displayCart}/>
      </div>
      
    </div>
  )    
}