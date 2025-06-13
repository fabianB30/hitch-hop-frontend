import { Cell, ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";


const ViajesPorFranjaHorariaChart = () => {
  const data_pie = [
    {
      name: "Mañana",
      value: 642,
    },
    {
      name: "Tarde",
      value: 193,
    },
    {
      name: "Noche",
      value: 449,
    },
  ];
  const colores = ["#FFBA2A", "#7987FF", "#A155B9"];



  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Viajes por Franja Horaria</h2>
          <p className="text-sm text-gray-500">Información de pasajeros por viaje promedio</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data_pie}
            dataKey="value"
            nameKey="name"
            cx={"50%"}
            cy={"50%"}
            outerRadius={120}
            label
          >
            {data_pie.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colores[index % colores.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViajesPorFranjaHorariaChart;
