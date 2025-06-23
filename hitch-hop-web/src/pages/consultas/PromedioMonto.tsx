/**
 * Componente PromedioMonto
 * -------------------------
 * Muestra el promedio de monto cobrado por conductor, con funciones de búsqueda,
 * filtrado por orden (mayor/menor), ordenamiento por columnas, y paginación.
 *
 * Autor: Jose Andrés Benavides Díaz
 * Fecha de creación: 2025-06-20
 */

import { useEffect, useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { queryAverageRevenuePerDriver } from "../../interconnection/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Interfaz que representa la información del ingreso promedio por conductor.
 */
interface AverageRevenue {
  driverId: string;
  name: string;
  email: string;
  averageRevenue: number;
  totalRevenue: number;
  tripCount: number;
}

type SortColumn = "email" | "name" | "tripCount" | "averageRevenue";

/**
 * Componente funcional que permite visualizar y consultar el promedio de cobros por conductor.
 */
export default function PromedioMonto() {
  const [data, setData] = useState<AverageRevenue[]>([]);
  const [filteredData, setFilteredData] = useState<AverageRevenue[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterOrder, setFilterOrder] = useState<"todos" | "mayor" | "menor">("todos");
  const [sortColumn, setSortColumn] = useState<SortColumn>("email");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  // Carga los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      const result = await queryAverageRevenuePerDriver();
      if (Array.isArray(result)) {
        setData(result);
        setFilteredData(result); // Mostrar todos los datos al inicio
      }
    };
    fetchData();
  }, []);

  /**
   * Cambia el orden de ordenamiento de una columna al hacer clic en el encabezado.
   */
  const toggleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
    setCurrentPage(0);
  };

  /**
   * Función comparadora que aplica el ordenamiento según la columna seleccionada.
   */
  const compare = (a: AverageRevenue, b: AverageRevenue) => {
    let aVal: any = a[sortColumn];
    let bVal: any = b[sortColumn];

    if (typeof aVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    } else {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
  };

  /**
   * Aplica los filtros de búsqueda y ordenamiento por monto promedio.
   * También ordena la tabla con base en la columna seleccionada.
   */
  const handleSearchAndFilter = () => {
    let temp = [...data];

    // Filtro por texto (email)
    if (searchText) {
      temp = temp.filter((item) =>
        item.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtro por monto promedio (mayor o menor)
    if (filterOrder === "mayor") {
      temp.sort((a, b) => b.averageRevenue - a.averageRevenue);
    } else if (filterOrder === "menor") {
      temp.sort((a, b) => a.averageRevenue - b.averageRevenue);
    }

    // Aplica el ordenamiento por columna seleccionada
    temp.sort(compare);

    setFilteredData(temp);
    setCurrentPage(0);
  };

  // Datos paginados
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="font-exo text-[48px] font-bold leading-none tracking-[0.2px] text-[#171717]">
        Consultas
      </h1>
      <h2 className="mt-2 font-exo text-[20px] font-semibold leading-normal text-black">
        Promedio de cobro por conductor
      </h2>

      {/* Filtros y búsqueda */}
      <div className="mt-4 flex gap-4 items-center">
        <Input
          placeholder="Buscar usuario..."
          className="w-[405px] h-[40px] px-[12px] py-[8px] border border-[#E0E0E0] rounded-[8px] bg-white text-base"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          value={filterOrder}
          onValueChange={(value) =>
            setFilterOrder(value as "todos" | "mayor" | "menor")
          }
        >
          <SelectTrigger className="w-[110px] h-[38px] px-[12px] border border-[#D3D3D3] rounded-[8px] bg-[#FFC750]">
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="mayor">Mayor</SelectItem>
            <SelectItem value="menor">Menor</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleSearchAndFilter}
          className="h-[38px] px-[16px] rounded-[8px] border border-[#7875F8] bg-[#7875F8] text-white font-semibold"
        >
          Buscar
        </Button>
      </div>

      {/* Tabla de resultados */}
      <div
        className="mt-6 w-[1091px] rounded-[32px] border border-[#D3D3D3] shadow-[0px_2px_10px_rgba(38,38,38,0.10)] p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(0deg, rgba(255,252,242,0.73), rgba(255,252,242,0.73)), url(${fondoConsultas}) center / cover no-repeat`,
        }}
      >
        <div className="w-full rounded-lg border border-[#D3D3D3] bg-white/60 backdrop-blur-sm text-[#262626] overflow-auto">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-[#FFC750AA] text-[#262626] font-exo text-[16px] font-semibold">
              <tr className="h-[58px]">
                {/* Encabezados con ordenamiento */}
                <th className="px-6 text-left truncate">
                  <Button variant="ghost" size="sm" className="text-[16px] font-exo font-semibold flex items-center gap-1" onClick={() => toggleSort("email")}>
                    Usuario {sortColumn === "email" && (sortAsc ? <ChevronDown size={16} /> : <ChevronUp size={16} />)}
                  </Button>
                </th>
                <th className="px-6 text-left truncate">
                  <Button variant="ghost" size="sm" className="text-[16px] font-exo font-semibold flex items-center gap-1" onClick={() => toggleSort("name")}>
                    Nombre {sortColumn === "name" && (sortAsc ? <ChevronDown size={16} /> : <ChevronUp size={16} />)}
                  </Button>
                </th>
                <th className="px-6 text-left truncate">Institución</th>
                <th className="px-6 text-left truncate">
                  <Button variant="ghost" size="sm" className="text-[16px] font-exo font-semibold flex items-center gap-1" onClick={() => toggleSort("tripCount")}>
                    Cantidad de viajes {sortColumn === "tripCount" && (sortAsc ? <ChevronDown size={16} /> : <ChevronUp size={16} />)}
                  </Button>
                </th>
                <th className="px-6 text-left truncate">
                  <Button variant="ghost" size="sm" className="text-[16px] font-exo font-semibold flex items-center gap-1" onClick={() => toggleSort("averageRevenue")}>
                    Monto promedio {sortColumn === "averageRevenue" && (sortAsc ? <ChevronDown size={16} /> : <ChevronUp size={16} />)}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((d) => (
                  <tr
                    key={d.driverId}
                    className="bg-[#FFF9ED] border-b border-[#FFBA2A] font-exo text-[#171717] text-[16px] h-[58px]"
                  >
                    <td className="px-6 truncate whitespace-nowrap" title={d.email}>{d.email}</td>
                    <td className="px-6 truncate whitespace-nowrap" title={d.name}>{d.name}</td>
                    <td className="px-6 truncate whitespace-nowrap">—</td>
                    <td className="px-6">{d.tripCount}</td>
                    <td className="px-6">₡{d.averageRevenue.toLocaleString("es-CR")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-[#555] font-exo">
                    No hay montos promedio registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="mt-4 w-full flex justify-between items-center">
          <div className="text-black font-exo text-[20px] font-semibold">
            Mostrando {paginatedData.length} de {filteredData.length} resultados
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="text-[#F57301] border-[#F57301]"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              className="text-[#F57301] border-[#F57301]"
              onClick={() =>
                setCurrentPage((prev) =>
                  (prev + 1) * itemsPerPage < filteredData.length ? prev + 1 : prev
                )
              }
              disabled={(currentPage + 1) * itemsPerPage >= filteredData.length}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
