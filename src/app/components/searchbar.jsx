"use client"

import Link from "next/link";
import { useState } from "react";
import search_icon from "@/app/images/search_icon.png"; // Assuming you have a search icon image
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function SearchBar(props){
    const [searchW, setSearchW] = useState("");
    const router = useRouter(); 

    const change = event =>{
        const newValue = event.target.value;
        setSearchW(newValue);
    }

    const handleSearch = () => {
        if (searchW.trim() !== "") {
            router.push(`/search/${searchW}`);
        } else {
            router.push("/search/empty");
        }
    }

    // Función para manejar la tecla Enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevenir comportamiento por defecto
            handleSearch();
        }
    }

    return(
        <div className="grid grid-flow-col place-self-center place-content-center">
            <input value={searchW} onChange={change} onKeyDown={handleKeyDown} className="rounded-md theme6
            w-[240px] min-[500px]:w-[300px] min-[650px]:w-[450px] min-[1150px]:w-[600px] h-[40px] px-2 min-[500px]:px-8 text-sm min-[650px]:text-lg" placeholder="Buscar maltas, lúpulos y más..."/>
            <Link className="grid place-self-end cursor-pointer absolute " href={
                searchW !== "" ? (`/search/${searchW}`):("/search/empty")    
            }><button className="rounded-md theme1 place-self-end cursor-pointer absolute w-[40px] h-[40px] text-2xl ">
                <Image
                    src={search_icon}
                    alt="Facebook Icon"
                    width={20}
                    height={20}
                    className="grid place-self-center"
                />
            </button></Link>
        </div>
    )
}