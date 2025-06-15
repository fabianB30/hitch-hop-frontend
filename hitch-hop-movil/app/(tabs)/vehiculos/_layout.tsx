import { Tabs, Stack } from "expo-router";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Children,ReactNode } from "react";

export default function TabLayout({children} : {children: ReactNode}) {
  const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {children}
    </Stack>
  );

  
  /*(
      {QUITE ESTO PQ NO ESTABA EN EL PROTOTIPO, SI SE NECESITA LA BARRA  SE DFESCOMENTA}
      <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Transparent background on iOS to show blur
            position: "absolute",
          },
          default: { 
            height: 0, 
            paddingBottom: 0, 
            paddingTop: 0,   
          },
        }),
      }}
      initialRouteName="sinVehiculos"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );*/
}
