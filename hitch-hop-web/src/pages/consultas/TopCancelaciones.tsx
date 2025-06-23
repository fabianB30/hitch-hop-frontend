import fondoConsultas from "../../assets/fondo_consultas.png";
import { queryTopDriversWithMostCancellations } from "../../interconnection/queries";
import { useEffect, useState } from "react";

export default function TopCancelaciones() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryTopDriversWithMostCancellations();
        if (Array.isArray(result)) {
          setDrivers(result.slice(0, 5));
        } else {
          console.error("Estructura inesperada en la respuesta:", result);
        }
      } catch (error) {
        console.error("Error al obtener conductores:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="font-exo text-[48px] font-bold leading-none tracking-[0.2px]" style={{ color: "var(--text-950)" }}>
        Consultas
      </h1>

      <h2 className="mt-2 font-exo text-[20px] font-semibold leading-normal" style={{ color: "#000000" }}>
        Conductores con mayor cantidad de cancelaciones
      </h2>

      <div
        className="mt-6 w-[1091px] h-[450px] rounded-[var(--radius-4xl)] border border-[color:var(--border)] shadow-[0px_2px_10px_0px_rgba(38,38,38,0.10)] overflow-hidden p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(0deg, rgba(255,252,242,0.73), rgba(255,252,242,0.73)), url(${fondoConsultas}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="w-[1033px] h-[350px] flex flex-col items-start rounded-lg border border-[#D3D3D3] bg-white/0 backdrop-blur-sm text-[#262626] overflow-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-[#FFC750AA] text-[#262626]">
              <tr>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Institución</th>
                <th className="px-4 py-2 text-left">Cancelaciones</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr key={index} className="hover:bg-[#fff5e5] transition-colors">
                  <td className="px-4 py-2">{driver.email}</td>
                  <td className="px-4 py-2">{driver.name}</td>
                  <td className="px-4 py-2">{driver.institution === "685867addd87c1da6b6d6215" ? "Instituto Tecnológico de Costa Rica" : "Otro"} </td>
                  <td className="px-4 py-2">{driver.cancelledCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 w-[588px] h-[46px] flex flex-col justify-center text-black font-exo text-[20px] font-semibold">
          Mostrando 5 de *** conductores con cancelaciones
        </div>
      </div>
    </div>
  );
}
