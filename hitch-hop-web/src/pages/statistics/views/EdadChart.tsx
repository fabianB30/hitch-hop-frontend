import { useState, useEffect } from "react";
import FiltrosPanel from "../components/FiltrosPanel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { statisticsUserCountByAgeRangesRequest} from "../../../interconnection/statistics"

const EdadChart = () => {
  const [filtros, setFiltros] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const handleFiltros = (f: any) => {
    setFiltros(f);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        /*const ageRanges = [
          { min: 18, max: 25 },
          { min: 26, max: 35 },
          { min: 36, max: 45 },
          { min: 46, max: Infinity }
        ];*/
        const ageRanges = null;
        const payload: any = {
          ranges: ageRanges,
        };

        if (filtros?.institucion) payload.institutionId = filtros.institucion;
        if (filtros?.genero) payload.genre = filtros.genero;

        const res = await statisticsUserCountByAgeRangesRequest(payload);
        console.log(res);
        if (res && Array.isArray(res)) {
          const formattedData = res.map(r => ({
            name: `${r.min}-${r.max === Infinity ? '+' : r.max}`,
            valor1: r.count
            //valor2: r.count
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error al obtener distribución de edad:", error);
      }
    }

    fetchData();
  }, [filtros]);
  return (
    <div className="flex gap-6">
      <FiltrosPanel showInstitucion showGenero showEdad onSubmit={handleFiltros} />
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Edad</h2>
        <p className="text-sm text-gray-500 mb-4">Demografía de edad</p>
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
    </div>
  );
};

export default EdadChart;
