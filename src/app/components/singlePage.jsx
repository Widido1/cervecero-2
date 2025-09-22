"use client"
import { useState } from "react";
import SingleCard from "./singleCard";
import Navbar from "./navbar";
import Pie from "./pie";
import Slider from "./slider";

export default function SinglePage(props) {
    const product = props.product; //aqui van los items que se pasan al slider, por ahora un array vacio
    const items = props.items;
    const [displayCart, setDisplayCart] = useState(false); //estado del carrito, si esta abierto o cerrado
    return (
        <div>
            <Navbar display={displayCart} setDisplay={setDisplayCart}/>
            <div className="grid h-[120px]"></div> {/* Espacio para el navbar */}
            <div className="grid place-content-center place-items-center gap-8 py-8">
                <div className="grid">
                    <SingleCard id={product.id} name={product.name} img={product.imageUrl} des={product.description} price={product.price}/>
                </div>
                <div className="grid grid-flow-row gap-4">
                    <div className="grid text-2xl font-bold">Productos Similares:</div>
                    <div><Slider items={items}/></div>
                </div>
            </div>
            <Pie/>


        </div>
    );
}