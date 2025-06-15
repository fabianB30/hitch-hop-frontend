import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue,} from "@/components/ui/select";
import { Dialog,DialogTrigger,DialogContent,DialogHeader,DialogFooter,DialogTitle,DialogDescription,DialogClose,} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
const users = [
  { id: 123, username: "fabianB30", email: "frojas@estudiantec.cr", type: "Conductor", date: "Dec 5", institution: "ITCR" },
  { id: 124, username: "gerardo510", email: "gcorrales@estudiantec.cr", type: "Pasajero", date: "Nov 29", institution: "ITCR" },
  { id: 125, username: "maria12", email: "marguedas@estudiantec.cr", type: "Administrador", date: "Oct 16", institution: "ITCR" },
  { id: 126, username: "ruben2193", email: "rbarrantes@estudiantec.cr", type: "Pasajero", date: "Set 23", institution: "ITCR" },
  { id: 127, username: "abrenes08", email: "abrenes@estudiantec.cr", type: "Pasajero", date: "Set 17", institution: "ITCR" },
  { id: 128, username: "lbarboza", email: "lbarboza@estudiantec.cr", type: "Conductor", date: "Ago 21", institution: "ITCR" },
  { id: 129, username: "jcalderon5", email: "jcalderon@itcr.ac.cr", type: "Conductor", date: "Ago 2", institution: "ITCR" },
  { id: 130, username: "maria12", email: "marguedas@estudiantec.cr", type: "Pasajero", date: "Ago 29", institution: "ITCR" },
  { id: 131, username: "bgutierrez", email: "bgutierrez@estudiantec.cr", type: "Conductor", date: "Jul 9", institution: "ITCR" },
  { id: 132, username: "pvartavia93", email: "partavia@itcr.ac.cr", type: "Pasajero", date: "Jul 24", institution: "ITCR" },
];

const userTypes = ["Todos", "Conductor", "Pasajero", "Administrador"];
const institutions = ["Todas", "ITCR"];

const UsersManagement: React.FC = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterType, setFilterType] = useState("Todos");
  const [filterInstitution, setFilterInstitution] = useState("Todas");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchUsername = !searchUsername || user.username.toLowerCase().includes(searchUsername.toLowerCase());
    const matchEmail = !searchEmail || user.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchType = filterType === "Todos" || user.type === filterType;
    const matchInst = filterInstitution === "Todas" || user.institution === filterInstitution;
    return matchUsername && matchEmail && matchType && matchInst;
  });

   // Vista de informacion de un usuario especifico
  function UserDetailsView({ user, onBack }: { user: any; onBack: () => void }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: user.username || "",
    email: user.email || "",
    name: user.name || "",
    firstLastName: user.firstLastName || "",
    secondLastName: user.secondLastName || "",
    phone: user.phone || "",
    institution: user.institution || "",
    type: user.type || "",
  });

  // Estado de la cuenta y dialog de desactivación
  const [accountActive, setAccountActive] = useState(user.accountActive ?? true);
  const [showDialog, setShowDialog] = useState(false);

  // Selects
  const institutionOptions = ["ITCR"];
  const typeOptions = ["Conductor", "Pasajero", "Administrador"];
  
  // Actualiza los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Para selects personalizados
  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  // Cancelar
  const handleCancel = () => {
    setForm({
      username: user.username || "",
      email: user.email || "",
      name: user.name || "",
      firstLastName: user.firstLastName || "",
      secondLastName: user.secondLastName || "",
      phone: user.phone || "",
      institution: user.institution || "",
      type: user.type || "",
    });
    setEditMode(false);
  };

  // Guardar cambios
  const handleSave = () => {
    // logic de guardar en base de datos
    setEditMode(false);
  };
  
  // Handler para el switch
  const handleSwitchClick = () => {
  if (accountActive) {
    // Si está activo, pide confirmación para desactivar
    setShowDialog(true);
  } else {
    // Si está desactivado, actívalo directamente sin dialog
    setAccountActive(true);
  }
};

  const handleConfirmDeactivate = () => {
    setAccountActive(false);
    setShowDialog(false);
    // Aquí podrías agregar lógica para actualizar en backend
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
        {/* Left column - user info */}
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
              </div>
              <div className="flex-1">
                <Label className="text-lg">1° Apellido</Label>
                <Input
                  name="firstLastName"
                  disabled={!editMode}
                  value={form.firstLastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Label className="text-lg">2° Apellido</Label>
                <Input
                  name="secondLastName"
                  disabled={!editMode}
                  value={form.secondLastName}
                  onChange={handleChange}
                />
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
            </div>
            <div>
              <Label className="text-lg">Institución</Label>
              {editMode ? (
                <select
                  name="institution"
                  className="w-full border rounded-lg px-3 py-2"
                  value={form.institution}
                  onChange={(e) => handleSelectChange("institution", e.target.value)}
                >
                  {institutionOptions.map((inst) => (
                    <option key={inst} value={inst}>{inst}</option>
                  ))}
                </select>
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
        {/* Right column - roles & permissions */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow-md border border-[#DDDCDB] w-[450px] p-6">
            <h2 className="text-[30px] font-bold mb-6">Tipos y Permisos</h2>
            <div className="flex flex-col gap-4">
             <div>
                <Label className="text-lg">Tipo de Usuario</Label>
                {editMode ? (
                  <select
                    name="type"
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.type}
                    onChange={(e) => handleSelectChange("type", e.target.value)}
                  >
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                ) : (
                  <Input disabled value={form.type} />
                )}
              </div>
              <div>
                <Label className="text-base font-semibold">Tipo de Vehículo</Label>
                <p className="text-sm text-[#525252]">{user.vehicle?.type || ""}</p>
              </div>
              <div>
                <Label className="text-base font-semibold">Modelo</Label>
                <p className="text-sm text-[#525252]">{user.vehicle?.model || ""}</p>
              </div>
              <div>
                <Label className="text-base font-semibold">Año</Label>
                <p className="text-sm text-[#525252]">{user.vehicle?.year || ""}</p>
              </div>
            </div>
          </div>
          {/* Account status */}
          <div className="bg-white rounded-xl shadow-md border border-[#DDDCDB] w-[450px] p-6">
          <h2 className="text-[30px] font-bold mb-4">Estado de Cuenta</h2>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-md font-semibold">Estado de Cuenta</Label>
            <Switch checked={accountActive} onCheckedChange={handleSwitchClick} />
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

  // Si se selecciona un usuario, muestra sus detalles
  if (selectedUser) {
    return (
      <UserDetailsView
        user={selectedUser}
        onBack={() => setSelectedUser(null)}
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
                {userTypes.map((type) => (
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
                {institutions.map((inst) => (
                  <SelectItem key={inst} value={inst}>{inst}</SelectItem>
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
                  <div className="text-black font-exo font-medium text-base text-center">{user.institution}</div>
                  <button
                    className="bg-[#7875F8] hover:bg-[#5a57c7] text-white rounded px-3 py-1 text-xs font-exo font-semibold"
                    onClick={() => setSelectedUser(user)}
                  >
                    Ver
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
