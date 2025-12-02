"use client";

import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const addMultipleCart = (item, number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + number } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: number }]);
    }
  };
  

  const decreaseFromCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        // Si hay más de 1 unidad, disminuye la cantidad en 1
        setCart(cart.map((cartItem) => 
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        ));
      } else {
        // Si solo hay 1 unidad, elimina el producto del carrito
        removeFromCart(item);
      }
    }
  };

  const removeFromCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
        setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  const clearCart = () => {
    setCart([]);
  };



  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, decreaseFromCart, addMultipleCart }}>
      {children}
    </CartContext.Provider>
  );
}