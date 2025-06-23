/**
 * Componente TopUsuarios
 * ----------------------
 * Muestra el top 5 de usuarios con más viajes aprobados en una tabla estilizada.
 *
 * Autor: José Andrés Benavides Díaz
 * Fecha de creación: 2025-06-20
 */

import { useEffect, useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { queryTopUsersWithApprovedTrips } from "../../interconnection/queries";

/**
 * Interfaz que representa un usuario aprobado con sus datos relevantes.
 */
interface ApprovedUser {
  userId: string;
  name: string;
  email: string;
  institution?: any;
  approvedTripCount: number;
}

/**
 * Componente funcional que carga y despliega los usuarios con más viajes aprobados.
 */
export default function TopUsuarios() {
  const [users, setUsers] = useState([]);

  // Hook para cargar datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryTopUsersWithApprovedTrips(0);
        console.log(result);
        if (Array.isArray(result)) {
          // Limitamos a los primeros 5 usuarios
          setUsers(result.slice(0, 5));
        } else {
          console.error("Estructura inesperada en la respuesta:", result);
        }
      } catch (error) {
        console.error("Error al obtener usuarios con viajes aprobados:", error);
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
        Top 5 usuarios con más viajes aprobados
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
                <th className="px-6 text-left truncate">Total de viajes</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.userId}
                    className="bg-[#FFF9ED] border-b border-[#FFBA2A] font-exo text-[#171717] text-[16px] h-[58px]"
                  >
                    <td className="px-6 truncate whitespace-nowrap" title={user.email}>
                      {user.email}
                    </td>
                    <td className="px-6 truncate whitespace-nowrap" title={user.name}>
                      {user.name}
                    </td>
                    <td className="px-6"> {user.institution?.id === "685867addd87c1da6b6d6215" ? "Instituto Tecnológico de Costa Rica" : "Otro"} </td>

                    <td className="px-6">{user.approvedTripCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-[#555] font-exo">
                    No hay viajes aprobados registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 h-[46px] flex items-center justify-center text-black font-exo text-[20px] font-semibold bg-[#FFC750AA] rounded-md">
          Top usuarios con más viajes aprobados
        </div>
      </div>

      <div className="mt-2 text-[#171717] font-exo text-[20px] font-semibold">
        Mostrando top {users.length} de {users.length} usuarios
      </div>
    </div>
  );
}
