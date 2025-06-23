// Funcionalidad realizada por Carlos Cabrera y Diego Duran
// Ventana de gestión de perfil del usuario, donde el usuario puede editar la información de su cuenta

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
import { Calendar as CalendarIcon, Eye, EyeOff } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useAuth } from '@/Context/auth-context';
import { getParameterByNameRequest } from '@/interconnection/paremeter';
import { getAllInstitutionsRequest } from '@/interconnection/institution';
import { updateUserRequest } from "@/interconnection/user";
import { changePasswordRequest } from "@/interconnection/user";

// Definicion de datos del usuario
const initialUser = {
  nombre: "",
  primerApellido: "",
  segundoApellido: "",
  correo: "",
  institucion: "",
  tipoId: "",
  numeroId: "",
  fechaNacimiento: "",
  telefono: "",
  genero: "",
  username: "",
  tipoUsuario: "",
  foto: Imagen1,
};

// Componente principal 
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
  const [showSavedDialog, setShowSavedDialog] = useState(false);
  const [tiposId, setTiposId] = useState<string[]>([]);
  const [generos, setGeneros] = useState<string[]>([]);
  const [tiposUsuario, setTiposUsuario] = useState<string[]>([]);
  const [instituciones, setInstituciones] = useState<string[]>([]);
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const { user, updateUser } = useAuth();
  
   const userMapped = React.useMemo(() => { 
    return {
      nombre: user.name || "",
      primerApellido: user.firstSurname || "",
      segundoApellido: user.secondSurname || "",
      correo: user.email || "",
      institucion: user.institutionId || "",
      tipoId: user.identificationTypeId || "",
      numeroId: user.identificationNumber ? String(user.identificationNumber) : "",
      fechaNacimiento: user.birthDate || "",
      telefono: user.phone ? String(user.phone) : "",
      genero: user.genre || "",
      username: user.username || "",
      tipoUsuario: (user.type || "").trim(),
      foto: user.photoUrl || Imagen1,
    };
  }, [user]);


  // Carga los datos del usuario al iniciar
  useEffect(() => {
    if (user) {
      let fechaNacimiento = user.birthDate || "";
      if (fechaNacimiento && !fechaNacimiento.includes("/")) {
        const dateObj = new Date(fechaNacimiento);
        fechaNacimiento = formatDate(dateObj);
      }
      const institucionObj = instituciones.find((inst) => inst._id === user.institutionId);
      const institucionNombre = institucionObj ? institucionObj.nombre : "";

      let tipoUsuario = (user.type || "").trim();
      if (tiposUsuario.length > 0) {
        const match = tiposUsuario.find(
          (tipo) => tipo.toLowerCase() === tipoUsuario.toLowerCase()
        );
        if (match) tipoUsuario = match;
      }
      console.log("Tipo de usuario normalizado:", tipoUsuario);
      const mapped = {
        ...userMapped,
        fechaNacimiento,
        institucion: institucionNombre,
        tipoUsuario,
      };
      setUserData(mapped);
      setBackupData(mapped);
    }

  }, [user, instituciones]);

  // Cargar opciones desde la base de datos
  useEffect(() => {
    async function fetchOptions() {
      try {
        const paramId = await getParameterByNameRequest("Tipo de identificación");
        const paramGenero = await getParameterByNameRequest("Géneros");
        const paramTipoUsuario = await getParameterByNameRequest("Tipo de Usuario");
        const resInstitutions = await getAllInstitutionsRequest();

        if (paramId) setTiposId(paramId.parameterList);
        if (paramGenero) setGeneros(paramGenero.parameterList);
        if (paramTipoUsuario) setTiposUsuario(paramTipoUsuario.parameterList);
        if (resInstitutions) setInstituciones(resInstitutions);
      } catch (error) {
        console.error("Error al obtener opciones:", error);
      }
    }
    fetchOptions();
  }, []);

  // Valida errores al cambiar datos
  useEffect(() => {
    const validationErrors = validateUserData(userData);
    setErrors(validationErrors);
  }, [userData]);

  // Formatea la fecha a formato dd/mm/yyyy
  function formatDate(date: Date) {
    return date
      ? `${String(date.getDate()).padStart(2, "0")} / ${String(date.getMonth() + 1).padStart(2, "0")} / ${date.getFullYear()}`
      : "";
  }

  // Parsea la fecha a objeto Date
  function parseDate(str: string) {
    const [day, month, year] = str.split("/").map((s) => parseInt(s.trim(), 10));
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  }

  // Validación de datos del usuario
  const validateUserData = (data: typeof initialUser) => {
    const newErrors: Record<string, string> = {};
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!data.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!data.primerApellido.trim()) newErrors.primerApellido = "El primer apellido es obligatorio.";
    if (!data.segundoApellido.trim()) newErrors.segundoApellido = "El segundo apellido es obligatorio.";
    if (!data.correo.trim()) newErrors.correo = "El correo es obligatorio.";
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

  // Guardar los cambios del usuario
  const toggleEdit = async () => {
    if (!editable) {
      setBackupData(userData);
      setEditable(true);
    } else {
      if (Object.keys(errors).length > 0) return;
      const isValid = validateUserData(userData);
      if (!isValid) {
        return;
      }
      try {
        const userId = user._id;
        let birthDateISO = "";
        if (userData.fechaNacimiento) {
          const [day, month, year] = userData.fechaNacimiento.split("/").map(s => s.trim());
          birthDateISO = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
        const { password, ...restUser } = user;

        const dataToUpdate: User = {
          ...restUser,
          name: userData.nombre,
          firstSurname: userData.primerApellido,
          secondSurname: userData.segundoApellido,
          email: userData.correo,
          institutionName: userData.institucion,
          identificationTypeId: userData.tipoId,
          identificationNumber: Number(userData.numeroId),
          birthDate: birthDateISO,
          phone: Number(userData.telefono),
          genre: userData.genero,
          username: userData.username,
          type: userData.tipoUsuario,
          photoKey: typeof userData.foto === "string" ? userData.foto : "",
          photoUrl: typeof userData.foto === "string" ? userData.foto : Imagen1,
        };

        await updateUserRequest(userId, dataToUpdate);
        await updateUser(dataToUpdate);

      } catch (error) {
        console.error("Error updating user:", error);
      }
      setEditable(false);
      setShowSavedDialog(true);
    }
  };

  const cancelEdit = () => {
    setUserData(backupData);
    setEditable(false);
  };

  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  // Cambio de contraseña
  const handleChangePassword = async () => {
    setPasswordChangeError("");
    // Validación de campos
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordChangeError("Todos los campos son obligatorios.");
      return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
      setPasswordChangeError("La contraseña nueva no cumple los requisitos.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordChangeError("Las contraseñas no coinciden.");
      return false;
    }
    // Validar contraseña actual con la base de datos
    const result = await changePasswordRequest({
      email: user.email,
      currentPassword,
      newPassword,
    });
    if (!result.success) {
      setPasswordChangeError(result.msg || "La contraseña actual es incorrecta.");
      return false;
    }

    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowSavedDialog(true);
    return true;
  };

  const handleEditPhoto = () => {
    fileInputRef.current?.click();
  };

  // Maneja el cambio de foto de perfil
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 200, 0.7);
        setUserData((prev) => ({ ...prev, foto: compressedBase64 }));

        const userId = user._id;
        await updateUserRequest(userId, { ...user, photoKey: compressedBase64, photoUrl: compressedBase64 });
        await updateUser({ ...user, photoKey: compressedBase64, photoUrl: compressedBase64 });
      } catch (error) {
        console.error("Error al comprimir la imagen:", error);
      }
    }
  };

  // Función para comprimir imágenes
  const compressImage = (file: File, maxWidth: number = 200, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular nuevas dimensiones manteniendo la proporción
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Dibujar imagen redimensionada
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convertir a base64 con compresión
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };


  return (
    <div className="min-h-screen w-full bg-white flex">
      <main className="flex-1 flex flex-col px-12 py-8">
        <span className="mt-2 mb-4 text-[48px] font-semibold leading-[100%] font-exo text-left">
          Gestión de Perfil
        </span>
        <div className="flex flex-row gap-12 mt-4">
          <div className="flex flex-col items-center min-w-[260px] pt-0">
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

          {/* Formulario de edición de datos */}
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
                  as={key === "institucion" || key === "tipoId" || key === "tipoUsuario" || key === "genero" ? "select" : undefined}
                  options={key === "institucion" ? instituciones.map(inst => inst.nombre) : key === "tipoId" ? tiposId : key === "tipoUsuario" ? tiposUsuario : key === "genero" ? generos : [userData[key as keyof typeof userData]]}
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
                      captionLayout="buttons" // Selector 
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
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
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowCurrentPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {/* Mostrar error de contraseña actual*/}
                  {passwordChangeError && (
                    <p className="text-red-500 text-sm mt-1">{passwordChangeError}</p>
                  )}
                </div>
                {/* Contraseña nueva */}
                <div className="flex flex-col gap-y-3">
                  <Label>Contraseña nueva <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowNewPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {newPassword && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword) && (
                    <p className="text-red-500 text-sm mt-1">
                      Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.
                    </p>
                  )}
                </div>
                {/* Confirmar contraseña */}
                <div className="flex flex-col gap-y-3">
                  <Label>Confirmar contraseña <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden.</p>
                  )}
                </div>
                <p className="text-xs text-red-500">* Información obligatoria</p>
              </div>
              <DialogFooter className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                  setPasswordsMatch(true);
                }} className="text-blue-600">
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
                  onClick={handleChangePassword}
                >
                  Confirmar cambios
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      {/* AlertDialog de confirmación de guardado */}
      <AlertDialog open={showSavedDialog} onOpenChange={setShowSavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Cambios guardados!</AlertDialogTitle>
            <AlertDialogDescription>
              Tus cambios han sido guardados exitosamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSavedDialog(false)}
              className="bg-[#7875F8] text-white hover:bg-[#5f5be6]">
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Componente para los inputs del perfil
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
        <Select disabled={!editable} onValueChange={(val) => onChange?.(val)} value={value}>
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
      {editable && error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  );
}

export default ProfileSettings;
