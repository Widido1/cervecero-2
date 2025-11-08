
import About from "../components/about";

export const metadata = {
  title: "Sobre Nosotros - La Boutique del Cervecero",
  description: "Conoce nuestra historia y pasión por la cerveza artesanal. Proveedores de insumos y equipos de calidad para cerveceros.",
}

export default async function AboutPage() {

  return (
    <div>
      <About/>
    </div>
  )    
}