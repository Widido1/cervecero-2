"use client";
import { useContext} from "react";
import { CartContext } from "../context/cart-context";


export const useCart = () => {
//Creamos el provider del contexto
  const cart = useContext(CartContext);

  if (cart === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return cart;
}