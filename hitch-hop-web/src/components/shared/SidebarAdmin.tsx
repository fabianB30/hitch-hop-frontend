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
  SidebarProvider
} from "@/components/ui/sidebar";
import { NavLink, Outlet, useLocation } from "react-router-dom";

// lista de dirs del sidebar
const items = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Gestión de Usuarios", url: "/gestion", icon: Users },
  { title: "Gestión de Perfil", url: "/perfil", icon: User },
  { title: "Consultas", url: "/consultas", icon: Search },
  { title: "Estadísticas", url: "/estadistica", icon: ChartNoAxesColumnIncreasing },
];

export default function SidebarAdmin() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="bg-[color:var(--primary-300)]">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-[36px] font-black text-[color:var(--text-50)]">HitchHop</span>
              <span className="text-2xl font-logo text-[color:var(--text-50)]">Administrador</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-[color:var(--primary-300)]">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = location.pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors ${
                            isActive
                              ? "bg-background text-[color:var(--primary-300)] border-[color:var(--primary-900)]"
                              : "text-[color:var(--text-50)] hover:bg-[color:var(--primary-100)] hover:text-[color:var(--primary-900)]"
                          }`}
                        >
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
