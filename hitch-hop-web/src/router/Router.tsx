import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";   
import Home from "@/pages/main/Home";
import SidebarAdmin from "@/components/shared/SidebarAdmin";
import Bienvenida from "@/pages/main/Bienvenida";

// imports de paginas temporales, reemplazan por los suyos
import InicioTemp from "../components/shared/temp/InicioTemp";
import GestionTemp from "../components/shared/temp/GestionTemp";
import PerfilTemp from "../components/shared/temp/PerfilTemp";
import ConsultasTemp from "../components/shared/temp/ConsultasTemp";
import StatisticsPage from "../pages/statistics/StatisticsPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Página de inicio sin sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="/bienvenida" element={<Bienvenida />} />

      {/* Rutas con SidebarAdmin */}
      <Route path="/" element={<SidebarAdmin />}>
        <Route path="inicio" element={<InicioTemp />} />
        <Route path="gestion" element={<GestionTemp />} />
        <Route path="perfil" element={<PerfilTemp />} />
        <Route path="consultas" element={<ConsultasTemp />} />
        <Route path="estadistica" element={<StatisticsPage />} />
      </Route>
    </>
  )
);

const Router = () => <RouterProvider router={router}/>

export default Router; 