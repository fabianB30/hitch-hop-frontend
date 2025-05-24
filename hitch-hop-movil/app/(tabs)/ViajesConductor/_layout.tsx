import { Stack } from "expo-router";

export default function ViajesPasajeroLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Viajes" }} />
      <Stack.Screen
        name="verViajesAceptados"
        options={{ title: "Detalles del Viaje" }}
      />
    </Stack>
  );
}
