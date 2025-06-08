import fondoConsultas from "../../assets/fondo_consultas.png";

export default function PasajerosUnicos() {
  return (
    <div className="p-6">
      <h1 className="font-exo text-[48px] font-bold leading-none tracking-[0.2px]" style={{ color: "var(--text-950)" }}>
        Consultas
      </h1>

      <h2 className="mt-2 font-exo text-[20px] font-semibold leading-normal" style={{ color: "#000000" }}>
        Top 5 conductores con más pasajeros únicos
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
                <th className="px-4 py-2 text-left">Cantidad de pasajeros únicos</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="mt-4 w-[588px] h-[46px] flex flex-col justify-center text-black font-exo text-[20px] font-semibold">
          Mostrando 5 de *** conductores que han realizado viajes
        </div>
      </div>
    </div>
  );
}
