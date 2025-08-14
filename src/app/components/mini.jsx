import Image from "next/image";

export default function Mini(props) {
  return (
    <div>
      <Image
        src={props.img}
        alt="no image"
        width={400}
        height={400}
        className="mx-auto rounded-[20%] w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] xl:w-[100px] xl:h-[100px]"
      />
    </div>
  )    
}