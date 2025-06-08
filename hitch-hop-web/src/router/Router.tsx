import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";   
import Home from "@/pages/main/Home";
import SidebarAdmin from "@/components/shared/SidebarAdmin";

// imports de paginas temporales, reemplazan por los suyos
import InicioTemp from "@/components/shared/temp/InicioTemp";
import GestionTemp from "@/components/shared/temp/GestionTemp";
import PerfilTemp from "@/components/shared/temp/PerfilTemp";
import ConsultasTemp from "@/components/shared/temp/ConsultasTemp";
import StatsTemp from "@/components/shared/temp/StatsTemp";
import Login from "@/pages/1.3-inicio-de-sesion/Login";
import DownloadApp from "@/pages/1.3-inicio-de-sesion/download-app";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/download" element={<DownloadApp />} />

            <Route path="/" element={<SidebarAdmin />}>
                <Route index element={<Home />} />
                {/* rutas temporales para el sidebar, acá se cambian por las suyas :) */}
                {/* si su seccion tiene varias pantallas, hacerlas anidadas please */}
                <Route path="inicio" element={<InicioTemp />} />
                <Route path="gestion" element={<GestionTemp />} />
                <Route path="perfil" element={<PerfilTemp />} />
                <Route path="consultas" element={<ConsultasTemp />} />
                <Route path="estadistica" element={<StatsTemp />} />
            </Route>
        </>
    )
    
)

const Router = () => <RouterProvider router={router}/>

export default Router; 