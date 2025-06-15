import { useState, useEffect } from "react";
import { Cell, ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import { statisticsVehicleCountByDriverRequest } from "../../../interconnection/statistics"

const VehiculosPorConductorChart = () => {
  
  const [dataPie, setDataPie] = useState(null);
  const colores = ["#FFBA2A", "#7987FF", "#A155B9"];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await statisticsVehicleCountByDriverRequest();
         if (Array.isArray(res)) {
          const dataPieRes = res.map(r => ({
            name: `${r.vehicles} Vehículo${r.vehicles > 1 ? 's' : ''}`,
            value: r.drivers
          }));
          setDataPie(dataPieRes);
        }
      } catch (error) {
        console.error("Error al obtener distribución de vehículos por conductor:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Vehículos por Conductor</h2>
          <p className="text-sm text-gray-500">Información de Vehículos por Conductor</p>
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

export default VehiculosPorConductorChart;
