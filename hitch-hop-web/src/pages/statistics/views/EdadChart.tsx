import { useState } from "react";
import FiltrosPanel from "../components/FiltrosPanel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const EdadChart = () => {
  const [filtros, setFiltros] = useState<any>(null);

  const handleFiltros = (f: any) => {
    console.log("Filtros Edad:", f);
    setFiltros(f);
  };

  const data = [
    { name: "18-25", valor1: 14, valor2: 9 },
    { name: "26-35", valor1: 25, valor2: 18 },
    { name: "36-45", valor1: 20, valor2: 22 },
    { name: "46+", valor1: 16, valor2: 10 },
  ];

  return (
    <div className="flex gap-6">
      <FiltrosPanel showInstitucion showGenero showEdad onSubmit={handleFiltros} />
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Edad</h2>
        <p className="text-sm text-gray-500 mb-4">Demografía de edad</p>
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

export default EdadChart;
