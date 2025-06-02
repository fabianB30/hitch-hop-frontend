import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ViajesPorFranjaHorariaChart = () => {
  const data = [
    { name: "Mañana", valor1: 35 },
    { name: "Tarde", valor1: 40 },
    { name: "Noche", valor1: 20 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Viajes Por Franja Horaria</h2>
          <p className="text-sm text-gray-500">Distribución horaria</p>
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

export default ViajesPorFranjaHorariaChart;
