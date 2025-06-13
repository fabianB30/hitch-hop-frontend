import { useEffect, useState } from "react";
import ConductoresChart from "./views/ConductoresChart";
import PasajerosChart from "./views/PasajerosChart";
import EdadChart from "./views/EdadChart";
import GratuitosCobradosChart from "./views/GratuitosCobradosChart";
import VehiculosPorConductorChart from "./views/VehiculosPorConductorChart";
import PasajerosPorViajeChart from "./views/PasajerosPorViajeChart";
import ViajesPorFranjaHorariaChart from "./views/ViajesPorFranjaHorariaChart";
import ViajesPorMesChart from "./views/ViajesPorMesChart";
import FiltrosPanel from "./components/FiltrosPanel";
import CardResumen from "./components/CardResumen";
import {userStatisticsRequest} from "../../interconnection/statistics"

const StatisticsPage = () => {
  const [activeTab, setActiveTab] = useState("conductores");

  const tabs = [
    { key: "conductores", label: "Conductores" },
    { key: "pasajeros", label: "Pasajeros" },
    { key: "edad", label: "Demografía de Edad" },
    { key: "gratuitos", label: "Gratuitos vs. Cobrados" },
    { key: "vehiculos", label: "Vehículos por Conductor" },
    { key: "pasajerosViaje", label: "Pasajeros por Viaje" },
    { key: "franja", label: "Viajes por Franja Horaria" },
    { key: "viajesMes", label: "Viajes por Mes" },
  ];

  //app.get("/backend/statistics/users", statisticsController.userStatistics);

/*const result = {
      totalDrivers: users[0].totalDrivers[0]?.count || 0,
      totalPassengers: users[0].totalPassengers[0]?.count || 0,
      totalActiveUsers: users[0].totalActive[0]?.count || 0,
      averageAge: users[0].avgAge[0]?.avgAge ? Math.round(users[0].avgAge[0].avgAge * 100) / 100 : null
    };*/
  const [resumen, setResumen] = useState([
    { titulo: "Total de Conductores", valor: "-", cambio: "" },
    { titulo: "Total de Pasajeros", valor: "-", cambio: "" },
    { titulo: "Usuarios Activos", valor: "-", cambio: "" },
    { titulo: "Edad Promedio", valor: "-", cambio: "" }
  ]);
  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await userStatisticsRequest();
        console.log(stats);
        if (stats) {
          setResumen([
            {
              titulo: "Total de Conductores",
              valor: stats.totalDrivers,
              cambio: "+12%",
            },
            {
              titulo: "Total de Pasajeros",
              valor: stats.totalPassengers,
              cambio: "+12%",
            },
            {
              titulo: "Usuarios Activos",
              valor: stats.totalActiveUsers,
              cambio: "+12%",
            },
            {
              titulo: "Edad Promedio",
              valor: stats.averageAge ?? "N/A",
              cambio: "+12%",
            }
          ]);
        }
      } catch (error) {
        console.error("Error al obtener estadísticas de usuarios:", error);
      }
    }

    fetchData();
  }, []);
/*
  const resumen = [
    {
      titulo: "Total de Conductores",
      valor: "1284",
      cambio: "+12%",
    },
    {
      titulo: "Total de Pasajeros",
      valor: "2089",
      cambio: "+12%",
    },
    {
      titulo: "Usuarios Activos",
      valor: "3373",
      cambio: "+12%",
    },
    {
      titulo: "Edad Promedio",
      valor: "32.4",
      cambio: "+12%",
    },
  ];*/

  const renderChart = () => {
    switch (activeTab) {
      case "conductores":
        return <ConductoresChart />;
      case "pasajeros":
        return <PasajerosChart />;
      case "edad":
        return <EdadChart />;
      case "gratuitos":
        return <GratuitosCobradosChart />;
      case "vehiculos":
        return <VehiculosPorConductorChart />;
      case "pasajerosViaje":
        return <PasajerosPorViajeChart />;
      case "franja":
        return <ViajesPorFranjaHorariaChart />;
      case "viajesMes":
        return <ViajesPorMesChart />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <h1 className="text-[38px] font-bold text-[#171717]">Estadísticas Demográficas</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resumen.map((item, idx) => (
          <CardResumen key={idx} titulo={item.titulo} valor={item.valor} cambio={item.cambio} />
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-[#E9E9E9] rounded-xl px-4 py-[6px] flex gap-2 items-center justify-start overflow-x-auto whitespace-nowrap mb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`h-8 px-4 rounded-lg text-xs font-medium transition ${activeTab === tab.key
                ? "bg-[#ADA7FF] text-black"
                : "bg-[#E9E9E9] text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      {/* Contenido: filtros + gráfico */}
      <div className="flex gap-6 items-start">
        <FiltrosPanel />
        <div className="flex-1">{renderChart()}</div>
      </div>
    </div>
  );
};

export default StatisticsPage;
