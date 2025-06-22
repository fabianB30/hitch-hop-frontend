// Autores: Fabián Bustos
// Es componente padre, adjunto en la ruta / para que sea renderizado por todas sus rutas hijas
// de esta forma aparece en múltiples páginas sin necesidad de importarlo ni incluirlo 
// Utilizado principalmente para funciones de navegación 
import {  Home, User, Search,  Users, ChartNoAxesColumnIncreasing } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter
} from "@/components/ui/sidebar";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/Context/auth-context";

// lista de directorios del sidebar
const items = [
  { title: "Inicio", url: "/bienvenida", icon: Home },
  { title: "Gestión de Usuarios", url: "/users-management", icon: Users },
  { title: "Gestión de Perfil", url: "/profile-settings", icon: User },
  {
    title: "Consultas",
    icon: Search,
    children: [
      { title: "Viajes", url: "/consultas/total-viajes" },
      { title: "Promedio de cobros", url: "/consultas/promedio-monto" },
      { title: "Conductores con más viajes", url: "/consultas/top-conductores" },
      { title: "Usuarios con más viajes", url: "/consultas/top-usuarios" },
      { title: "Puntos recurrentes", url: "/consultas/puntos-recurrentes" },
      { title: "Nuevos usuarios", url: "/consultas/usuarios-nuevos" },
      { title: "Cancelaciones", url: "/consultas/top-cancelaciones" },
      { title: "Viajes gratuitos", url: "/consultas/top-gratis" },
      { title: "Viajes más caros", url: "/consultas/top-viajes-caros" },
    ],
  },
  { title: "Estadísticas", url: "/estadistica", icon: ChartNoAxesColumnIncreasing },
];


export default function SidebarAdmin() {
  const location = useLocation(); // provee ubicacion actual para resaltarla en sidebar 

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const { logout } = useAuth(); // funcion de context de autenticación 

  const navigate = useNavigate(); // se usa para ir a página inicial después de logout

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // maneja función de logout
  const handleLogout = async () => {
    try {
      await logout(); 
      console.log("Usuario logged out");
      navigate("/");
      
    } catch (error) {
      console.error("Error al hacer logout", error);
    }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="bg-[color:var(--primary-300)]">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-[36px] font-black text-[color:var(--text-50)]">
                HitchHop
              </span>
              <span className="text-2xl font-logo text-[color:var(--text-50)]">
                Administrador
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-[color:var(--primary-300)]">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = location.pathname === item.url;
                  const isOpen = openMenus[item.title] || false;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        onClick={() => {
                          if (item.children) {
                            toggleMenu(item.title);
                            navigate("/consultas/total-viajes");
                          }
                        }}
                      >
                        <NavLink
                          to={item.url ?? "#"}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors text-[16px] ${
                            isActive
                              ? "bg-background text-[color:var(--primary300)] border-[color:var(--primary-900)]"
                              : "text-[color:var(--text-50)] hover:bg-[color:var(--primary-100)] hover:text-[color:var(--primary-900)]"
                          }`}
                        >
                          {item.icon && <item.icon className="size-4" />}
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>

                      {item.children && isOpen && (
                        <div className="ml-2 mt-1 flex flex-col gap-1">
                          <div
                            className="flex flex-col gap-1 rounded-lg"
                            style={{
                              backgroundColor: "var(--Primary-primary0,rgb(255, 255, 255))",
                              alignSelf: "stretch",
                              padding: "0px 16px 0px 8px",
                            }}
                          >
                            {item.children.map((child) => {
                              const isChildActive = location.pathname === child.url;
                              return (
                                <SidebarMenuButton key={child.title} asChild>
                                  <NavLink
                                    to={child.url ?? "#"}
                                    className={`flex items-center gap-[14px] h-[26px] rounded-lg transition-colors ${
                                      isChildActive
                                        ? "bg-[color:var(--Primary-primary0,#ECECFF)] border border-[color:var(--Primary-primary0,#ECECFF)]"
                                        : "hover:bg-[color:var(--primary-100)]"
                                    }`}
                                    style={{
                                      padding: "0px 16px 0px 8px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        display: "flex",
                                        height: "52px",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        flex: "1 0 0",
                                        overflow: "hidden",
                                        color: "var(--Primary-primary300, #7875F8)",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        fontFamily: "Exo",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        lineHeight: "normal",
                                      }}
                                    >
                                      {child.title}
                                    </span>
                                  </NavLink>
                                </SidebarMenuButton>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-[color:var(--primary-300)]">
                <Button 
                  className="mx-1 bg-white text-[color:var(--primary-400)] px-[45px] hover:bg-[color:var(--secondary-100)] hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Cerrar Sesión
                </Button>
        </SidebarFooter>
      </Sidebar>
      {/* Se usa para enviar sidebar a todos los componentes hijos*/}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
