"use client"
import { useState } from "react";
import SingleCard from "./singleCard";
import Navbar from "./navbar";
import Pie from "./pie";
import Slider from "./slider";
import Cart from "./cart";

export default function SinglePage(props) {
    const product = props.product; //aqui van los items que se pasan al slider, por ahora un array vacio
    const items = props.items;
    const [displayCart, setDisplayCart] = useState(false); //estado del carrito, si esta abierto o cerrado
    return (
        <div className="min-w-[900px]">
            <Navbar display={displayCart} setDisplay={setDisplayCart}/>
            <div className="grid h-[120px]"></div> {/* Espacio para el navbar */}
            <div className="grid place-content-center place-items-center gap-8 py-8">
                <div className="grid">
                    <SingleCard id={product.id} name={product.name} img={product.imageUrl} des={product.description} price={product.price}/>
                </div>
                <div className="grid grid-flow-row place-content-center place-items-center min-[900px]:place-content-start min-[900px]:place-items-start gap-4">
                    <div className="grid text-2xl font-bold">Productos Similares:</div>
                    <div><Slider items={items}/></div>
                </div>
            </div>
            <Cart className active={displayCart} setActive={setDisplayCart}/>
            <Pie/>


        </div>
    );
}