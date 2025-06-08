import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const GratuitosCobradosChart = () => {
  const data = [
    { name: "Ene", valor1: 20, valor2: 5 },
    { name: "Feb", valor1: 30, valor2: 10 },
    { name: "Mar", valor1: 25, valor2: 8 },
    { name: "Abr", valor1: 35, valor2: 12 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Gratuitos Cobrados</h2>
          <p className="text-sm text-gray-500">Comparativa de viajes</p>
        </div>
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
  );
};

export default GratuitosCobradosChart;
