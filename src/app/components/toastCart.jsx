"use client";

import { useCart } from "../hooks/usecart";

export default function ToastCart() {
  // PASO 2.1: Obtener notificación del contexto
  const { notification, clearNotification } = useCart();

  // PASO 2.2: Si no hay notificación, no renderizar nada
  if (!notification) return null;

  // PASO 2.3: Definir colores según el tipo de notificación
  const getBgColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  // PASO 2.4: Definir iconos según el tipo
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      case "error":
        return "❌";
      default:
        return "✅";
    }
  };

  return (
    // PASO 2.5: Estructura del toast
    <div className="fixed top-4 right-4 z-50 animate-fadeIn">
      <div 
        className={`${getBgColor()} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[200px] max-w-[300px] cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={clearNotification} // PASO 2.6: Permitir cerrar haciendo click
      >
        <span className="text-xl">{getIcon()}</span>
        <span className="font-medium">{notification.message}</span>
      </div>
    </div>
  );
}