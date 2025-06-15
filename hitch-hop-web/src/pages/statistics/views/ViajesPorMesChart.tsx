import { useState } from "react";
import FiltrosPanel from "../components/FiltrosPanel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ViajesPorMesChart = () => {
  const [filtros, setFiltros] = useState<any>(null);

  const handleFiltros = (filtrosAplicados: any) => {
    console.log("Filtros Viajes por Mes:", filtrosAplicados);
    setFiltros(filtrosAplicados);
  };

  const data = [
    { name: "Mayo", valor1: 60 },
    { name: "Junio", valor1: 70 },
    { name: "Julio", valor1: 65 },
    { name: "Agosto", valor1: 80 },
  ];

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
            <Bar dataKey="valor1" fill="#7875F8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViajesPorMesChart;
