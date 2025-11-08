import Image from "next/image";
import carritoweb from "@/app/images/carritoweb.webp"

export default function CartButton(props){
    const { cart } = props; //desestructuracion del carrito
    const { display } = props; //desestructuracion de la funcion para mostrar el carrito
    const { setDisplay } = props; //desestructuracion de la funcion para cambiar el estado del carrito
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); //calculo del total de items en el carrito

    

    return(
        <div className="relative flex items-center justify-center cursor-pointer">
            <Image
                src={carritoweb}
                alt="cart"
                width={55}
                height={55}
                className="Bigger text-[var(--color2)] z-10 top-0"
                onClick={() => setDisplay(!display)} //funcion que se ejecuta al hacer click en el carrito
            />
            <span className="absolute top-[-5px] theme3 rounded-full px-2 py-1 text-sm font-bold">
                {totalItems}
            </span>

        </div>
    );
}