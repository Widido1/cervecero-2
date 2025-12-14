"use client";
import Image from "next/image";
import noimage from "@/app/images/noimage.webp";
import AddCartButton from "./addCartButton";
import { useEffect, useState } from "react";
import { useCart } from "../hooks/usecart";

// ProductBox is for the main page, the one where we can see all the products

export default function SingleCard(props) {
    const [pImg, setPImg] = useState(noimage);
    const [quantity, setQuantity] = useState(1);
    const { addMultipleCart } = useCart();

    useEffect(()=>{
        if(props.img && props.img !== "no-imagen"){
            setPImg(props.img);
        }
    },[]) //imagen por defecto

    const cartProduct = {
        id: props.id,
        name: props.name,
        img: pImg,
        des: props.description,
        price: props.price,
    }

    return(
        <div>
            <div className="theme1 grid place-content-start place-items-start py-4 px-4
            min-[700px]:w-[650px] min-[900px]:w-[900px] min-[1200px]:w-[1200px]">
                <div className="grid grid-flow-row min-[900px]:grid-flow-col gap-4 min-[900px]:gap-8">
                    <div>
                        <Image 
                            src={pImg} //si no hay imagen, se muestra la imagen de placeholder
                            alt="sin imagen"
                            width={400}
                            height={400}
                            className="mx-auto rounded-[5%]
                            h-[400px] min-[1300px]:h-[600px]
                            w-[400px] min-[1300px]:w-[600px]  " //tamaño responsivo
                            //fill={true}
                            //style={imageStyle}
                        />
                    </div>
                    <div className="grid grid-rows-[1fr_auto]">
                        <div>
                            <div className="rounded-t-md w-full font-bold text-2xl min-[1100px]:text-3xl">
                                {props.name}
                            </div>
                            <div className="rounded-t-md w-full font-bold pt-1 text-base min-[1100px]:text-lg">
                                {props.des}
                            </div>
                        </div>

                        {
                            props.type === "Malta" ? (
                            <div>
                                <div>
                                    <h1 className="font-bold text-2xl">Seleccionar Cantidad:</h1>
                                </div>
                                <div className="grid grid-flow-col gap-2 my-2">
                                    <button onClick={() => setQuantity(1)} 
                                    className={`grid place-content-center rounded-md font-bold w-full h-[40px] p-2 border-[2px] border-[var(--color1)] ${quantity === 1 ? "theme3":"theme1"}`}>1 KG</button>
                                    <button onClick={() => setQuantity(5)} 
                                    className={`grid place-content-center rounded-md font-bold w-full h-[40px] p-2 border-[2px] border-[var(--color1)] ${quantity === 5 ? "theme3":"theme1"}`}>5 KG</button>
                                    <button onClick={() => setQuantity(10)} 
                                    className={`grid place-content-center rounded-md font-bold w-full h-[40px] p-2 border-[2px] border-[var(--color1)] ${quantity === 10 ? "theme3":"theme1"}`}>10 KG</button>
                                    <button onClick={() => setQuantity(25)} 
                                    className={`grid place-content-center rounded-md font-bold w-full h-[40px] p-2 border-[2px] border-[var(--color1)] ${quantity === 25 ? "theme3":"theme1"}`}>25 KG</button>
                                </div>
                                
                                <div>
                                    <h1 className="font-bold text-4xl">{"Total: $ " + (props.price * quantity)}</h1>
                                </div>
                                <button onClick={() => addMultipleCart(cartProduct, quantity)} className="grid place-self-center theme3 textcolor cursor-pointer font-bold w-full rounded-md p-2 m-2 text-base min-[900px]:text-lg">
                                    Comprar
                                </button>
                            </div>
                            ) : (
                            <div>
                                <div>
                                    <h1 className="font-bold text-4xl">{"$ " + (props.price)}</h1>
                                </div>
                                <div>
                                    <AddCartButton product={cartProduct}/>
                                </div>
                            </div>
                            )
                        }

                    </div>

                </div>
            
            </div>
        </div>
    );
}