import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
            <div className="grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_60px] gap-2 h-14 items-center">
              <div className="text-[#8886D7] font-exo font-semibold text-base">ID</div>
              <div className="text-black font-exo font-semibold text-base">Username</div>
              <div className="text-black font-exo font-semibold text-base">Email</div>
              <div className="text-black font-exo font-semibold text-base">Tipo de Usuario</div>
              <div className="text-black font-exo font-semibold text-base">Fecha de Registro</div>
              <div className="text-black font-exo font-semibold text-base text-center">Institución</div>
              <div></div>
            </div>

            {/* Contenedor scrollable para las filas */}
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                paddingRight: "24px", // Agrega espacio a la derecha para separar el scrollbar
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
