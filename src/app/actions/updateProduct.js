"use server"
import { revalidatePath } from "next/cache";
import { prisma } from "../libs/prisma";


export default async function updateProduct(formData){
    const id = formData.get("id");
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = "1";
    const discount = "No";
    const priority = formData.get("priority");
    const productType = formData.get("productType");
    const type = formData.get("type");
    const imageUrl = formData.get("imageUrl");
    const description = formData.get("description");
    const code = formData.get("code");
    const stock = formData.get("stock");

    await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            price: Number(price),
            quantity: quantity,
            discount: discount,
            description: description,
            imageUrl: imageUrl,
            stock: Number(stock),
            code: code,
            priority: Number(priority),
            productType: productType,
            type: type,
        }
    })
    revalidatePath("/cervecero/page");
}