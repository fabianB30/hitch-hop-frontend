import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";   
import Home from "@/pages/main/Home";
import TopConductores from "@/pages/consultas/TopConductores";
import PuntosRecurrentes from "@/pages/consultas/PuntosRecurrentes";
import TopUsuarios from "@/pages/consultas/TopUsuarios";
import NuevosUsuarios from "@/pages/consultas/NuevosUsuarios";
import TopCancelaciones from "@/pages/consultas/TopCancelaciones";
import TopGratis from "@/pages/consultas/TopGratis";
import TopViajesCaros from "@/pages/consultas/TopViajesCaros";
import SidebarAdmin from "@/components/shared/SidebarAdmin";

// imports de paginas temporales, reemplazan por los suyos
import InicioTemp from "@/components/shared/temp/InicioTemp";
import GestionTemp from "@/components/shared/temp/GestionTemp";
import PerfilTemp from "@/components/shared/temp/PerfilTemp";
import ConsultasTemp from "@/components/shared/temp/ConsultasTemp";
import StatsTemp from "@/components/shared/temp/StatsTemp";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<SidebarAdmin />}>
            <Route index element={<Home />} />
            <Route path="inicio" element={<InicioTemp />} />
            <Route path="gestion" element={<GestionTemp />} />
            <Route path="perfil" element={<PerfilTemp />} />
            <Route path="consultas" element={<ConsultasTemp />}>
                <Route path="top-conductores" element={<TopConductores />} />
                <Route path="puntos-recurrentes" element={<PuntosRecurrentes />} />
                <Route path="top-usuarios" element={<TopUsuarios />} />
                <Route path="usuarios-nuevos" element={<NuevosUsuarios />} />
                <Route path="top-cancelaciones" element={<TopCancelaciones />} />
                <Route path="top-gratis" element={<TopGratis />} />
                <Route path="top-viajes-caros" element={<TopViajesCaros />} />
            </Route>
            <Route path="estadistica" element={<StatsTemp />} />
        </Route>
    )
    
)

const Router = () => <RouterProvider router={router}/>

export default Router; 