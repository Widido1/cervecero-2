import Image from "next/image";
import noimage from "@/app/images/noimage.webp"; //importamos la imagen por defecto
import Link from "next/link";

export default function CirculoCategoria(props) {
  if (!props.img) {
    props.img = noimage; // Si no hay imagen, usar la imagen por defecto
  }

  return (
    <div>
        <Link href={`/search/${props.tipo}`}>
            <Image
                src={props.img}
                alt="no image"
                width={400}
                height={400}
                className="mx-auto rounded-full w-[100px] h-[100px] min-[920px]:w-[125px] min-[920px]:h-[125px] min-[1100px]:w-[150px] min-[1100px]:h-[150px] min-[1400px]:w-[200px] min-[1400px]:h-[200px]"
            />
        </Link>
    </div>
  )    
}