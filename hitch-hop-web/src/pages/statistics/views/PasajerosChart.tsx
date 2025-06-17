import { useState } from "react";
import FiltrosPanel from "../components/FiltrosPanel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { filteredUserCountByMonthRequest } from "../../../interconnection/statistics"

const PasajerosChart = () => {
  const [filtros, setFiltros] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const meses = [
    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1);
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const handleFiltros = async (filtrosAplicados: any) => {
    setFiltros(filtrosAplicados);
    const payload = {
      startDate: filtrosAplicados.fecha.desde ? filtrosAplicados.fecha.desde : startDate,
      endDate: filtrosAplicados.fecha.hasta ? filtrosAplicados.fecha.hasta : endDate,
      institutionId: filtrosAplicados.institucion ? filtrosAplicados.institucion : "all",
      genres: filtrosAplicados.genero ? [filtrosAplicados.genero] : ["all"],
      role: "Pasajero"
    }
    try {
      const res = await filteredUserCountByMonthRequest(payload);
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
      <FiltrosPanel showInstitucion showGenero showFecha onSubmit={handleFiltros} />
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Pasajeros</h2>
        <p className="text-sm text-gray-500 mb-4">Información correspondiente</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" stackId="a" fill="#7875F8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PasajerosChart;