import Image from "next/image";
import { useCart } from "../hooks/usecart";
import CartQuantity from "@/app/components/cartQuantity";

export default function CartCard(props){
    const product = props.product;
    const {removeFromCart} = useCart();

    return(
        <div key={product.id} className="theme5 gap-4 py-2 mx-4 w-[320px] min-[700px]:w-[550px] h-[130px] min-[700px]:h-[120px] rounded-md grid grid-flow-col place-self-start place-content-start place-items-center">
            
            <Image
                src={product.img}
                alt={product.name}
                width={100}
                height={100}
                className="rounded-[20%] w-[80px] h-[80px] min-[700px]:h-[100px] min-[700px]:w-[100px]"
            />
            <div className="grid grid-flow-row grid-rows-[auto_1fr] place-items-start place-content-center text-left gap-1">
                <h1 className="text-sm min-[700px]:text-base font-bold">{product.name}</h1>
                <div className="grid grid-flow-row min-[700px]:grid-flow-col  max-[700px]:grid-cols-2 max-[700px]:grid-rows-2 place-content-start place-items-center gap-0 min-[700px]:gap-4">
                    <div className="grid grid-flow-col place-content-center place-items-center text-center gap-1">
                        <CartQuantity product={props.product}/>
                    </div>
                    <button onClick={() => removeFromCart(product)} className="theme3 Bigger px-2 py-1 rounded-md text-lg">Eliminar</button>
                    <p className="text-xl min-[700px]:text-2xl font-bold">{product.price*product.quantity}$</p>
                </div>
            </div>
        </div>
    )
}