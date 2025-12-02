import { useCart } from "../hooks/usecart";

export default function CartQuantity(props){
    const { addToCart, decreaseFromCart } = useCart(); //desestructuracion de las props
    const product = props.product; //desestructuracion del producto

    return(
        <div className="grid grid-flow-col grid-cols-3 theme5 rounded-full border-[2px] border-[var(--color1)]">
            <button onClick={() => addToCart(product)} className="grid place-self-center place-content-center theme5 textcolor cursor-pointer font-bold w-[30px] h-[20px] rounded-full p-1 min-[900px]:p-2 m-2 text-md min-[900px]:text-3xl">
            +
            </button>
            <div className="grid place-content-center text-xl font-bold">
            {product.quantity}
            </div>
            <button onClick={() => decreaseFromCart(product)} className="grid place-self-center place-content-center theme5 textcolor cursor-pointer font-bold rounded-full w-[30px] h-[20px] p-1 min-[900px]:p-2 m-2 text-md min-[900px]:text-3xl">
            -
            </button>
        </div>

    )
}