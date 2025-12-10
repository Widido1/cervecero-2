import Image from "next/image";
import noimage from "@/app/images/noimage.webp"; //importamos la imagen por defecto
import { cutString } from "../functions/cutString";

export default function PriorityCard(props){
    const product = props.product;
    const setGrande = props.setGrande;

    if (!product.imageUrl) {
        product.imageUrl = noimage; // Si no hay imagen, usar la imagen por defecto
    }

    return(
        <div className="grid grid-flow-col place-self-center place-content-start place-items-center w-full">
            <button onClick={() => setGrande(product.imageUrl)} className="BiggerMini px-2 py-1 rounded-md text-lg">
                <div className="gap-4 p-2 rounded-md grid grid-flow-col place-self-start place-content-start">
                    <Image                
                        src={product.imageUrl}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-full h-[75px] w-[75px]"
                    />
                    <div className="grid grid-flow-row place-items-start place-content-start text-left ">
                        <div className="text-sm min-[650px]:text-base font-semibold">{product.name}</div>
                        <div className="text-xs min-[650px]:text-sm ">{cutString(product.description, 200) }</div>
                    </div>
                </div>
            </button>
        </div>
    )
}