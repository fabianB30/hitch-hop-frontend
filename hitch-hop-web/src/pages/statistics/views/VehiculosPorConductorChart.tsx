import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const VehiculosPorConductorChart = () => {
  const data = [
    { name: "1 vehículo", valor1: 40, valor2: 0 },
    { name: "2 vehículos", valor1: 25, valor2: 0 },
    { name: "3 o más", valor1: 10, valor2: 0 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Vehículos Por Conductor</h2>
          <p className="text-sm text-gray-500">Distribución de vehículos</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor1" fill="#7875F8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehiculosPorConductorChart;
