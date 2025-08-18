"use client"

import Link from "next/link";
import { useState } from "react";
import search_icon from "@/app/images/search_icon.png"; // Assuming you have a search icon image
import Image from "next/image";

export default function SearchBar(props){
    const [searchW, setSearchW] = useState(""); 

    const change = event =>{
        const newValue = event.target.value;
        setSearchW(newValue);
    }

    return(
        <div className="grid grid-flow-col place-self-center place-content-center">
            <input value={searchW} onChange={change} className="rounded-md theme6
               w-[300px] min-[650px]:w-[450px] min-[850px]:w-[600px] h-[40px] min-[290px]:h-[40px] px-4 min-[340px]:px-8 text-sm min-[340px]:text-lg" placeholder="Search for a product..."/>
            <Link className="grid place-self-end absolute " href={
                searchW !== "" ? (`/search/${searchW}`):("/search/empty")    
            }><button className="rounded-md theme1 place-self-end absolute w-[40px] h-[40px] text-2xl ">
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