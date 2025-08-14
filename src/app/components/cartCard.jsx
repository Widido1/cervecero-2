import Image from "next/image";
import { useCart } from "../hooks/usecart";

export default function CartCard(props){
    const product = props.product;
    const {removeFromCart} = useCart();

    return(
        <div key={product.id} className="theme1 gap-4 p-2 w-full h-[120px] rounded-md grid grid-flow-col place-self-start place-content-start place-items">
            
            <Image
                src={product.img}
                alt={product.name}
                width={100}
                height={100}
                className="rounded-[20%] h-[100px] w-[100px]"
            />
            <div className="grid grid-flow-row place-items-start place-content-start text-left">
                <h1 className="text-base font-bold">{product.name}</h1>
                <h1 className="theme1">{product.des}</h1>
                <div className="grid grid-flow-col place-content-start place-items-center gap-4">
                    <p className="text-2xl font-bold">{product.price}$</p>
                    <div className="grid grid-flow-col place-content-center place-items-center text-center gap-1">
                        <h1 className="text-lg">Cantidad: </h1> <h1 className="text-2xl font-bold">{product.quantity}</h1>
                    </div>
                    <button onClick={() => removeFromCart(product)} className="theme2 Bigger px-2 py-1 rounded-md text-lg">Eliminar</button>
                </div>
            </div>
        </div>
    )
}