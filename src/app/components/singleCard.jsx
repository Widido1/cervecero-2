"use client";
import Image from "next/image";
import noimage from "@/app/images/noimage.webp";
import AddCartButton from "./addCartButton";
import { useEffect, useState } from "react";

// ProductBox is for the main page, the one where we can see all the products

export default function SingleCard(props) {
    const pName = props.name;
    const [pImg, setPImg] = useState(noimage);
    useEffect(()=>{
        if(props.img && props.img !== "no-imagen"){
            setPImg(props.img);
        }
    },[]) //imagen por defecto

    const product = {
        id: props.id,
        name: pName,
        img: pImg,
        des: props.description,
        price: props.price
    }

    return(
        <div>
            <div className="theme1 grid place-content-start place-items-start py-4 
            w-[750px] min-[900px]:w-[900px] min-[1200px]:w-[1200px]">
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
                    <div>
                        <div className="rounded-t-md w-full font-bold py-2 min-[900px]:py-4 text-2xl min-[1100px]:text-3xl">
                            {pName}
                        </div>
                        <div className="rounded-t-md w-full font-bold py-2 text-lg min-[1100px]:text-xl">
                            {props.des}
                        </div>
                        
                        <div>
                            <h1 className="font-bold text-4xl">{"$ " + props.price}</h1>
                        </div>
                        <div>
                            <AddCartButton product={product}/>
                        </div>
                    </div>

                </div>
            
            </div>
        </div>
    );
}