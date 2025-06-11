import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ title: "Publicar Rutas" }}
      />
      <Stack.Screen
        name="formPublicarRuta"
        options={{ title: "Publicar Ruta" }}
      />
      <Stack.Screen
        name="publicarRuta"
        options={{ title: "Publicar Ruta" }}
      />
      <Stack.Screen
        name="verRutasPublicadas"
        options={{ title: "Rutas Publicadas" }}
      />
    </Stack>
  );
}