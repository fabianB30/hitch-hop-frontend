import { Tabs } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, // Oculta la barra de tabs
      }}
      initialRouteName="sinVehiculos"
    />
  );
}
