/**
 * Componente TopViajesCaros
 * -------------------------
 * Muestra los conductores con viajes que tienen el mayor precio por persona, limitado a los primeros 5.
 *
 * Autor: Jose Andrés Benavides Díaz
 * Fecha de creación: 2025-06-20
 */

import { useEffect, useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { queryTopTripsByCostPerPerson } from "../../interconnection/queries";

/**
 * Interfaz que representa un viaje costoso con datos relevantes.
 */
interface CostlyTrip {
  departure: string;
  arrival: string;
  costPerPerson: number;
  tripId: string;
  driverName: string;
  driverEmail: string;
}

/**
 * Componente funcional que obtiene y muestra viajes con mayor precio por persona.
 */
export default function TopViajesCaros() {
  const [trips, setTrips] = useState<CostlyTrip[]>([]);
  const [total, setTotal] = useState(0);

  // Hook para cargar datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryTopTripsByCostPerPerson();
        if (result) {
          const data = result as CostlyTrip[];
          setTrips(data.slice(0, 5));
          setTotal(data.length);
        }
      } catch (error) {
        console.error("Error al obtener viajes de mayor precio:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="font-exo text-[48px] font-bold leading-none tracking-[0.2px] text-[#171717]">
        Consultas
      </h1>

      <h2 className="mt-2 font-exo text-[20px] font-semibold leading-normal text-black">
        Conductores con viajes de mayor precio
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
              <tr className="h-[58px]">
                <th className="px-6 text-left">Usuario</th>
                <th className="px-6 text-left">Nombre</th>
                <th className="px-6 text-left">Precio del viaje</th>
              </tr>
            </thead>
            <tbody>
              {trips.length > 0 ? (
                trips.map((trip) => (
                  <tr
                    key={trip.tripId}
                    className="bg-[#FFF9ED] border-b border-[#FFBA2A] font-exo text-[#171717] text-[16px] h-[58px]"
                  >
                    <td
                      className="w-1/3 px-6 truncate whitespace-nowrap"
                      title={trip.driverEmail}
                    >
                      {trip.driverEmail}
                    </td>
                    <td
                      className="px-6 truncate whitespace-nowrap"
                      title={trip.driverName}
                    >
                      {trip.driverName}
                    </td>
                    <td className="px-6">
                      {trip.costPerPerson.toLocaleString("es-CR", {
                        style: "currency",
                        currency: "CRC",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-[#555] font-exo">
                    No hay viajes registrados con precios altos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 h-[46px] flex items-center justify-center text-black font-exo text-[20px] font-semibold bg-[#FFC750AA] rounded-md">
          Top conductores con viajes de mayor precio
        </div>
      </div>

      <div className="mt-2 text-[#171717] font-exo text-[20px] font-semibold">
        Mostrando {trips.length} de {total} conductores que han cobrado viajes
      </div>
    </div>
  );
}
