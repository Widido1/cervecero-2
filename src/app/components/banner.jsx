import Image from "next/image";
import banner from "@/app/images/banner.webp"

export default function Banner(props) {
  return (
    <div>
      <Image
        src={banner}
        alt="no image"
        width={1920}
        height={624}
        className="w-full"
      />
    </div>
  )    
}