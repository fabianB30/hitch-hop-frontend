import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "@/pages/main/Home";
import TopConductores from "@/pages/consultas/TopConductores";
import PuntosRecurrentes from "@/pages/consultas/PuntosRecurrentes";
import TopUsuarios from "@/pages/consultas/TopUsuarios";
import NuevosUsuarios from "@/pages/consultas/NuevosUsuarios";
import TopCancelaciones from "@/pages/consultas/TopCancelaciones";
import TopGratis from "@/pages/consultas/TopGratis";
import TopViajesCaros from "@/pages/consultas/TopViajesCaros";
import TotalViajes from "@/pages/consultas/TotalViajes";
import PromedioMonto from "@/pages/consultas/PromedioMonto";
import SidebarAdmin from "@/components/shared/SidebarAdmin";
import Bienvenida from "@/pages/main/Bienvenida";

import ConsultasTemp from "../components/shared/temp/ConsultasTemp";
import StatisticsPage from "../pages/statistics/StatisticsPage";
import ProfileSettings from "@/pages/ProfileSettings";
import UsersManagement from "@/pages/UsersManagement";
import Register from "@/pages/1.1-registro-de-usuario/Register";
import RegisterSuccessful from "@/pages/1.1-registro-de-usuario/RegisterSuccessful";
import Login from "@/pages/1.3-inicio-de-sesion/Login";
import DownloadApp from "@/pages/1.3-inicio-de-sesion/download-app";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Página de inicio sin sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="/bienvenida" element={<Bienvenida />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/download-app" element={<DownloadApp />} />
      <Route path="/registro-exitoso" element={<RegisterSuccessful />} />

      {/* Rutas con SidebarAdmin */}
      <Route path="/" element={<SidebarAdmin />}>
        <Route path="estadistica" element={<StatisticsPage />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/users-management" element={<UsersManagement />} />
        <Route path="consultas" element={<ConsultasTemp />}>
          <Route path="top-conductores" element={<TopConductores />} />
          <Route path="puntos-recurrentes" element={<PuntosRecurrentes />} />
          <Route path="top-usuarios" element={<TopUsuarios />} />
          <Route path="usuarios-nuevos" element={<NuevosUsuarios />} />
          <Route path="top-cancelaciones" element={<TopCancelaciones />} />
          <Route path="top-gratis" element={<TopGratis />} />
          <Route path="top-viajes-caros" element={<TopViajesCaros />} />
          <Route path="total-viajes" element={<TotalViajes />} />
          <Route path="promedio-monto" element={<PromedioMonto />} />
        </Route>
      </Route>
    </>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
