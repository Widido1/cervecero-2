import { useCart } from "../hooks/usecart";

export default function AddCartButton(props){
    const { addToCart } = useCart(); //desestructuracion de las props
    const product = props.product; //desestructuracion del producto

    return(
        <button onClick={() => addToCart(product)} className="grid place-self-center theme3 BoxShine Bigger TextShine font-bold w-full rounded-md p-1 min-[900px]:p-2 m-2 text-md min-[900px]:text-lg">
            Comprar
        </button>
    )
}