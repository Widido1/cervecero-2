// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "./context/cart-context";
import ToastCart from "./components/toastCart";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "La Boutique del Cervecero",
  description: "Tu tienda online de insumos, equipos y accesorios para elaborar cerveza artesanal.",
  icons: {
    icon: '/favicon.ico',
    // Agrega otros iconos si los tienes
    // apple: '/apple-touch-icon.png',
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {children}
          <ToastCart />
        </CartProvider>
      </body>
    </html>
  );
}