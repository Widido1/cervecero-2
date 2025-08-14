"use client";
import Image from "next/image";
import noimage from "@/app/images/noimage.webp";
import AddCartButton from "./addCartButton";
import { useEffect, useState } from "react";

// ProductBox is for the main page, the one where we can see all the products

export default function ProductCard(props) {
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
            <div className="themeCard grid grid-flow-row place-content-center rounded-md gap-2 py-4 w-[200px] min-[760px]:w-[250px] min-[950px]:w-[175px] min-[1100px]:w-[200px] min-[1300px]:w-[250px] min-[1700px]:w-[300px]">
                <div className="grid px-8">
                    <Image 
                        src={pImg} //si no hay imagen, se muestra la imagen de placeholder
                        alt="sin imagen"
                        width={400}
                        height={400}
                        className="mx-auto rounded-[5%] w-[130px] min-[950px]:h-[110px] min-[950px]:w-[180px] min-[1100px]:h-[120px] min-[1100px]:w-[230px] min-[1300px]:h-[210px] min-[1250px]:w-[280px] min-[1700px]:h-[280px]" //tamaño responsivo
                        //fill={true}
                        //style={imageStyle}
                    />
                    <div>
                        <h1 className="rounded-t-md w-full font-bold py-4 h-[100px] text-xs min-[1300px]:text-sm">{/*<-- routing dinamico*/}
                        {pName}
                        </h1>
                    </div>
                    
                    <div>
                        <h1 className="font-bold text-2xl min-[1300px]:text-4xl">{"$ " + props.price}</h1>
                    </div>
                    <div>
                        <AddCartButton product={product}/>
                    </div>
                </div>
            
            </div>
        </div>
    );
}