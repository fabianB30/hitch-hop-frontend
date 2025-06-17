import { useState } from "react";
import FiltrosPanel from "../components/FiltrosPanel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { filteredTripCountByMonthRequest } from "../../../interconnection/statistics"

const ViajesPorMesChart = () => {
  const [filtros, setFiltros] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const meses = [
    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const handleFiltros = async (filtrosAplicados: any) => {
    console.log("Filtros Viajes por Mes:", filtrosAplicados);
    setFiltros(filtrosAplicados);
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const payload = {
      institutionId: filtrosAplicados.institucion ? filtrosAplicados.institucion : "all",
      startDate: filtrosAplicados.fecha.desde ? filtrosAplicados.fecha.desde : startDate.toISOString().split("T")[0],
      endDate: filtrosAplicados.fecha.hasta ? filtrosAplicados.fecha.hasta : endDate.toISOString().split("T")[0],
      hourStart: "00:00:00",
      hourEnd: "23:59:59"
    }
    try {
      const res = await filteredTripCountByMonthRequest(payload);
      if (Array.isArray(res)) {
        const formattedData = res.map((item: any) => ({
          name: `${meses[item.month]} ${item.year}`,
          cantidad: item.count,
        }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };
  return (
    <div className="flex gap-6">
      <FiltrosPanel showInstitucion showFecha onSubmit={handleFiltros} />
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Viajes por Mes</h2>
        <p className="text-sm text-gray-500 mb-4">Total mensual</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#7875F8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViajesPorMesChart;
