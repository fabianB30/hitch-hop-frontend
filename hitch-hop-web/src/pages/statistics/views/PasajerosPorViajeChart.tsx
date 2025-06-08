import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PasajerosPorViajeChart = () => {
  const data = [
    { name: "1", valor1: 30 },
    { name: "2", valor1: 45 },
    { name: "3+", valor1: 15 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Pasajeros Por Viaje</h2>
          <p className="text-sm text-gray-500">Promedios por trayecto</p>
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

export default PasajerosPorViajeChart;
