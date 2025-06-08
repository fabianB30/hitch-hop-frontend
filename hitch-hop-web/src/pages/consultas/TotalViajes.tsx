import { useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TotalViajes() {
  const [sortStates, setSortStates] = useState({
    id: true,
    fecha: true,
    estado: true,
    conductor: true,
    origen: true,
    destino: true,
  });

  const toggleSort = (column: keyof typeof sortStates) => {
    setSortStates((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

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
        Consulta total de viajes
      </h2>

      <div
        className="mt-6 w-[1091px] h-[450px] rounded-[var(--radius-4xl)] border border-[color:var(--border)] shadow-[0px_2px_10px_0px_rgba(38,38,38,0.10)] overflow-hidden p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(0deg, rgba(255,252,242,0.73), rgba(255,252,242,0.73)), url(${fondoConsultas}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="w-[1033px] h-[300px] flex flex-col items-start rounded-lg border border-[#D3D3D3] bg-white/0 backdrop-blur-sm text-[#262626] overflow-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-[#FFC750AA] text-[#262626] font-exo">
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "fecha", label: "Fecha" },
                  { key: "estado", label: "Estado" },
                  { key: "conductor", label: "Conductor" },
                  { key: "origen", label: "Punto de partida" },
                  { key: "destino", label: "Punto de llegada" },
                ].map(({ key, label }) => (
                  <th key={key} className="px-4 py-2 text-left">
                    <Button
                      onClick={() => toggleSort(key as keyof typeof sortStates)}
                      variant="ghost"
                      size="sm"
                      className="px-2 py-1 text-sm font-semibold text-[#262626] flex items-center gap-1 font-exo"
                    >
                      {label}
                      {sortStates[key as keyof typeof sortStates] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronUp size={16} />
                      )}
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">&nbsp;</td>
                  <td className="px-4 py-2">&nbsp;</td>
                  <td className="px-4 py-2">&nbsp;</td>
                  <td className="px-4 py-2">&nbsp;</td>
                  <td className="px-4 py-2">&nbsp;</td>
                  <td className="px-4 py-2">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 w-full flex justify-between items-center">
          <div className="text-black font-exo text-[20px] font-semibold">
            Mostrando 10 de *** viajes existentes
          </div>
          <div className="flex gap-4">
            <button
              className="flex h-[32px] px-[14px] justify-center items-center gap-2 rounded-lg border border-[#F57301] bg-[rgba(120,117,248,0.00)] text-sm text-[#F57301] font-medium"
            >
              Anterior
            </button>
            <button
              className="flex h-[32px] px-[14px] justify-center items-center gap-2 rounded-lg border border-[#F57301] bg-[rgba(245,115,1,0.00)] text-sm text-[#F57301] font-medium"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
