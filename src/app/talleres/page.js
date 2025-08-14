import TalleresPage from "../components/talleresPage";
import noimage from "@/app/images/noimage.webp";

export default function Talleres() {
    const talleres = [
        {name: "Taller de Cerveza Artesanal", description: "Aprende a hacer tu propia cerveza artesanal en este taller de 3 horas.", img: "https://res.cloudinary.com/drh0qrube/image/upload/v1752442505/como_hacer_cerveza_artesanal_kcrglk.webp"},
        {name: "Taller de Cerveza Artesanal Avanzado", description: "Aprende a hacer tu propia cerveza artesanal en este taller de 3 horas.", img: "https://res.cloudinary.com/drh0qrube/image/upload/v1752442505/solutions-for-craft-brewers-640x360_sdfq04.webp"},
        {name: "Taller de Cerveza Artesanal Intermedio", description: "Aprende a hacer tu propia cerveza artesanal en este taller de 3 horas.", img: "https://res.cloudinary.com/drh0qrube/image/upload/v1752442505/Seleccion-de-Ingredientes-cerveza_dahr4x.webp"},
        {name: "Taller de Cerveza Artesanal Básico", description: "Aprende a hacer tu propia cerveza artesanal en este taller de 3 horas.", img: noimage},
    ];
  return (
    <div>
      <TalleresPage talleres={talleres}/>
    </div>
  )    
}