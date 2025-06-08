import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ViajesPorMesChart = () => {
  const data = [
    { name: "Mayo", valor1: 60 },
    { name: "Junio", valor1: 70 },
    { name: "Julio", valor1: 65 },
    { name: "Agosto", valor1: 80 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Viajes Por Mes</h2>
          <p className="text-sm text-gray-500">Total mensual</p>
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

export default ViajesPorMesChart;
