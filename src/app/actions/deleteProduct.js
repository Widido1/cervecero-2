"use server"

import { redirect } from "next/navigation";
import { prisma } from "../libs/prisma";
import { revalidatePath } from "next/cache";

export default async function DeleteProduct(id){
    await prisma.product.delete({
        where:{
            id: id,
        }
    });
    revalidatePath('/', 'layout')
    redirect("/cervecero")
}