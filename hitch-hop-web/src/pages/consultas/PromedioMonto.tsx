import { useEffect, useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { queryAverageRevenuePerDriver } from "../../interconnection/queries";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function PromedioMonto() {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("todos");

  const [sortStates, setSortStates] = useState({
    institucion: true,
    monto: true,
  });

  const toggleSort = (column: keyof typeof sortStates) => {
    setSortStates((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryAverageRevenuePerDriver();
        
        if (Array.isArray(result)) {
          setDrivers(result);
        } else {
          console.error("Estructura inesperada:", result);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchData();
  }, []);

  const filteredDrivers = drivers
  .filter((driver) =>
    `${driver.name} ${driver.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (filterOption === "mayor") return b.averageRevenue - a.averageRevenue;
    if (filterOption === "menor") return a.averageRevenue - b.averageRevenue;
    return 0;
  });


  return (
    <div className="p-6">
      <h1
        className="font-exo text-[48px] font-bold leading-none tracking-[0.2px]"
        style={{ color: "var(--text-950)" }}
      >
        Consultas
      </h1>

      <h2
        className="mt-2 font-exo text-[20px] font-semibold leading-normal"
        style={{ color: "#000000" }}
      >
        Promedio de cobro por conductor
      </h2>

      <div className="mt-4 flex gap-4 items-center">
        <Input
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[405px] h-[40px] px-[12px] py-[8px] border border-[#E0E0E0] rounded-[8px] bg-white text-base"
        />
        <Select onValueChange={(value) => setFilterOption(value)} defaultValue="todos">
          <SelectTrigger className="w-[110px] h-[38px] px-[12px] border border-[#D3D3D3] rounded-[8px] bg-[#FFC750]">
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="mayor">Mayor</SelectItem>
            <SelectItem value="menor">Menor</SelectItem>
          </SelectContent>
        </Select>
        <button
          type="button"
          className="inline-flex h-[38px] px-[16px] justify-center items-center gap-[8px] flex-shrink-0 rounded-[8px] border border-[#7875F8] bg-[#7875F8] text-white font-semibold"
        >
          Buscar
        </button>
      </div>

      <div
        className="mt-6 w-[1091px] h-[450px] rounded-[var(--radius-4xl)] border border-[color:var(--border)] shadow-[0px_2px_10px_0px_rgba(38,38,38,0.10)] overflow-hidden p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(0deg, rgba(255,252,242,0.73), rgba(255,252,242,0.73)), url(${fondoConsultas}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="w-[1033px] h-[350px] flex flex-col items-start rounded-lg border border-[#D3D3D3] bg-white/0 backdrop-blur-sm text-[#262626] overflow-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-[#FFC750AA] text-[#262626] font-exo">
              <tr>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Nombre</th>

                <th className="px-4 py-2 text-left">
                  <Button
                    onClick={() => toggleSort("institucion")}
                    variant="ghost"
                    size="sm"
                    className="px-2 py-1 text-[16px] font-semibold text-[#262626] flex items-center gap-1 font-exo"
                  >
                    Institución
                    {sortStates.institucion ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    )}
                  </Button>
                </th>

                <th className="px-4 py-2 text-left text-[16px] font-semibold">Cantidad de viajes</th>

                <th className="px-4 py-2 text-left">
                  <Button
                    onClick={() => toggleSort("monto")}
                    variant="ghost"
                    size="sm"
                    className="px-2 py-1 text-[16px] font-semibold text-[#262626] flex items-center gap-1 font-exo"
                  >
                    Monto promedio
                    {sortStates.monto ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    )}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.driverId} className="border-t text-[15px]">
                  <td className="px-4 py-2">{driver.email}</td>
                  <td className="px-4 py-2">{driver.name}</td>
                  <td className="px-4 py-2">
                    {driver.institution === "685867addd87c1da6b6d6215" ? "Instituto Tecnológico de Costa Rica" : "Otro"}
                  </td>
                  <td className="px-4 py-2">{driver.tripCount}</td>
                  <td className="px-4 py-2">₡{driver.averageRevenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 w-[588px] h-[46px] flex flex-col justify-center text-black font-exo text-[20px] font-semibold">
          Mostrando {filteredDrivers.length} de {filteredDrivers.length} montos promedio
        </div>
      </div>
    </div>
  );
}