'use server';

import { prisma } from "../libs/prisma";

// Solo esta función, nada más
export async function updateAllProducts(changedProducts) {
  try {
    // Validación mínima
    if (!changedProducts?.length) {
      throw new Error('No hay productos para actualizar');
    }

    // Actualizar en la base de datos
    const updates = changedProducts.map(product =>
      prisma.product.update({
        where: { id: product.id },
        data: {
          price: parseFloat(product.price),
          stock: parseInt(product.stock),
        },
      })
    );

    await prisma.$transaction(updates);
    
    return { success: true };
    
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error al guardar: ' + error.message);
  }
}