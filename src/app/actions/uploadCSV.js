'use server';

import { prisma } from "../libs/prisma";


export async function actualizarPrecios(productos) {
  try {
    let actualizados = 0;
    
    for (const producto of productos) {
      const resultado = await prisma.product.updateMany({
        where: { 
          code: String(producto.codigo).trim() 
        },
        data: { 
          price: Number(producto.precio) 
        }
      });
      
      if (resultado.count > 0) {
        actualizados++;
      }
    }
    
    return {
      success: true,
      message: `Actualizados ${actualizados} productos`,
      actualizados
    };
    
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}