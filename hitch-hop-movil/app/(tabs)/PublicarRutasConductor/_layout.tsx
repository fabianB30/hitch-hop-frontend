import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="formPublicarRuta"
        options={{ title: "Publicar Ruta" }}
      />
    </Stack>
  );
}