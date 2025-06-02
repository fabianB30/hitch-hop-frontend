import React, { useRef, useState } from "react";
import Imagen1 from "../assets/1.6-DefaultPFP.png";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const validateUserData = (data: typeof initialUser) => {
    const errors: string[] = [];

    // Solo letras (incluye acentos y ñ)
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nameRegex.test(data.nombre)) errors.push("El nombre solo puede contener letras.");
    if (!nameRegex.test(data.primerApellido)) errors.push("El primer apellido solo puede contener letras.");
    if (!nameRegex.test(data.segundoApellido)) errors.push("El segundo apellido solo puede contener letras.");

    // Número de ID: 9 dígitos
    if (!/^\d{9}$/.test(data.numeroId)) errors.push("El número de ID debe tener 9 dígitos.");

    // Teléfono: 8 dígitos
    if (!/^\d{8}$/.test(data.telefono)) errors.push("El teléfono debe tener 8 dígitos.");

    // Correo institucional
    if (
      !/^.+@(itcr\.ac\.cr|estudiantec\.cr)$/.test(data.correo)
    ) {
      errors.push("El correo debe terminar en @itcr.ac.cr o @estudiantec.cr.");
    }

    return errors;
  };

  const toggleEdit = () => { // cambios del perfil
    if (!editable) {
      setBackupData(userData);
      setEditable(true);
    } else {
      // Validar antes de guardar
      const errors = validateUserData(userData);
      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }
      // Guardar cambios
      console.log("Datos guardados:", userData);
      setEditable(false);
    }
  };

  const cancelEdit = () => {
    setUserData(backupData); // restaura a los datos respaldados
    setEditable(false);
  };

  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleChangePassword = () => {
    // validaciones

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Logica para guardar la nueva contraseña
    
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Handler para abrir el navegador de archivos
  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  };

  // Handler para actualizar la imagen de perfil
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUserData((prev) => ({
          ...prev,
          foto: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="min-h-screen w-full bg-white flex">
       {/* Main Content */}
      <main className="flex-1 flex flex-col px-12 py-8">
        <span className="mt-16 mb-4 text-[48px] font-semibold leading-[100%] font-exo text-left">
          Gestión de Perfil
        </span>

        <div className="flex flex-row gap-12 mt-4">
          {/* Imagen de perfil */}
          <div className="flex flex-col items-center min-w-[260px] pt-6">
            <span className="text-lg font-medium font-exo mb-3 text-gray-700">
              Foto de perfil
            </span>
            <Avatar className="w-40 h-40 mb-2 border-4 border-[#ECECFF] shadow">
              <AvatarImage src={userData.foto} alt="Foto de perfil" className="object-cover" />
              <AvatarFallback>
                {userData.nombre[0]}
                {userData.primerApellido[0]}
              </AvatarFallback>
            </Avatar>
            {/* Input oculto para seleccionar imagen */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            {editable && (
              <>
                <Button
                  type="button"
                  className="mt-4 bg-[#FFAB00] text-white font-semibold rounded-lg px-6 py-2"
                  onClick={handleEditPhoto}
                >
                  Editar foto de perfil
                </Button>
                <Button
                  type="button"
                  className="mt-16 bg-[#FFAB00] text-white font-semibold rounded-lg px-6 py-2"
                  onClick={() => setShowPasswordModal(true)}
                >
                  Cambiar contraseña
                </Button>
              </>
            )}
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

           {/* Dialog para cambiar contraseña */}
          <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-exo font-semibold">Cambiar Contraseña</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="flex flex-col gap-y-3">
                  <Label>
                    Contraseña actual <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                      onClick={() => setShowCurrentPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showCurrentPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <Label>
                    Contraseña nueva <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                      onClick={() => setShowNewPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showNewPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <Label>
                    Confirmar contraseña <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 text-sm text-gray-600 p-2 rounded">
                  <span> Mínimo 8 caracteres, con al menos 1 letra mayúscula, 1 letra minúscula y 1 número.</span>
                </div>

                <p className="text-xs text-red-500">* Información obligatoria</p>
              </div>

              <DialogFooter className="flex justify-between mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setShowPasswordModal(false)}
                  className="text-blue-600"
                >
                  Volver
                </Button>
                <Button
                  className="bg-[#7875F8] text-white"
                  onClick={handleChangePassword}
                >
                  Confirmar cambios
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

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