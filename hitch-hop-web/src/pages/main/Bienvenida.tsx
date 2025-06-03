import logo from "@/assets/logo.png";
import Boton1 from "@/assets/mainBtn1.svg";
import Boton2 from "@/assets/mainBtn2.svg";
import Boton3 from "@/assets/mainBtn3.svg";
import Boton4 from "@/assets/mainBtn4.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Bienvenida() {
  return (
    
    <div className="flex h-screen">
    {/* todo usa flex */}

      {/* columna izquierda */}
      <div className="w-2/5  p-8 flex flex-col gap-6 text-center">
        {/* logo y bienvenido message */}
        {/* podria estar mejor acomodado :P  */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo HitchHop" className="w-[44px] h-auto" />
            <span
              className="text-[40px] font-extrabold text-[#171717]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              HitchHop
            </span>
          </div>
          <h1 className="text-5xl font-bold max-w-md">
            Bienvenido a la página de administración
          </h1>
        </div>

        {/* espaciador medio responsive */}
        <div className="flex-grow" />

        {/* Centered content: Description and Button */}
        <div className="flex flex-col gap-4 max-w-md self-center items-center">
          <p className="text-xl font-medium">
            Desde aquí podrá gestionar usuarios, actualizar su perfil, realizar
            consultas y acceder a estadísticas clave del sistema.
          </p>
          <p className="text-xl font-medium">
            Todo lo que necesita para mantener el control, en un mismo lugar.
          </p>
        </div>

        {/* espaciador medio responsive */}
        {/* solo que este es para que el boton de logout salga al fondo de la pantalla */}

        <div className="flex-grow" />

        <div className="flex justify-center">
          <Button className="bg-[color:var(--primary-300)] w-[166px]">
            <LogOut />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* columna derecha */}
      <div className="w-3/5 p-8">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full max-w-[800px]">

          {/* no tienen el punto ese blanco en el centro pero ni se nota y lo hace menos usable :P */}

            <Link to={"/gestion"}>
              <img
                src={Boton1}
                alt="Gestión de Usuarios"
                className="w-full max-w-[320px] h-auto"
              />
            </Link>


            <Link to={"/perfil"}>
              <img
                src={Boton2}
                alt="Gestión de Perfil"
                className="w-full max-w-[320px] h-auto"
              />
            </Link>

            <Link to={"/consultas"}>
              <img
                src={Boton3}
                alt="Consultas"
                className="w-full max-w-[320px] h-auto"
              />
            </Link>

            <Link to={"/estadistica"}>
              <img
                src={Boton4}
                alt="Estadísticas"
                className="w-full max-w-[320px] h-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
