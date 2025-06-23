import { Tabs, Stack } from "expo-router";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Children,ReactNode } from "react";

/*Esta sección es para la gestión de los vehículos 
*
* Esta página fue trabajada por:
*	Laura Amador
*	Óscar Obando
*	Mariano Mayorga
*
*
* */

export default function TabLayout({children} : {children: ReactNode}) {
  const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {children}
    </Stack>
  );
}
