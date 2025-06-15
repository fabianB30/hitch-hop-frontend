import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const EdadChart = () => {
  const data = [
    { name: "18-25", valor1: 14, valor2: 9 },
    { name: "26-35", valor1: 25, valor2: 18 },
    { name: "36-45", valor1: 20, valor2: 22 },
    { name: "46+", valor1: 16, valor2: 10 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Edad</h2>
          <p className="text-sm text-gray-500">Demografía de edad</p>
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

export default EdadChart;
