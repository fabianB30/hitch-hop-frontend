import { View, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../app/(tabs)/Context/auth-context';

export const HHTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const hideOnRoutes = ['/InicioSesion', '/Register', '/VentanaInicial'];
  const shouldHide = hideOnRoutes.some(route => pathname.startsWith(route));
  const {user} = useAuth();
  
  if (shouldHide) return null;

  const tabs = user?.role === 'Conductor'
    ? [
        { icon: 'home-outline', route: '/HomeConductor' },
        { icon: 'notifications-outline', route: '/NotificacionesConductor' },
        { icon: 'search-outline', route: '/RouteSearch' },
        //{ icon: 'car-outline', route: '/vehiculos' },
        { icon: 'menu-outline', route: '/GestionPerfilConductor' },
      ]
    : [
        { icon: 'home-outline', route: '/HomePasajero' },
        { icon: 'notifications-outline', route: '/NotificacionesPasajero' },
        { icon: 'search-outline', route: '/RouteSearch' },
        { icon: 'menu-outline', route: '/GestionPerfilPasajero' },
      ];
  

  return (
    user ? (
    <View className="flex-row justify-around items-center h-14 bg-[#7875F8]">
      {tabs.map(({ icon, route }) => (
        <TabItem key={route} icon={icon} route={route} currentPath={pathname} />
      ))}
    </View>
    ) : null
  );
};

type TabItemProps = {
  icon: string;
  route: string;
  currentPath: string;
};

const TabItem = ({ icon, route, currentPath }: TabItemProps) => {
  const router = useRouter();
  const isActive = currentPath === route;

  return (
    <TouchableOpacity
      onPress={() => router.push(route as any)}
      className={`w-1/4 h-full items-center justify-center ${isActive ? 'bg-[#5e5bcf]' : ''}`}
    >
      <Ionicons name={icon as any} size={29} color="white" />
    </TouchableOpacity>
  );
};
