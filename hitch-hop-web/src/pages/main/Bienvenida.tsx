// Autores: Fabián Bustos 
// Página de bienvenida de admin, primera vista que se muestra al iniciar sesión
// desde acá el usuario puede acceder a los diferentes módulos de administración

import logo from "@/assets/logo.png";
import Boton1 from "@/assets/mainBtn1.svg";
import Boton2 from "@/assets/mainBtn2.svg";
import Boton3 from "@/assets/mainBtn3.svg";
import Boton4 from "@/assets/mainBtn4.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/Context/auth-context";
import { useNavigate } from "react-router-dom";

export default function Bienvenida() {
  const { logout } = useAuth(); // función de logout de admin
  
  const navigate = useNavigate();

  /*
   * Cierra la sesión de un usuario, y navega a página inicial de donde puede iniciar otra sesión
   */
  const handleLogout = async () => {
    try {
      await logout(); 
      console.log("Usuario logged out");
      navigate("/");
      
    } catch (error) {
      console.error("Error al hacer logout", error);
    }
  }

  return (
    
    <div className="flex min-h-screen">
    {/* todo usa flex */}

      {/* columna izquierda */}
      <div className="w-[35%] max-w-[500px] p-8 flex flex-col gap-6 text-center">
        {/* logo y bienvenido message */}
        {/* ya está un poco más responsive  */}
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
          <h1 className="text-4xl xl:text-5xl font-bold max-w-md">
            Bienvenido a la página de administración
          </h1>
        </div>

        {/* espaciador medio responsive */}
        <div className="flex-grow" />

        {/* Centered content: Description and Button */}
        <div className="flex flex-col gap-4 max-w-md self-center items-center">
          <p className="text-lg xl:text-xl font-medium">
            Desde aquí podrá gestionar usuarios, actualizar su perfil, realizar
            consultas y acceder a estadísticas clave del sistema.
          </p>
          <p className="text-lg xl:text-xl font-medium">
            Todo lo que necesita para mantener el control, en un mismo lugar.
          </p>
        </div>

        {/* espaciador medio responsive */}
        {/* solo que este es para que el boton de logout salga al fondo de la pantalla */}

        <div className="flex-grow" />

        <div className="flex justify-center">
          <Button 
            className="bg-[color:var(--primary-300)] px-6 py-3 text-lg"
            onClick={handleLogout}
            >
            <LogOut className="mr-2"/>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* columna derecha */}
      <div className="flex-1 p-8">

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full max-w-[1000px]">

          {/* no tienen el punto ese blanco en el centro pero ni se nota y lo hace menos usable :P */}

            <Link to={"/users-management"}>
              <img
                src={Boton1}
                alt="Gestión de Usuarios"
                className="w-full max-w-[320px] h-auto"
              />
            </Link>


            <Link to={"/profile-settings"}>
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
