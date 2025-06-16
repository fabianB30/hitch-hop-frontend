import React, { useState, useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue,} from "@/components/ui/select";
import { Dialog,DialogTrigger,DialogContent,DialogHeader,DialogFooter,DialogTitle,DialogDescription,DialogClose,} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllInstitutionsRequest } from "@/interconnection/institution";
import { getParameterByNameRequest } from '@/interconnection/paremeter';
import { getAllUsersRequest } from "@/interconnection/user";
import { getVehicleByIdRequest } from "@/interconnection/vehicle";
import { updateUserRequest } from "@/interconnection/user";

const UsersManagement: React.FC = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterType, setFilterType] = useState("Todos");
  const [filterInstitution, setFilterInstitution] = useState("Todas");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [instituciones, setInstituciones] = useState([]);
  const [tiposUsuario, setTiposUsuario] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [refreshUsers, setRefreshUsers] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const resInstitutions = await getAllInstitutionsRequest();
        const param = await getParameterByNameRequest("Tipo de Usuario");

        if (param) setTiposUsuario(param.parameterList);
        if (resInstitutions) setInstituciones(resInstitutions);
        console.log("Tipos de Usuario:", param);
        
      } catch (error) {
        console.error("Error al obtener opciones:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getAllUsersRequest();
      if (data) {
        const mapped = data.map((user: any,  idx: number) => ({
          id: idx + 1, // Asignar un ID único basado en el índice
          username: user.username,
          email: user.email,
          type: user.type,
          date: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
          institution: user.institutionId,
          vehicle: user.vehicles?.[0] || null,
          ...user,
        }));
        setUsers(mapped);
      }
    }
    fetchUsers();
  }, [refreshUsers]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getAllUsersRequest();
      if (data) {
        const mapped = data.map((user: any,  idx: number) => ({
          id: idx + 1, // Asignar un ID único basado en el índice
          username: user.username,
          email: user.email,
          type: user.type,
          date: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
          institution: user.institutionId,
          vehicle: user.vehicles?.[0] || null,
          ...user,
        }));
        setUsers(mapped);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchUsername = !searchUsername || user.username.toLowerCase().includes(searchUsername.toLowerCase());
    const matchEmail = !searchEmail || user.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchType = filterType === "Todos" || user.type === filterType;
    const matchInst = filterInstitution === "Todas" || user.institutionId === filterInstitution;
    return matchUsername && matchEmail && matchType && matchInst;
  });

  // Si se selecciona un usuario, muestra sus detalles
  if (selectedUser) {
    return (
      <UserDetailsView
        user={selectedUser}
        onBack={() => {
          setSelectedUser(null);
          setRefreshUsers((prev) => !prev);
        }}
      />
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Filters */}
      <div className="flex flex-col gap-2 max-w-[1184px] mx-auto pt-12 pb-2">
        <div className="flex flex-row justify-between items-center mb-2">
          <span className="text-[30px] font-bold font-exo">Lista de Usuarios</span>
        </div>

        <div className="flex flex-row gap-12 items-end">
          <div className="flex flex-col gap-1 w-[260px]">
            <Label className="font-semibold font-exo text-base">Búsqueda por nombre</Label>
            <Input
              placeholder="Buscar nombre de usuario ..."
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="rounded-lg border border-[#D3D3D3] bg-white w-full"
            />
          </div>
          <div className="flex flex-col gap-1 w-[260px]">
            <Label className="font-semibold font-exo text-base">Búsqueda por correo</Label>
            <Input
              placeholder="Buscar correo..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="rounded-lg border border-[#D3D3D3] bg-white w-full"
            />
          </div>
          <div className="flex flex-col gap-1 w-[260px]">
            <Label className="font-semibold font-exo text-base">Tipo de Usuario</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="rounded-lg border border-[#D3D3D3] bg-white w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                {tiposUsuario.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 w-[260px]">
            <Label className="font-semibold font-exo text-base">Institución</Label>
            <Select value={filterInstitution} onValueChange={setFilterInstitution}>
              <SelectTrigger className="rounded-lg border border-[#D3D3D3] bg-white w-full">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
                {instituciones.map((inst: any) => (
                  <SelectItem key={inst._id} value={inst._id}>{inst.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
      </div>

      {/* Table */}
      <div className="max-w-[1108px] mx-auto mt-8">
        <div className="relative">
          <div className="absolute w-full h-[644px] bg-[#ECECFF] rounded-[30px] z-0" />
          <div className="relative z-10 px-8 pt-8 pb-4">
            <div className="grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_102px] gap-2 h-14 items-center">
              <div className="text-[#8886D7] font-exo font-semibold text-base">ID</div>
              <div className="text-black font-exo font-semibold text-base">Username</div>
              <div className="text-black font-exo font-semibold text-base">Email</div>
              <div className="text-black font-exo font-semibold text-base">Tipo de Usuario</div>
              <div className="text-black font-exo font-semibold text-base">Fecha de Registro</div>
              <div className="text-black font-exo font-semibold text-base text-center">Institución</div>
              <div></div>
            </div>
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                paddingRight: "24px",
              }}
            >
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_60px] gap-2 h-14 items-center border-t border-[#ADA7FF] relative"
                >
                  <div className="text-[#8886D7] font-exo font-medium text-base">{user.id}</div>
                  <div className="text-black font-exo font-medium text-base">{user.username}</div>
                  <div className="text-black font-exo font-medium text-base truncate">{user.email}</div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-lg font-exo font-semibold text-xs ${user.type === "Administrador" ? "bg-[#FFD700]" : "bg-[#ADA7FF]"}`}>
                      {user.type}
                    </span>
                  </div>
                  <div className="text-[#8886D7] font-exo text-base">{user.date}</div>
                  <div className="text-black font-exo font-medium text-base text-center">
                    {instituciones.find((i: any) => i._id === user.institutionId)?.nombre || ""}
                  </div>
                  <button
                    className="bg-[#7875F8] hover:bg-[#5a57c7] text-white rounded px-5 py-0.5 text-xs font-exo font-semibold items-center justify-cente"
                    onClick={() => setSelectedUser(user)}
                  >
                    <ChevronRight />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
   // Vista de informacion de un usuario especifico
  function UserDetailsView({ user, onBack }: { user: any; onBack: () => void }) {
    const [editMode, setEditMode] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
      username: user.username || "",
      email: user.email || "",
      name: user.name || "",
      firstLastName: user.firstSurname || "",
      secondLastName: user.secondSurname || "",
      phone: user.phone || "",
      institution: instituciones.find((i: any) => i._id === user.institutionId)?.nombre || "",
      type: user.type || "",
    });
    const [vehicles, setVehicles] = useState<any[]>([]);
    useEffect(() => {
    async function fetchVehicles() {
      if (user.vehicles && user.vehicles.length > 0) {
        const vehiclesData = await Promise.all(
          user.vehicles.map((id: string) => getVehicleByIdRequest(id))
        );
        // Filtra los posibles null
        setVehicles(vehiclesData.filter(Boolean));
      } else {
        setVehicles([]);
      }
    }
    fetchVehicles();
  }, [user.vehicles]);
   
  const validateUserData = (data: typeof form) => {
    const errors: Record<string, string> = {};
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!nameRegex.test(data.name)) errors.name = "El nombre solo puede contener letras.";
    if (!nameRegex.test(data.firstLastName)) errors.firstLastName = "El primer apellido solo puede contener letras.";
    if (!nameRegex.test(data.secondLastName)) errors.secondLastName = "El segundo apellido solo puede contener letras.";
    if (!/^\d{8}$/.test(String(data.phone))) errors.phone = "El teléfono debe tener 8 dígitos.";
    if (!/^.+@(itcr\.ac\.cr|estudiantec\.cr)$/.test(data.email)) {
      errors.email = "El correo debe terminar en @itcr.ac.cr o @estudiantec.cr.";
  }

  setFieldErrors(errors);
  return Object.keys(errors).length === 0;
 };

    // Estado de la cuenta y dialog de desactivación
    const isInitiallyActive = user.type === "Administrador" || user.type === "Usuario";
    const [accountActive, setAccountActive] = useState(isInitiallyActive);
    const [showDialog, setShowDialog] = useState(false);

    // Selects
    const activeTypes = ["Administrador", "Usuario"];
    const institutionOptions = instituciones.map((inst: any) => inst.nombre);
    
    // Actualiza los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSelectChange = (name: string, value: string) => {
      setForm({ ...form, [name]: value });
    };
    const handleCancel = () => {
      setForm({
        username: user.username || "",
        email: user.email || "",
        name: user.name || "",
        firstLastName: user.firstSurname || "",
        secondLastName: user.secondSurname || "",
        phone: user.phone || "",
        institution: instituciones.find((i: any) => i._id === user.institutionId)?.nombre || "",
        type: user.type || "",
      });
      setEditMode(false);
    };

    // Guardar cambios
    const handleSave = async () => {
      const isValid = validateUserData(form);
      if (!isValid) {
        return;
      }
      try {
        const updatedUser = {
          ...user,
          username: form.username,
          email: form.email,
          name: form.name,
          firstSurname: form.firstLastName,
          secondSurname: form.secondLastName,
          phone: form.phone,
          institutionId: instituciones.find((i: any) => i.nombre === form.institution)?._id || user.institutionId,
          type: form.type,
        };

        await updateUserRequest(user._id, updatedUser);

        setEditMode(false);
        setFieldErrors({});
      } catch (error) {
        console.error("Error al guardar usuario:", error);
      }
    };
    
    const handleSwitchClick = async () => {
      if (accountActive) {
        setShowDialog(true);
      } else {
        let newType = form.type;
        if (form.type === "Inactivo - User") newType = "Usuario";
        if (form.type === "Inactivo - Admin") newType = "Administrador";
        setForm({ ...form, type: newType });
        setAccountActive(true);
        await updateUserRequest(user._id, {
          ...user,
          type: newType,
        }); 
      }
   };

    const handleConfirmDeactivate = async () => {
      let newType = form.type;
      if (form.type === "Administrador") newType = "Inactivo - Admin";
      if (form.type === "Usuario") newType = "Inactivo - User";
      setForm({ ...form, type: newType });
      setAccountActive(false);
      await updateUserRequest(user._id, {
        ...user,
        type: newType,
      });
      setShowDialog(false);
    };

    const handleCancelDeactivate = () => {
      setShowDialog(false);
    };

    return (
      <div className="w-full min-h-screen bg-[#ECECFF] rounded-[30px] flex flex-col items-center p-10 font-exo">
        <div className="flex items-center w-full max-w-[960px] mb-6">
          <Button
            className="ml-[6px] mr-6 bg-[#7875F8] hover:bg-[#5a57c7] text-white"
            variant="outline"
            onClick={onBack}
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-[36px] font-bold text-[#171717] mb-0">Detalles de Usuario</h1>
        </div>
        <div className="flex gap-12">
          {/* Información del usuario */}
          <div className="bg-white rounded-xl shadow-md border border-[#DDDCDB] w-[450px] p-6">
            <h2 className="text-[30px] font-bold mb-6">Información de Usuario</h2>
            <div className="flex flex-col gap-4">
              <div>
                <Label className="text-lg">ID de Usuario</Label>
                <Input disabled value={`ID-${user.id}`} />
              </div>
              <div>
                <Label className="text-lg">Fecha de Registro</Label>
                <Input disabled value={user.date} />
              </div>
              <div>
                <Label className="text-lg">Username</Label>
                <Input
                  name="username"
                  disabled={!editMode}
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="text-lg">Correo Electrónico</Label>
                <Input
                  name="email"
                  disabled={!editMode}
                  value={form.email}
                  onChange={handleChange}
                />
                {fieldErrors.email && (
                  <div className="text-red-500 text-xs">{fieldErrors.email}</div>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label className="text-lg">Nombre</Label>
                  <Input
                    name="name"
                    disabled={!editMode}
                    value={form.name}
                    onChange={handleChange}
                  />
                  {fieldErrors.name && (
                    <div className="text-red-500 text-xs">{fieldErrors.name}</div>
                  )}
                </div>
                <div className="flex-1">
                  <Label className="text-lg">1° Apellido</Label>
                  <Input
                    name="firstLastName"
                    disabled={!editMode}
                    value={form.firstLastName}
                    onChange={handleChange}
                  />
                  {fieldErrors.firstLastName && (
                    <div className="text-red-500 text-xs">{fieldErrors.firstLastName}</div>
                  )}
                </div>
                <div className="flex-1">
                  <Label className="text-lg">2° Apellido</Label>
                  <Input
                    name="secondLastName"
                    disabled={!editMode}
                    value={form.secondLastName}
                    onChange={handleChange}
                  />
                  {fieldErrors.secondLastName && (
                    <div className="text-red-500 text-xs">{fieldErrors.secondLastName}</div>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-lg">Teléfono</Label>
                <Input
                  name="phone"
                  disabled={!editMode}
                  value={form.phone}
                  onChange={handleChange}
                />
                {fieldErrors.phone && (
                  <div className="text-red-500 text-xs">{fieldErrors.phone}</div>
                )}
              </div>
              <div>
                <Label className="text-lg">Institución</Label>
                {editMode ? (
                  <Select
                    value={form.institution}
                    onValueChange={(value) => handleSelectChange("institution", value)}
                  >
                    <SelectTrigger className="w-full border rounded-lg px-3 py-2">
                      <SelectValue placeholder="Selecciona una institución" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutionOptions.map((inst) => (
                        <SelectItem key={inst} value={inst}>
                          {inst}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input disabled value={form.institution} />
                )}
              </div>
            </div>
            {!editMode ? (
              <Button
                className="bg-[#7875F8] hover:bg-[#5a57c7] text-white mt-6"
                onClick={() => setEditMode(true)}
              >
                Editar
              </Button>
            ) : (
              <div className="flex gap-4 mt-6">
                <Button
                  className="bg-[#7875F8] hover:bg-[#5a57c7] text-white"
                  onClick={handleSave}
                >
                  Guardar Cambios
                </Button>
                <Button
                  className="bg-gray-300 hover:bg-gray-400 text-black"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
          {/* Roles y permisos*/}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow-md border border-[#DDDCDB] w-[450px] p-6">
              <h2 className="text-[30px] font-bold mb-6">Tipos y Permisos</h2>
              <div className="flex flex-col gap-4">
              <div>
                  <Label className="text-lg">Tipo de Usuario</Label>
                  {editMode ? (
                    <Select
                      value={form.type}
                      onValueChange={(value) => handleSelectChange("type", value)}
                      disabled={!accountActive}
                    >
                      <SelectTrigger className="w-full border rounded-lg px-3 py-2">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input disabled value={form.type} />
                  )}
                </div>
                {/* Mostrar todos los autos */}
                {vehicles.length === 0 ? (
                  <div>
                    <Label className="text-base font-semibold">Autos</Label>
                    <p className="text-sm text-[#525252]">No tiene autos registrados.</p>
                  </div>
                ) : (
                  vehicles.map((car, idx) => (
                    <div key={car._id || idx} className="mb-2 border-b border-gray-200 pb-2">
                      <Label className="text-base font-semibold">Auto {idx + 1}</Label>
                      <div className="flex flex-col gap-1 ml-2">
                        <div>
                          <span className="font-semibold">Marca: </span>
                          <span className="text-sm text-[#525252]">{car.brand || ""}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Modelo: </span>
                          <span className="text-sm text-[#525252]">{car.model || ""}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Año: </span>
                          <span className="text-sm text-[#525252]">{car.year || ""}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Estado de la cuenta */}
            <div className="bg-white rounded-xl shadow-md border border-[#DDDCDB] w-[450px] p-6">
            <h2 className="text-[30px] font-bold mb-4">Estado de Cuenta</h2>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-md font-semibold">Estado de Cuenta</Label>
              <Switch
                checked={accountActive}
                onCheckedChange={handleSwitchClick}
                className={accountActive ? "bg-[yellow]" : "bg-gray-300"}
              />
            </div>
            <p className="text-sm text-[#525252] mb-1">
              {accountActive
                ? "Esta cuenta está actualmente activa"
                : "Esta cuenta está actualmente desactivada"}
            </p>
            <p className="text-xs text-[#525252]">
              Desactivar esta cuenta prevendrá el ingreso del usuario al sistema pero no eliminará sus datos.
            </p>
          </div>
          {/* Dialog de confirmación */}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Desactivar cuenta</DialogTitle>
                <DialogDescription>
                  ¿Está seguro de que desea desactivar la cuenta de este usuario? El usuario no podrá ingresar al sistema.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelDeactivate}>
                  Cancelar
                </Button>
                <Button className="bg-[#7875F8] text-white" onClick={handleConfirmDeactivate}>
                  Aceptar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      </div>
    );
  } 
};

export default UsersManagement;
