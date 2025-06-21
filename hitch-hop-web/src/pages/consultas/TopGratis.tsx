/**
 * Componente TopViajesGratuitos
 * -----------------------------
 * Muestra los conductores con mayor cantidad de viajes gratuitos, limitado a los primeros 5.
 *
 * Autor: Jose Andrés Benavides Díaz
 * Fecha de creación: 2025-06-20
 */

import { useEffect, useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { queryTopDriversWithMostFreeTrips } from "../../interconnection/queries";

/**
 * Interfaz que representa un conductor con viajes gratuitos.
 */
interface FreeTripDriver {
  driverId: string;
  name: string;
  email: string;
  freeTripCount: number;
}

/**
 * Componente funcional que obtiene y muestra los conductores con más viajes gratuitos.
 */
export default function TopViajesGratuitos() {
  const [drivers, setDrivers] = useState<FreeTripDriver[]>([]);
  const [total, setTotal] = useState(0);

  // Hook para cargar datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryTopDriversWithMostFreeTrips();
        console.log("Conductores con más viajes gratuitos:", result);
        if (Array.isArray(result)) {
          setDrivers(result.slice(0, 5));
          setTotal(result.length);
        }
      } catch (error) {
        console.error("Error al obtener conductores con viajes gratuitos:", error);
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
        Conductores con mayor cantidad de viajes gratuitos
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
                <th className="px-6 text-left truncate">Usuario</th>
                <th className="px-6 text-left truncate">Nombre</th>
                <th className="px-6 text-left truncate">Institución</th>
                <th className="px-6 text-left truncate">Viajes gratuitos</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length > 0 ? (
                drivers.map((driver) => (
                  <tr
                    key={driver.driverId}
                    className="bg-[#FFF9ED] border-b border-[#FFBA2A] font-exo text-[#171717] text-[16px] h-[58px]"
                  >
                    <td
                      className="px-6 truncate whitespace-nowrap"
                      title={driver.email}
                    >
                      {driver.email}
                    </td>
                    <td
                      className="px-6 truncate whitespace-nowrap"
                      title={driver.name}
                    >
                      {driver.name}
                    </td>
                    <td
                      className="px-6 truncate whitespace-nowrap"
                      title="Instituto Tecnológico"
                    >
                      Instituto Tecnológico
                    </td>
                    <td className="px-6">{driver.freeTripCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-[#555] font-exo"
                  >
                    No hay conductores con viajes gratuitos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="mt-4 h-[46px] flex items-center justify-center text-black font-exo text-[20px] font-semibold bg-[#FFC750AA] rounded-md"
        >
          Top conductores con más viajes gratuitos
        </div>
      </div>

      <div className="mt-2 text-[#171717] font-exo text-[20px] font-semibold">
        Mostrando top {drivers.length} de {total} conductores con viajes gratuitos
      </div>
    </div>
  );
}
