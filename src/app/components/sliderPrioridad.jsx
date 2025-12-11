import Image from "next/image";
import PriorityCard from "./priorityCard";
import { useEffect, useState } from "react";
import noimage from "@/app/images/noimage.webp"; //importamos la imagen por defecto

export default function SliderPrioridad(props) {
    const [grande, setGrande] = useState(noimage); // Default image for the large view
    const { products } = props; // Assuming products is passed as a prop

    useEffect(() => {
        setGrande(products[0].imageUrl); // Set the first product's image as default
    },[]); // Empty effect to mimic componentDidMount

  return (
    <div className="grid place-self-center place-content-center place-items-center">
        <div className="grid grid-flow-row min-[1000px]:grid-flow-col place-self-center place-content-center place-items-center gap-4 min-[1600px]:gap-8 px-8 py-4 w-[390px] min-[450px]:w-[450px] min-[550px]:w-[500px] min-[700px]:w-[650px] min-[1000px]:w-[900px] min-[1300px]:w-[1050px] min-[1500px]:w-[1150px]">
            <div className="grid place-self-center place-content-end">
                <Image
                    src={grande}
                    alt="no image"
                    width={400}
                    height={400}
                    className="rounded-[10%] mx-auto w-[400px] h-[400px]"
                />
            </div>
            <div className="grid grid-flow-row place-self-center place-content-start place-items-start gap-2">
                <div><PriorityCard setGrande={setGrande} product={products[0]}/></div>
                <div><PriorityCard setGrande={setGrande} product={products[1]}/></div>
                <div><PriorityCard setGrande={setGrande} product={products[2]}/></div>
                <div><PriorityCard setGrande={setGrande} product={products[5]}/></div>
            </div>
        </div>
    </div>
  )    
}