export default function Navbar(){
    
    return(
        <div className="theme2 grid grid-flow-row theme3 place-self-center text-center justify-center items-center w-full px-2 font-bold italic text-3xl
            sm:grid-cols-2 sm:place-self-stretch lg:text-4xl">
            <div className="sm:w-1/3">
                <h1 className="Shine text-3xl min-[290px]:text-5xl">Logo</h1>
            </div>
            <div className="grid grid-flow-col gap-1 min-[290px]:gap-4 auto-cols-3 place-self-center justify-self-center sm:justify-self-end justify-end text-right h-auto
            text-xs min-[290px]:text-sm sm:text-base sm:w-2/3 md:text-lg lg:text-xl">
                <h1>Inicio</h1>
                <h1>Productos</h1>
                <h1>Concursos</h1>
                <h1>Talleres</h1>
                <h1>Contactos</h1>
            </div>
        </div>
    );
}