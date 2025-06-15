import { useState } from "react";
import FiltrosPanel from "../components/FiltrosPanel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


const PasajerosChart = () => {
  const [filtros, setFiltros] = useState<any>(null);

  const handleFiltros = (filtrosAplicados: any) => {
    console.log("Filtros Pasajeros:", filtrosAplicados);
    setFiltros(filtrosAplicados);
  };

  const data = [
    { name: "Ene", valor1: 12, valor2: 18 },
    { name: "Feb", valor1: 17, valor2: 20 },
    { name: "Mar", valor1: 22, valor2: 26 },
    { name: "Abr", valor1: 28, valor2: 30 },
  ];

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
            <Bar dataKey="valor1" stackId="a" fill="#7875F8" />
            <Bar dataKey="valor2" stackId="a" fill="#FFBA2A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PasajerosChart;