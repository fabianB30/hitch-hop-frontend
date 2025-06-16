import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import RangoFecha from "./RangoFecha";
import { Button } from "@/components/ui/button";
import type { DateRange } from "react-day-picker";
import {getParameterByNameRequest} from "../../../interconnection/paremeter";
import {getAllInstitutionsRequest} from "../../../interconnection/institution";

interface FiltrosPanelProps {
  showInstitucion?: boolean;
  showGenero?: boolean;
  showFecha?: boolean;
  onSubmit: (filtros: any) => void;
}

const FiltrosPanel = ({
  showInstitucion = false,
  showGenero = false,
  showFecha = false,
  onSubmit,
}: FiltrosPanelProps) => {
  const [institucion, setInstitucion] = useState("all");
  const [genero, setGenero] = useState("all");
  const [fecha, setFecha] = useState<DateRange | undefined>(undefined);

  const [instituciones, setInstituciones] = useState<[]>([]);
  const [generos, setGeneros] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const param = await getParameterByNameRequest("Géneros");
        if (Array.isArray(param.parameterList)) {
          setGeneros(param.parameterList);
        }
        const resInstitutions = await getAllInstitutionsRequest();
        if (Array.isArray(resInstitutions)) {
          setInstituciones(resInstitutions);
        }
      } catch (error) {
        console.error("Error al obtener opciones:", error);
      }
    }
    fetchData();
  }, []);


  const handleSubmitFiltro = () => {
    const filtros: any = {};
    if (showInstitucion && institucion !== "all") filtros.institucion = institucion;
    if (showGenero && genero !== "all") filtros.genero = genero;
    if (showFecha) {
      filtros.fecha = {
        desde: fecha?.from?.toLocaleDateString() || null,
        hasta: fecha?.to?.toLocaleDateString() || null,
      };
    }
    onSubmit(filtros);
  };

  return (
    <aside className="w-64 min-w-[240px] bg-white rounded-xl shadow p-6 border border-gray-200 h-fit">
      <h3 className="text-lg font-semibold text-[#171717] mb-6">Filtros</h3>

      {showInstitucion && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Institución</label>
          <div className="relative">
            <select
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm appearance-none pr-8"
            >
              <option value="all">Todas las instituciones</option>
              {instituciones.map((inst) => (
                <option key={inst._id} value={inst._id}>
                  {inst.nombre}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      )}

      {showFecha && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Rango de Fecha</label>
          <RangoFecha value={fecha} onChange={setFecha} />
        </div>
      )}

      {showGenero && (
        <div className="mb-8">
          <label className="block text-sm font-medium mb-1">Género</label>
          <div className="relative">
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm appearance-none pr-8"
            >
              <option value="all">Todos los géneros</option>
              {generos.map((g, idx) => (
                <option key={idx} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      )}

      <div>
        <Button className="w-full bg-[color:var(--secondary-200)]" onClick={handleSubmitFiltro}>
          Aplicar Filtro
        </Button>
      </div>
    </aside>
  );
};

export default FiltrosPanel;
