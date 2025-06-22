/**
 * Componente PuntosRecurrentes
 * -----------------------------
 * Muestra el top 5 de puntos (lugares) más concurridos en viajes.
 *
 * Autor: Jose Andrés Benavides Díaz
 * Fecha de creación: 2025-06-20
 */

import { useEffect, useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { queryTopVisitedPlaces } from "../../interconnection/queries";

/**
 * Interfaz que representa un punto recurrente con nombre, dirección y total de visitas.
 */
interface Place {
  name: string;
  totalVisits: number;
  address?: string;
}

/**
 * Componente funcional que carga y muestra los puntos más visitados.
 */
export default function PuntosRecurrentes() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [total, setTotal] = useState(0);

  // Hook para cargar datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await queryTopVisitedPlaces();
        if (data) {
          // Mostrar sólo los primeros 5 puntos
          setPlaces(data.slice(0, 5));
          setTotal(data.length);
        }
      } catch (error) {
        console.error("Error al obtener puntos recurrentes:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1
        className="font-exo text-[48px] font-bold leading-none tracking-[0.2px] text-[#171717]"
      >
        Consultas
      </h1>

      <h2
        className="mt-2 font-exo text-[20px] font-semibold leading-normal text-black"
      >
        Top puntos más concurrentes
      </h2>

      <div
        className="mt-6 w-[1091px] rounded-[32px] border border-[#D3D3D3] shadow-[0px_2px_10px_rgba(38,38,38,0.10)] p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(0deg, rgba(255,252,242,0.73), rgba(255,252,242,0.73)), url(${fondoConsultas}) center / cover no-repeat`,
        }}
      >
        <div className="w-full rounded-lg border border-[#D3D3D3] bg-white/60 backdrop-blur-sm text-[#262626]">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-[#FFC750AA] text-[#262626] font-exo text-[16px] font-semibold">
              <tr>
                <th className="px-6 py-[14px] text-left">Punto</th>
                <th className="px-6 py-[14px] text-left">Dirección</th>
                <th className="px-6 py-[14px] text-left">Total de viajes</th>
              </tr>
            </thead>
            <tbody>
              {places.length > 0 ? (
                places.map((place, index) => (
                  <tr
                    key={index}
                    className="bg-[#FFF9ED] border-b border-[#FFBA2A] font-exo text-[#171717] text-[16px]"
                  >
                    <td
                      className="px-6 py-[14px] truncate whitespace-nowrap"
                      title={place.name}
                    >
                      {place.name}
                    </td>
                    <td
                      className="px-6 py-[14px] truncate whitespace-nowrap"
                      title={place.address || "—"}
                    >
                      {place.address || "—"}
                    </td>
                    <td className="px-6 py-[14px]">{place.totalVisits}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-[#555] font-exo"
                  >
                    No hay puntos recurrentes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="mt-4 h-[46px] flex items-center justify-center text-black font-exo text-[20px] font-semibold bg-[#FFC750AA] rounded-md"
        >
          Top puntos más concurrentes
        </div>
      </div>

      <div className="mt-2 text-[#171717] font-exo text-[20px] font-semibold">
        Mostrando {places.length} de {total} puntos registrados
      </div>
    </div>
  );
}
