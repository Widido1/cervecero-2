"use server"

import { redirect } from "next/navigation";
import { prisma } from "../libs/prisma";

export default async function DeleteProduct(id){
    await prisma.product.delete({
        where:{
            id: id,
        }
    });
    redirect("/cervecero")
}