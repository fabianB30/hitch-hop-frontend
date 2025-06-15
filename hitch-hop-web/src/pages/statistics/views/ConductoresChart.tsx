import { useState } from "react";
import FiltrosPanel from "../components/FiltrosPanel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { filteredUserCountByMonthRequest } from "../../../interconnection/statistics"

const ConductoresChart = () => {
  const [filtros, setFiltros] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const meses = [
    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const handleFiltros = async (filtrosAplicados: any) => {
    setFiltros(filtrosAplicados);
    const payload = {
      startDate: "1999-06-15T15:00:00.000Z",
      endDate: new Date().toISOString(),
      institutionId: filtrosAplicados.institucion ? filtrosAplicados.institucion : "all",
      genres: filtrosAplicados.genero ? [filtrosAplicados.genero] : ["all"],
      role: "Conductor"
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
      {/* Panel de filtros con institución, fecha y género */}
      <FiltrosPanel
        showInstitucion
        showFecha
        showGenero
        onSubmit={handleFiltros}
      />

      {/* Gráfico de barras */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#171717]">
            Estadísticas de Conductores
          </h2>
          <p className="text-sm text-gray-500">
            Información sobre conductores
          </p>
        </div>

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

export default ConductoresChart;
