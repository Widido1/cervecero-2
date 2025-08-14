import Image from "next/image";
import noimage from "@/app/images/noimage.webp"; //importamos la imagen por defecto

export default function CirculoCategoria(props) {
  if (!props.img) {
    props.img = noimage; // Si no hay imagen, usar la imagen por defecto
  }

  return (
    <div>
        <button>
            <Image
                src={props.img}
                alt="no image"
                width={400}
                height={400}
                className="mx-auto rounded-full w-[125px] h-[125px] min-[1100px]:w-[150px] min-[1100px]:h-[150px] min-[1400px]:w-[200px] min-[1400px]:h-[200px]"
            />
        </button>
    </div>
  )    
}