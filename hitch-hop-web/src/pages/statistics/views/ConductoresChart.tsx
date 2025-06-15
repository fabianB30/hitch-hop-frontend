import { useState } from "react";
import FiltrosPanel from "../components/FiltrosPanel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ConductoresChart = () => {
  const [filtros, setFiltros] = useState<any>(null);

  const handleFiltros = (filtrosAplicados: any) => {
    console.log("Filtros de conductores:", filtrosAplicados);
    setFiltros(filtrosAplicados);

    // Aquí es donde tu backend partner puede hacer el fetch con los filtros
    // Ejemplo:
    // fetchConductoresData(filtrosAplicados)
  };

  const data = [
    { name: "Ene", valor1: 10, valor2: 20 },
    { name: "Feb", valor1: 15, valor2: 25 },
    { name: "Mar", valor1: 20, valor2: 22 },
    { name: "Abr", valor1: 30, valor2: 18 },
  ];

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
            <Bar dataKey="valor1" stackId="a" fill="#7875F8" />
            <Bar dataKey="valor2" stackId="a" fill="#FFBA2A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConductoresChart;
