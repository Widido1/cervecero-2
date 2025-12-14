"use client";
import Link from "next/link";
import SearchBar from "./searchbar";
import CartButton from "./cartButton";
import { useCart } from "../hooks/usecart";
import logo from "@/app/images/logo.png";
import Image from "next/image";

export default function Navbar(props){
    const {cart} = useCart();
    const setDisplay = props.setDisplay;
    const display = props.display;
    //w-[1100px] min-[1400px]:w-[1400px] mx-auto
    return(

        <div className="grid w-full theme2 fixed top-0 z-50 Merry">
            <div className="grid grid-flow-col Merry min-[1000px]:place-content-center text-center place-self-center place-items-start min-[1000px]:place-items-center h-[80px] px-1 min-[500px]:px-2 font-bold text-4xl gap-4 min-[500px]:gap-8 pt-4 min-[1000px]:pt-1">
                <div>
                    <Link href="/" className="cursor-pointer">
                    <Image
                        src={logo}
                        alt="no image"
                        width={400}
                        height={400}
                        className="mx-auto w-[60px] h-[50px]"
                    />
                    </Link>
                </div>
                <div className="grid grid-flow-row gap-2">
                    <div className="grid grid-flow-col place-content-center place-self-center items-center align-middle">
                        <SearchBar/>
                    </div>

                </div>
                <div>
                    <CartButton setDisplay={setDisplay} display={display} cart={cart}/>
                </div>
            </div>
            <div className="grid grid-flow-col theme4 w-full gap-8 place-self-center place-content-center place-items-center text-center text-lg min-[550px]:text-xl p-2">
                <Link href="/"><h1 className="TextShine Bigger Merry">Inicio</h1></Link>
                <Link href="/search/empty"><h1 className="TextShine Bigger Merry">Productos</h1></Link>
                <Link href="/about"><h1 className="TextShine Bigger Merry">Sobre Nosotros</h1></Link>
            </div>
 
        </div>
    );
}


  /*      <div className="w-full theme2 fixed top-0 z-50">
            <div className="grid grid-flow-col min-[1000px]:grid-cols-3 place-self-start min-[1000px]:place-content-center  text-center place-items-start min-[1000px]:place-items-center h-[100px] px-2 font-bold text-4xl w-[500px] min-[650px]:w-[650px] min-[800px]:w-[800px] min-[1000px]:w-[1100px] min-[1400px]:w-[1400px] mx-auto gap-4 pt-4 min-[1000px]:pt-1">
                <div>
                    <Image
                        src={logo}
                        alt="no image"
                        width={400}
                        height={400}
                        className="mx-auto w-[65px] h-[65px]"
                    />
                </div>
                <div className="grid grid-flow-row gap-2">
                    <div className="grid grid-flow-col place-content-center place-self-center items-center align-middle">
                        <SearchBar/>
                    </div>
                    <div className="grid grid-flow-col gap-8 place-self-center place-content-center place-items-center text-center text-xl">
                        <Link href="/"><h1 className="TextShine Bigger">Inicio</h1></Link>
                        <Link href="/search/empty"><h1 className="TextShine Bigger">Productos</h1></Link>
                        <Link href="/about"><h1 className="TextShine Bigger">Sobre Nosotros</h1></Link>
                    </div>
                </div>
                <div>
                    <CartButton setDisplay={setDisplay} display={display} cart={cart}/>
                </div>
            </div>
 
        </div>
    */