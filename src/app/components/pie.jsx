import Image from "next/image";
import logo from "@/app/images/logo.png";
import fb_icon from "@/app/images/fb_icon.png";
import ig_icon from "@/app/images/ig_icon.png";
import Link from "next/link";

export default function Pie(props) {
  return (
    <div className="grid theme2 w-full min-[550px]:h-[300px] mt-4 overflow-hidden">
        <div className="grid grid-flow-row min-[550px]:grid-flow-col place-content-center grid-rows-2 min-[950px]:grid-cols-4 min-[950px]:grid-rows-1 place-self-center place-items-start gap-4 min-[950px]:gap-8 pt-12 pb-8 w-[85%] min-[1300px]:w-[70%]">
            <div className="grid grid-flow-col min-[950px]:grid-flow-row place-self-start place-content-center place-items-start gap-4">
                <div>
                  <Link href="/" className="cursor-pointer">
                    <Image
                        src={logo}
                        alt="no image"
                        width={400}
                        height={400}
                        className="mx-auto w-[90px] h-[90px] min-[950px]:w-[150px] min-[950px]:h-[150px]"
                    />
                  </Link>
                </div>
                <div className="grid grid-flow-row min-[950px]:grid-flow-col place-self-center place-content-center place-items-center text-xl gap-2 min-[950px]:gap-4">
                    <div>
                      <Link href="https://www.facebook.com/laboutiquedelcervecero">
                      <Image
                          src={fb_icon}
                          alt="Facebook Icon"
                          width={40}
                          height={40}
                          className="grid place-self-center cursor-pointer"
                      />
                      </Link>
                    </div>
                    <div>
                      <Link href="https://www.instagram.com/laboutiquedelcervecero/">
                      <Image
                          src={ig_icon}
                          alt="Instagram Icon"
                          width={40}
                          height={40}
                          className="grid place-self-center cursor-pointer"
                      />
                      </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-flow-row place-self-start place-content-start place-items-start gap-2 min-[950px]:gap-4">
              <div className="text-lg min-[950px]:text-xl font-semibold">Sobre Nosotros</div>
              <div className="text-xs grid grid-flow-row gap-2">Tienda suministros que se encarga<br/> de vender de insumos, equipos y accesorios<br/> para elaborar cerveza artesanal.</div>
            </div>
            <div className="grid grid-flow-row place-self-start place-content-start place-items-start gap-2 min-[950px]:gap-4">
              <div className="text-lg min-[950px]:text-xl font-semibold">Contacto</div>
              <div className="text-xs grid grid-flow-row gap-2">
                <div>contacto@laboutiquedelcervecero.com.ar</div>
                <div>Av. Gral. Paz 7826, S3000 Santa Fe</div>
                <div>Tel: +54 9 3425 40-5310</div>
              </div>
            </div>
            <div className="grid grid-flow-row place-self-start place-content-center place-items-start gap-2 min-[950px]:gap-4">
              <div className="text-lg min-[950px]:text-xl font-semibold">Ayuda</div>
              <div className="text-xs grid grid-flow-row gap-2">Preguntas frecuentes</div>
            </div>
        </div>
        <div className="grid place-content-center w-full theme4 p-4 text-center">
          <div>© 2025 Luengo Cervezas S.A.S. Todos los derechos reservados</div>
        </div>
    </div>
  )    
}

/*
    <div className="grid theme2 w-full h-[300px] mt-4">
        <div className="grid grid-flow-col place-content-center grid-rows-2 min-[950px]:grid-cols-4 min-[950px]:grid-rows-1 place-self-center place-items-start gap-4 min-[950px]:gap-8 pt-12 pb-8 w-[85%] min-[1300px]:w-[70%]">
            <div className="grid grid-flow-col min-[950px]:grid-flow-row place-self-start place-content-center place-items-start gap-4">
                <div>
                    <Image
                        src={logo}
                        alt="no image"
                        width={400}
                        height={400}
                        className="mx-auto w-[90px] h-[90px] min-[950px]:w-[150px] min-[950px]:h-[150px]"
                    />
                </div>
                <div className="grid grid-flow-row min-[950px]:grid-flow-col place-self-center place-content-center place-items-center text-xl gap-2 min-[950px]:gap-4">
                    <div>
                      <Image
                          src={fb_icon}
                          alt="Facebook Icon"
                          width={40}
                          height={40}
                          className="grid place-self-center"
                      />
                    </div>
                    <div>
                      <Image
                          src={ig_icon}
                          alt="Instagram Icon"
                          width={40}
                          height={40}
                          className="grid place-self-center"
                      />
                    </div>
                </div>
            </div>

            <div className="grid grid-flow-row place-self-start place-content-start place-items-start gap-2 min-[950px]:gap-4">
              <div className="text-lg min-[950px]:text-xl font-semibold">Sobre Nosotros</div>
              <div className="text-xs grid grid-flow-row gap-2">Tienda suministros que se encarga<br/> de vender de insumos, equipos y accesorios<br/> para elaborar cerveza artesanal.</div>
            </div>
            <div className="grid grid-flow-row place-self-start place-content-start place-items-start gap-2 min-[950px]:gap-4">
              <div className="text-lg min-[950px]:text-xl font-semibold">Contacto</div>
              <div className="text-xs grid grid-flow-row gap-2">
                <div>contacto@laboutiquedelcervecero.com.ar</div>
                <div>Av. Gral. Paz 7826, S3000 Santa Fe</div>
                <div>Tel: +54 9 3425 40-5310</div>
              </div>
            </div>
            <div className="grid grid-flow-row place-self-start place-content-center place-items-start gap-2 min-[950px]:gap-4">
              <div className="text-lg min-[950px]:text-xl font-semibold">Ayuda</div>
              <div className="text-xs grid grid-flow-row gap-2">Preguntas frecuentes</div>
            </div>
        </div>
        <div className="grid place-content-center w-full theme4 p-4">
          <div>© 2025 Luengo Cervezas S.A.S. Todos los derechos reservados</div>
        </div>
    </div>
*/