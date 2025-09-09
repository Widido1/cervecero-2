import Image from "next/image";
import banner from "@/app/images/banner.webp"

export default function Banner(props) {
  return (
    <div className="relative w-full aspect-[1920/624] overflow-hidden">
      <Image
        src={banner}
        alt="Banner principal"
        fill
        className="object-cover"
        priority
      />
    </div>
  )    
}

/*
    <div>
      <Image
        src={banner}
        alt="no image"
        width={1920}
        height={624}
        className="w-full h-auto object-cover"
      />
    </div>
*/