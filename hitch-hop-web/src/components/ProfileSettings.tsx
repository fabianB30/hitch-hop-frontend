import React, { useState } from "react";
import Imagen1 from "../assets/1.6-DefaultPFP.png";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";


// Datos iniciales del usuario
const initialUser = {
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

// Opciones para selects
const tiposId = ["Cédula", "DIMEX", "Pasaporte"];
const generos = ["Masculino", "Femenino", "Otro"];
const tiposUsuario = ["Administrador", "Usuario"];

const ProfileSettings: React.FC = () => {
   const [editable, setEditable] = useState(false);
  const [userData, setUserData] = useState(initialUser);
  const [backupData, setBackupData] = useState(initialUser); // copia de respaldo

  const toggleEdit = () => {
    if (!editable) {
      // Guarda un respaldo de los datos por si el usuario cancela
      setBackupData(userData);
    } else {
      // Guardar cambios
      console.log("Datos guardados:", userData);
    }
    setEditable((prev) => !prev);
  };

  const cancelEdit = () => {
    setUserData(backupData); // restaura a los datos respaldados
    setEditable(false);
  };

  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  return (
    <div className="min-h-screen w-full bg-white flex">
      {/* Sidebar */}
      <aside className="bg-[#7875F8] text-white flex flex-col rounded-3xl shadow-md w-64 min-h-[90vh] m-6 p-6 relative">
        <div className="text-4xl font-extrabold font-montserrat mb-2">HitchHop</div>
        <div className="text-lg font-semibold mb-8">{userData.tipoUsuario}</div>
        <nav className="flex flex-col gap-2">
          <SidebarItem active icon="🏠" label="Inicio" />
          <SidebarItem icon="👥" label="Gestión de Usuarios" />
          <SidebarItem activeLight icon="👤" label="Gestión de Perfil" />
          <SidebarItem icon="❓" label="Consultas" />
          <SidebarItem icon="📊" label="Estadísticas" />
        </nav>
        <Button className="mt-auto bg-white text-[#2D29D2] font-semibold rounded-lg py-3 px-6 flex items-center gap-2">
          <span>⏻</span>
          Cerrar Sesión
        </Button>
      </aside>

       {/* Main Content */}
      <main className="flex-1 flex flex-col px-12 py-8">
        <span className="w-[369px] h-[64px] mt-[64px] mb-4 text-[48px] font-semibold leading-[100%] font-exo text-center">
          Gestión de Perfil
        </span>

        <div className="flex flex-row gap-12 mt-4">
          {/* Imagen de perfil */}
          <div className="flex flex-col items-center min-w-[260px] pt-6">
            <span className="text-lg font-medium font-exo mb-3 text-gray-700">
              Foto de perfil
            </span>
            <img
              src={userData.foto}
              alt="Foto de perfil"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#ECECFF] shadow mb-2"
            />
          </div>

          {/* Formulario de información */}
          <form className="flex-1">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <ProfileInput label="Institución" value={userData.institucion} editable={editable} onChange={(v) => handleChange("institucion", v)} as="select" options={[userData.institucion]} />
              <ProfileInput label="Correo institucional" value={userData.correo} editable={editable} onChange={(v) => handleChange("correo", v)} type="email" />
              <ProfileInput label="Nombre" value={userData.nombre} editable={editable} onChange={(v) => handleChange("nombre", v)} />
              <ProfileInput label="Primer Apellido" value={userData.primerApellido} editable={editable} onChange={(v) => handleChange("primerApellido", v)} />
              <ProfileInput label="Tipo de ID" value={userData.tipoId} editable={editable} onChange={(v) => handleChange("tipoId", v)} as="select" options={tiposId} />
              <ProfileInput label="Segundo Apellido" value={userData.segundoApellido} editable={editable} onChange={(v) => handleChange("segundoApellido", v)} />
              <ProfileInput label="Número de ID" value={userData.numeroId} editable={editable} onChange={(v) => handleChange("numeroId", v)} />
              <ProfileInput label="Fecha de nacimiento" value={userData.fechaNacimiento} editable={editable} onChange={(v) => handleChange("fechaNacimiento", v)} />
              <ProfileInput label="Nombre de usuario" value={userData.username} editable={editable} onChange={(v) => handleChange("username", v)} />
              <ProfileInput label="Teléfono" value={userData.telefono} editable={editable} onChange={(v) => handleChange("telefono", v)} />
              <ProfileInput label="Tipo de usuario" value={userData.tipoUsuario} editable={editable} onChange={(v) => handleChange("tipoUsuario", v)} as="select" options={tiposUsuario} />
              <ProfileInput label="Género" value={userData.genero} editable={editable} onChange={(v) => handleChange("genero", v)} as="select" options={generos} />
            </div>

            <div className="flex justify-end mt-8 gap-4">
              {editable && (
                <Button
                  type="button"
                  onClick={cancelEdit}
                  variant="outline"
                  className="border-gray-400 text-gray-600"
                >
                  Cancelar
                </Button>
              )}
              <Button
                type="button"
                onClick={toggleEdit}
                className="bg-[#7875F8] text-white font-semibold rounded-lg px-8 py-3"
              >
                {editable ? "Guardar" : "Editar información"}
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

function ProfileInput({
  label,
  value,
  onChange,
  editable = false,
  as,
  options,
  type = "text",
}: {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  as?: "input" | "select";
  options?: string[];
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-base">{label}</Label>

      {as === "select" && options ? (
        <Select
          disabled={!editable}
          onValueChange={(val) => onChange?.(val)}
          defaultValue={value}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={!editable}
        />
      )}
    </div>
  );
}


export default ProfileSettings;