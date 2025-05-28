import React from "react";
import Imagen1 from "../assets/1.6-DefaultPFP.png";
import { Button } from "./ui/button";

const user = {
  nombre: "Juan",
  primerApellido: "Rodríguez",
  segundoApellido: "Chaves",
  correo: "juan@estudiantec.cr",
  institucion: "Tecnológico de Costa Rica",
  tipoId: "Cédula",
  numeroId: "116032348",
  fechaNacimiento: "27 / 02 / 2003",
  telefono: "83017776",
  genero: "Masculino",
  username: "juanRC02",
  tipoUsuario: "Administrador",
  foto: Imagen1,
};

const tiposId = ["Cédula", "DIMEX", "Pasaporte"];
const generos = ["Masculino", "Femenino", "Otro"];
const tiposUsuario = ["Administrador", "Usuario"];

const ProfileSettings: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white flex">
      {/* Sidebar */}
      <aside className="bg-[#7875F8] text-white flex flex-col rounded-3xl shadow-md w-64 min-h-[90vh] m-6 p-6 relative">
        <div className="text-4xl font-extrabold font-montserrat mb-2">HitchHop</div>
        <div className="text-lg font-semibold mb-8">{user.tipoUsuario}</div>
        <nav className="flex flex-col gap-2">
          <SidebarItem active icon="🏠" label="Inicio" />
          <SidebarItem icon="👥" label="Gestión de Usuarios" />
          <SidebarItem activeLight icon="👤" label="Gestión de Perfil" />
          <SidebarItem icon="❓" label="Consultas" />
          <SidebarItem icon="📊" label="Estadísticas" />
        </nav>
        <Button
          className="mt-auto bg-white text-[#2D29D2] font-semibold rounded-lg py-3 px-6 flex items-center gap-2"
        >
          <span>⏻</span>
          Cerrar Sesión
        </Button>
      </aside>
    
    {/*--------------------------------------------------------------------------------------------------------------------*/}
      {/* Main Content */}
      <main className="flex-1 flex flex-col px-12 py-8">
        
        <span className="w-[369px] h-[64px] mt-[64px] mb-4 text-[48px] font-semibold leading-[100%] font-exo text-center">
            Gestión de Perfil
        </span>

        <div className="flex flex-row gap-12 mt-4">
          {/* Left: Profile Picture */}
          <div className="flex flex-col items-center min-w-[260px] pt-6">
            <span className="text-lg font-medium font-exo mb-3 text-gray-700">
                Foto de perfil
            </span>
            
            <img
              src={user.foto}
              alt="Foto de perfil"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#ECECFF] shadow mb-2"
            />
          </div>

          {/* Right: Profile Info */}
          <form className="flex-1">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <ProfileInput label="Institución" value={user.institucion} as="select" options={[user.institucion]} />
              <ProfileInput label="Correo institucional" value={user.correo} type="email" />
              <ProfileInput label="Nombre" value={user.nombre} />
              <ProfileInput label="Primer Apellido" value={user.primerApellido} />
              <ProfileInput label="Tipo de ID" value={user.tipoId} as="select" options={tiposId} />
              <ProfileInput label="Segundo Apellido" value={user.segundoApellido} />
              <ProfileInput label="Número de ID" value={user.numeroId} />
              <ProfileInput label="Fecha de nacimiento" value={user.fechaNacimiento} />
              <ProfileInput label="Nombre de usuario" value={user.username} />
              <ProfileInput label="Teléfono" value={user.telefono} />
              <ProfileInput label="Tipo de usuario" value={user.tipoUsuario} as="select" options={tiposUsuario} />
              <ProfileInput label="Género" value={user.genero} as="select" options={generos} />
            </div>
            <div className="flex justify-end mt-8">
              <Button className="bg-[#7875F8] text-white font-semibold rounded-lg px-8 py-3">
                Editar información
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

function SidebarItem({
  icon,
  label,
  active,
  activeLight,
}: {
  icon: string;
  label: string;
  active?: boolean;
  activeLight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer font-exo text-base font-medium
        ${active ? "bg-[#7875F8] text-white" : ""}
        ${activeLight ? "bg-white text-[#7875F8]" : ""}
        ${!active && !activeLight ? "hover:bg-[#6a67e6] hover:text-white transition" : ""}
      `}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// {/*--------------------------------------------------------------------------------------------------------------------*/}
// ProfileInput: renders a disabled input or select
function ProfileInput({
  label,
  value,
  as,
  options,
  type = "text",
}: {
  label: string;
  value: string;
  as?: "input" | "select";
  options?: string[];
  type?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-700 font-medium text-base font-exo mb-1">
        {label}
    </span>
      {as === "select" && options ? (
        <select
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 font-exo text-base"
          value={value}
          disabled
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 font-exo text-base"
          value={value}
          disabled
        />
      )}
    </div>
  );
}

export default ProfileSettings;