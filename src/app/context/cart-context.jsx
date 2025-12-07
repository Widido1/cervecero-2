"use client";

import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    // Auto-ocultar después de 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
      showNotification(`${item.name} actualizado en el carrito`, "success");
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      showNotification(`${item.name} agregado al carrito`, "success");
    }
  };

  const addMultipleCart = (item, number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + number } : cartItem
      ));
      showNotification(`${number} ${item.name}(s) agregados al carrito`, "success");
    } else {
      setCart([...cart, { ...item, quantity: number }]);
      showNotification(`${number} ${item.name}(s) agregados al carrito`, "success");
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
        showNotification(`Cantidad de ${item.name} disminuida`, "info");
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
        showNotification(`${item.name} eliminado del carrito`, "warning");
    }
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Carrito vaciado", "info");
  };



  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, decreaseFromCart, addMultipleCart, notification}}>
      {children}
    </CartContext.Provider>
  );
}