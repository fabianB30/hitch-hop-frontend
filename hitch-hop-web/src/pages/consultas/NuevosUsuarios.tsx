/**
 * Componente NuevosUsuarios
 * -------------------------
 * Muestra los usuarios registrados en los últimos 3 meses, limitado a los primeros 8.
 *
 * Autor: Jose Andrés Benavides Díaz
 * Fecha de creación: 2025-06-20
 */

import { useEffect, useState } from "react";
import fondoConsultas from "../../assets/fondo_consultas.png";
import { queryRecentRegisteredUsers } from "../../interconnection/queries";

/**
 * Interfaz que representa un usuario reciente con datos relevantes.
 */
interface RecentUser {
  _id: string;
  name: string;
  email: string;
  type: string;
  role: string;
  createdAt: string;
}

/**
 * Componente funcional que carga y muestra los usuarios registrados recientemente.
 */
export default function NuevosUsuarios() {
  const [users, setUsers] = useState<RecentUser[]>([]);
  const [total, setTotal] = useState(0);

  // Hook para obtener datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryRecentRegisteredUsers();
        if (result) {
          setUsers(result);
          setTotal(result.count);
        }
      } catch (error) {
        console.error("Error al obtener usuarios recientes:", error);
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
        Nuevos usuarios de los últimos 3 meses
      </h2>

      <div
        className="mt-6 w-[1091px] rounded-[32px] border border-[#D3D3D3] shadow-[0_2px_10px_rgba(38,38,38,0.10)] p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(0deg, rgba(255,252,242,0.73), rgba(255,252,242,0.73)), url(${fondoConsultas}) center / cover no-repeat`,
        }}
      >
        <div
          className="w-full rounded-lg border border-[#D3D3D3] bg-white/60 backdrop-blur-sm text-[#262626] overflow-auto max-h-[350px]"
        >
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-[#FFC750AA] text-[#262626] font-exo text-[16px] font-semibold">
              <tr className="h-[58px]">
                <th className="w-1/4 px-6 text-left truncate">Usuario</th>
                <th className="w-1/4 px-6 text-left truncate">Nombre</th>
                <th className="w-1/4 px-6 text-left truncate">Tipo</th>
                <th className="w-1/4 px-6 text-left truncate">Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-[#FFF9ED] border-b border-[#FFBA2A] font-exo text-[#171717] text-[16px] h-[58px]"
                  >
                    <td
                      className="px-6 truncate whitespace-nowrap"
                      title={user.email}
                    >
                      {user.email}
                    </td>
                    <td
                      className="px-6 truncate whitespace-nowrap"
                      title={user.name}
                    >
                      {user.name}
                    </td>
                    <td
                      className="px-6 truncate whitespace-nowrap"
                      title={user.type}
                    >
                      {user.type}
                    </td>
                    <td
                      className="px-6 truncate whitespace-nowrap"
                      title={user.role}
                    >
                      {user.role}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-[#555] font-exo"
                  >
                    No hay usuarios registrados recientemente.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="mt-4 h-[46px] flex items-center justify-center text-black font-exo text-[20px] font-semibold bg-[#FFC750AA] rounded-md"
        >
          Cantidad de usuarios nuevos
        </div>
      </div>

      <div className="mt-2 text-[#171717] font-exo text-[20px] font-semibold">
        Mostrando {users.length} de {total} usuarios nuevos
      </div>
    </div>
  );
}
