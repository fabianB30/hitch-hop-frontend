import { useState, useEffect } from "react";
import { Cell, ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import { statisticsFreeVsChargedTripsRequest } from "../../../interconnection/statistics"

const GratuitosCobradosChart = () => {
  const [dataPie, setDataPie] = useState(null);
  const colores = ["#FFBA2A", "#7987FF"];
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await statisticsFreeVsChargedTripsRequest();
        console.log(res);
        if (res) {
          const dataPieRes = [{
            name: "Gratuitos",
            value: res.freeCount,
            proportion: res.freeProportion
          },
          {
            name: "Cobrados",
            value: res.paidCount,
            proportion: res.paidProportion
          }
        ];
          setDataPie(dataPieRes);
        }
      } catch (error) {
        console.error("Error al obtener distribución de viajes gratuitos vs cobrados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold">Gratuitos Cobrados</h2>
          <p className="text-sm text-gray-500">Comparativa de viajes</p>
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
      }
    </div>
  );
};

export default GratuitosCobradosChart;
