import { useState } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";

const FiltrosPanel = () => {
  const [institucion, setInstitucion] = useState("todas");
  const [genero, setGenero] = useState("todos");
  const [fecha, setFecha] = useState("01/01/25 - 12/12/25");

  return (
    <aside className="w-64 min-w-[240px] bg-white rounded-xl shadow p-6 border border-gray-200 h-fit">
      <h3 className="text-lg font-semibold text-[#171717] mb-6">Filtros</h3>

      {/* Institución */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#171717] mb-1">Institución</label>
        <div className="relative">
          <select
            value={institucion}
            onChange={(e) => setInstitucion(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm appearance-none pr-8"
          >
            <option value="todas">Todas las instituciones</option>
            <option value="inst1">Institución 1</option>
            <option value="inst2">Institución 2</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Rango de Fecha */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#171717] mb-1">Rango de Fecha</label>
        <div className="flex items-center border border-gray-300 px-3 py-2 rounded-md text-sm gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="text-[#171717]">{fecha}</span>
          <ChevronDown className="ml-auto w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Género */}
      <div>
        <label className="block text-sm font-medium text-[#171717] mb-1">Género</label>
        <div className="relative">
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm appearance-none pr-8"
          >
            <option value="todos">Todos los géneros</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </aside>
  );
};

export default FiltrosPanel;
