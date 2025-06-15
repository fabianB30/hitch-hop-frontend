import { useState, useEffect } from "react";
import { Cell, ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import { statisticsTripPassengerApprovalStatsRequest } from "../../../interconnection/statistics"

const PasajerosPorViajeChart = () => {
  const [dataPie, setDataPie] = useState(null);
  const colores = ["#FFBA2A", "#7987FF", "#A155B9"];
  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await statisticsTripPassengerApprovalStatsRequest();
        if (stats && typeof stats === "object") {
          const dataPieRes = Object.entries(stats).map(([key, value]) => ({
            name: `${key} pasajero${key === "1" ? "" : "s"}`,
            value: value
          }));
          setDataPie(dataPieRes);
        }
      } catch (error) {
        console.error("Error al obtener distribución de pasajeros por viaje:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Pasajeros Por Viaje</h2>
          <p className="text-sm text-gray-500">Promedios por trayecto</p>
        </div>
      </div>
      {dataPie ? (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={dataPie}
              dataKey="value"
              nameKey="name"
              cx={"50%"}
              cy={"50%"}
              outerRadius={120}
              label
            >
              {dataPie.map((_entry, index) => (
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
      ) : (
        <div className="text-gray-500 text-center py-12">Cargando datos...</div>
      )
    };
    </div>
  );
};

export default PasajerosPorViajeChart;
