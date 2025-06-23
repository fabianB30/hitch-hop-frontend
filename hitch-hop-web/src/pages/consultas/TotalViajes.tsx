/**
 * Componente TotalViajes
 * ----------------------
 * Muestra la lista completa de viajes con paginación y ordenamiento por columnas.
 *
 * Autor: Jose Andrés Benavides Díaz
 * Fecha de creación: 2025-06-20
 */

import { useEffect, useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllTripsRequest } from "../../interconnection/trip";

/**
 * Interfaz que representa un viaje con información esencial.
 */
interface Trip {
  _id: string;
  departure: string;
  driver: {
    name: string;
  };
  startpoint: {
    name: string;
  };
  endpoint: {
    name: string;
  };
  passengers: {
    status: string;
  }[];
}

/**
 * Columnas permitidas para ordenar la tabla.
 */
type SortColumn = "fecha" | "estado" | "conductor" | "origen" | "destino";

/**
 * Componente funcional que muestra la tabla de viajes con paginación y ordenamiento.
 */
export default function TotalViajes() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const tripsPerPage = 10;

  const [sortColumn, setSortColumn] = useState<SortColumn>("_id");
  const [sortAsc, setSortAsc] = useState(true);

  /**
   * Cambia la columna y sentido de ordenamiento.
   * @param column Columna sobre la que se ordena.
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
   * Obtiene los viajes desde la API al montar el componente.
   */
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const result = await getAllTripsRequest();
        if (Array.isArray(result)) {
          setTrips(result);
        } else {
          console.error("Estructura inesperada en la respuesta:", result);
        }
      } catch (error) {
        console.error("Error al obtener viajes:", error);
      }
    };
    fetchTrips();
  }, []);

  /**
   * Determina el estado del viaje según si algún pasajero está aprobado.
   * @param trip Viaje a evaluar.
   * @returns Estado "Activo" o "Sin aprobación".
   */
  const getTripStatus = (trip: Trip) =>
    trip.passengers.some((p) => p.status === "Aprobado") ? "Activo" : "Sin aprobación";

  /**
   * Función para comparar dos viajes según la columna ordenada.
   * @param a Primer viaje.
   * @param b Segundo viaje.
   * @returns Número para ordenamiento.
   */
  const compare = (a: Trip, b: Trip) => {
    let aVal: any;
    let bVal: any;

    switch (sortColumn) {
      case "fecha":
        aVal = new Date(a.departure).getTime();
        bVal = new Date(b.departure).getTime();
        break;
      case "estado":
        aVal = getTripStatus(a);
        bVal = getTripStatus(b);
        break;
      case "conductor":
        aVal = a.driver?.name || "";
        bVal = b.driver?.name || "";
        break;
      case "origen":
        aVal = a.startpoint?.name || "";
        bVal = b.startpoint?.name || "";
        break;
      case "destino":
        aVal = a.endpoint?.name || "";
        bVal = b.endpoint?.name || "";
        break;
    }

    if (typeof aVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    } else {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
  };

  // Ordena y pagina los viajes para mostrar en la tabla
  const sortedTrips = [...trips].sort(compare);
  const paginatedTrips = sortedTrips.slice(
    currentPage * tripsPerPage,
    currentPage * tripsPerPage + tripsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="font-exo text-[48px] font-bold tracking-[0.2px] text-[#171717]">Consultas</h1>
      <h2 className="mt-2 font-exo text-[20px] font-semibold text-black">Consulta total de viajes</h2>

      <div
        className="mt-6 w-[1091px] rounded-[32px] border border-[#D3D3D3] shadow-[0px_2px_10px_rgba(38,38,38,0.10)] p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(0deg, rgba(255,252,242,0.73), rgba(255,252,242,0.73)), url(${fondoConsultas}) center / cover no-repeat`,
        }}
      >
        <div className="w-full h-[300px] rounded-lg border border-[#D3D3D3] bg-white/60 backdrop-blur-sm overflow-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-[#FFC750AA] text-[#262626] font-exo text-[16px] font-semibold">
              <tr>
                {[
                  { key: "fecha", label: "Fecha" },
                  { key: "estado", label: "Estado" },
                  { key: "conductor", label: "Conductor" },
                  { key: "origen", label: "Punto de partida" },
                  { key: "destino", label: "Punto de llegada" },
                ].map(({ key, label }) => (
                  <th key={key} className="px-2 py-2 text-left">
                    <Button
                      onClick={() => toggleSort(key as SortColumn)}
                      variant="ghost"
                      size="sm"
                      className="px-2 py-1 text-sm font-semibold text-[#262626] flex items-center gap-1 font-exo"
                    >
                      {label}
                      {sortColumn === key && (sortAsc ? <ChevronDown size={16} /> : <ChevronUp size={16} />)}
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedTrips.length > 0 ? (
                paginatedTrips.map((trip) => (
                  <tr
                    key={trip._id}
                    className="bg-[#FFF9ED] border-b border-[#FFBA2A] font-exo text-[#171717] text-[15px] h-[58px]"
                  >
                    <td className="px-4">{new Date(trip.departure).toLocaleDateString()}</td>
                    <td className="px-4">{getTripStatus(trip)}</td>
                    <td className="px-4">{trip.driver?.name || "-"}</td>
                    <td className="px-4">{trip.startpoint?.name || "-"}</td>
                    <td className="px-4">{trip.endpoint?.name || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-[#555] font-exo">
                    No hay viajes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 w-full flex justify-between items-center">
          <div className="text-black font-exo text-[20px] font-semibold">
            Mostrando {paginatedTrips.length} de {trips.length} viajes existentes
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
                  (prev + 1) * tripsPerPage < trips.length ? prev + 1 : prev
                )
              }
              disabled={(currentPage + 1) * tripsPerPage >= trips.length}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
