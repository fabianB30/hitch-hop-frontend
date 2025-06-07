import React, { useRef, useState, useEffect } from "react";
import Imagen1 from "../assets/1.6-DefaultPFP.png";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon , Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";

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

const tiposId = ["Cédula", "DIMEX", "Pasaporte"];
const generos = ["Masculino", "Femenino", "Otro"];
const tiposUsuario = ["Administrador", "Usuario"];

const ProfileSettings: React.FC = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [userData, setUserData] = useState(initialUser);
  const [backupData, setBackupData] = useState(initialUser);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const validationErrors = validateUserData(userData);
    setErrors(validationErrors);
  }, [userData]);

  function formatDate(date: Date) {
    return date
      ? `${String(date.getDate()).padStart(2, "0")} / ${String(date.getMonth() + 1).padStart(2, "0")} / ${date.getFullYear()}`
      : "";
  }

  function parseDate(str: string) {
    const [day, month, year] = str.split("/").map((s) => parseInt(s.trim(), 10));
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  }

  const validateUserData = (data: typeof initialUser) => {
    const newErrors: Record<string, string> = {};
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!data.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!data.primerApellido.trim()) newErrors.primerApellido = "El primer apellido es obligatorio.";
    if (!data.segundoApellido.trim()) newErrors.segundoApellido = "El segundo apellido es obligatorio.";
    if (!data.correo.trim()) newErrors.correo = "El correo es obligatorio.";
    if (!data.institucion.trim()) newErrors.institucion = "La institución es obligatoria.";
    if (!data.tipoId.trim()) newErrors.tipoId = "El tipo de ID es obligatorio.";
    if (!data.numeroId.trim()) newErrors.numeroId = "El número de ID es obligatorio.";
    if (!data.fechaNacimiento.trim()) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    if (!data.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio.";
    if (!data.genero.trim()) newErrors.genero = "El género es obligatorio.";
    if (!data.username.trim()) newErrors.username = "El nombre de usuario es obligatorio.";
    if (!data.tipoUsuario.trim()) newErrors.tipoUsuario = "El tipo de usuario es obligatorio.";

    if (data.nombre && !nameRegex.test(data.nombre)) newErrors.nombre = "El nombre solo puede contener letras.";
    if (data.primerApellido && !nameRegex.test(data.primerApellido)) newErrors.primerApellido = "El primer apellido solo puede contener letras.";
    if (data.segundoApellido && !nameRegex.test(data.segundoApellido)) newErrors.segundoApellido = "El segundo apellido solo puede contener letras.";
    if (data.numeroId && !/^\d{9}$/.test(data.numeroId)) newErrors.numeroId = "El número de ID debe tener 9 dígitos.";
    if (data.telefono && !/^\d{8}$/.test(data.telefono)) newErrors.telefono = "El teléfono debe tener 8 dígitos.";
    if (data.correo && !/^.+@(itcr\.ac\.cr|estudiantec\.cr)$/.test(data.correo)) newErrors.correo = "El correo debe terminar en @itcr.ac.cr o @estudiantec.cr.";

    return newErrors;
  };

  const toggleEdit = () => {
    if (!editable) {
      setBackupData(userData);
      setEditable(true);
    } else {
      if (Object.keys(errors).length > 0) return;
      console.log("Datos guardados:", userData);
      setEditable(false);
    }
  };

  const cancelEdit = () => {
    setUserData(backupData);
    setEditable(false);
  };

  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangePassword = (key: keyof typeof userData, value: string) => {
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
    setUserData((prev) => ({ ...prev, [key]: value })); 
  }

  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUserData((prev) => ({ ...prev, foto: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex">
      <main className="flex-1 flex flex-col px-12 py-8">
        <span className="mt-16 mb-4 text-[48px] font-semibold leading-[100%] font-exo text-left">
          Gestión de Perfil
        </span>

        <div className="flex flex-row gap-12 mt-4">
          <div className="flex flex-col items-center min-w-[260px] pt-6">
            <span className="text-lg font-medium font-exo mb-3 text-gray-700">Foto de perfil</span>
            <Avatar className="w-40 h-40 mb-2 border-4 border-[#ECECFF] shadow">
              <AvatarImage src={userData.foto} alt="Foto de perfil" className="object-cover" />
              <AvatarFallback>{userData.nombre[0]}{userData.primerApellido[0]}</AvatarFallback>
            </Avatar>
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handlePhotoChange} />
            {editable && (
              <>
                <Button type="button" className="mt-4 bg-[#FFAB00] text-white font-semibold rounded-lg px-6 py-2" onClick={handleEditPhoto}>
                  Editar foto de perfil
                </Button>
                <Button type="button" className="mt-16 bg-[#FFAB00] text-white font-semibold rounded-lg px-6 py-2" onClick={() => setShowPasswordModal(true)}>
                  Cambiar contraseña
                </Button>
              </>
            )}
          </div>

          <form className="flex-1">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              {Object.entries({
                Institución: "institucion",
                "Correo institucional": "correo",
                Nombre: "nombre",
                "Primer Apellido": "primerApellido",
                "Tipo de ID": "tipoId",
                "Segundo Apellido": "segundoApellido",
                "Número de ID": "numeroId",
                "Nombre de usuario": "username",
                Teléfono: "telefono",
                "Tipo de usuario": "tipoUsuario",
                Género: "genero"
              }).map(([label, key]) => (
                <ProfileInput
                  key={key}
                  label={label}
                  value={userData[key as keyof typeof userData]}
                  editable={editable}
                  onChange={(v) => handleChange(key as keyof typeof userData, v)}
                  error={errors[key as keyof typeof userData]}
                  as={key === "tipoId" || key === "tipoUsuario" || key === "genero" ? "select" : undefined}
                  options={key === "tipoId" ? tiposId : key === "tipoUsuario" ? tiposUsuario : key === "genero" ? generos : [userData[key as keyof typeof userData]]}
                />
              ))}
              <div className="flex flex-col gap-1">
                <Label className="text-base">Fecha de nacimiento</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={"w-full justify-start text-left font-normal " + (errors.fechaNacimiento ? "border-red-500" : "")}
                      disabled={!editable}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {userData.fechaNacimiento || <span className="text-muted-foreground">Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={parseDate(userData.fechaNacimiento) || undefined}
                      onSelect={(date) => {
                        if (date) handleChange("fechaNacimiento", formatDate(date));
                        setCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-8 gap-4">
              {editable && (
                <Button type="button" onClick={cancelEdit} variant="outline" className="border-gray-400 text-gray-600">
                  Cancelar
                </Button>
              )}
              <Button
                type="button"
                onClick={toggleEdit}
                className="bg-[#7875F8] text-white font-semibold rounded-lg px-8 py-3"
                disabled={editable && Object.keys(errors).length > 0}
              >
                {editable ? "Guardar" : "Editar información"}
              </Button>
            </div>
          </form>


          {/* Dialogo para cambiar password */}
          <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-exo font-semibold">Cambiar Contraseña</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Contraseña actual */}
                <div className="flex flex-col gap-y-3">
                  <Label>Contraseña actual <span className="text-red-500">*</span></Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                {/* Contraseña nueva */}
                <div className="flex flex-col gap-y-3">
                  <Label>Contraseña nueva <span className="text-red-500">*</span></Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {newPassword && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword) && (
                    <p className="text-red-500 text-sm mt-1">
                      Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.
                    </p>
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div className="flex flex-col gap-y-3">
                  <Label>Confirmar contraseña <span className="text-red-500">*</span></Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden.</p>
                  )}
                </div>

                <p className="text-xs text-red-500">* Información obligatoria</p>
              </div>

              <DialogFooter className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => setShowPasswordModal(false)} className="text-blue-600">
                  Volver
                </Button>
                <Button
                  className="bg-[#7875F8] text-white"
                  disabled={
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword ||
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword) ||
                    newPassword !== confirmPassword
                  }
                  onClick={() => {
                    // Aquí iría la lógica real para guardar contraseña
                    setShowPasswordModal(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
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

function ProfileInput({ label, value, onChange, editable = false, as, options, type = "text", error }: {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  as?: "input" | "select";
  options?: string[];
  type?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-base">{label}</Label>
      {as === "select" && options ? (
        <Select disabled={!editable} onValueChange={(val) => onChange?.(val)} defaultValue={value}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input type={type} value={value} onChange={(e) => onChange?.(e.target.value)} disabled={!editable} className={error ? "border-red-500" : ""} />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default ProfileSettings;
