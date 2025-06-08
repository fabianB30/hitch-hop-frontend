import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ConductoresChart = () => {
  const data = [
    { name: "Ene", valor1: 10, valor2: 20 },
    { name: "Feb", valor1: 15, valor2: 25 },
    { name: "Mar", valor1: 20, valor2: 22 },
    { name: "Abr", valor1: 30, valor2: 18 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Conductores</h2>
          <p className="text-sm text-gray-500">Información correspondiente</p>
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

export default ConductoresChart;
