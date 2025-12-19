import Link from "next/link";
import Whatsapp from "@/app/images/Whatsapp.svg";
import Image from "next/image";

const numberWSP = process.env.NEXT_PUBLIC_WSP;

export default function WSP(props){

    return(
        <div className="fixed bottom-20 left-1 min-[800px]:left-4 z-50">
            <Link href={`https://wa.me/${numberWSP}`} target="_blank" className="fixed grid cursor-pointer">
                <Image
                    src={Whatsapp}
                    alt="Banner principal"
                    className=" w-[75px] h-[75px] BiggerMini WSP-Glow rounded-full"
                />
            </Link>
        </div>
    )
}