import { useState } from "react";
import { ChevronDown } from "lucide-react";
import RangoFecha from "./RangoFecha";
import { Button } from "@/components/ui/button";
import type { DateRange } from "react-day-picker";

const FiltrosPanel = () => {
  const [institucion, setInstitucion] = useState("todas");
  const [genero, setGenero] = useState("todos");
  const [fecha, setFecha] = useState<DateRange | undefined>(undefined);

  const handleSubmitFiltro = () => {
    const formatDesde = fecha?.from?.toLocaleDateString() || "NA"; 
    const formatHasta = fecha?.to?.toLocaleDateString() || "NA"; 

    const filtros = {
      institucion, 
      genero, 
      fecha: {
        desde: formatDesde, 
        hasta: formatHasta,
      },
    }

    console.log(filtros); 
    // send a Backend 
  };

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
        <div className="relative">
        <RangoFecha value={fecha} onChange={setFecha} />
        </div>
      </div>

      {/* Género */}
      <div className="mb-8">
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

      {/* boton */}
      {/* estoy consciente de que el spacing no es el mismo que entre el resto de componentes, sientase bienvenido a calcular cual seria el spacing correcto */}
      <div>
        <Button 
          className="w-full bg-[color:var(--secondary-200)]"
          onClick={handleSubmitFiltro}
        >
          Aplicar Filtro
        </Button>
      </div>
    </aside>
  );
};

export default FiltrosPanel;
