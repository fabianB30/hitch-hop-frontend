import { Stack } from 'expo-router';

export default function VehiculosLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Vehículos' }} />
      <Stack.Screen name="agregarVehiculo" options={{ title: 'Agregar Vehículo' }} />
      <Stack.Screen name="editarVehiculo" options={{ title: 'Editar Información' }} />
      <Stack.Screen name="informacionVehiculo" options={{ title: 'Información' }} />
    </Stack>
  );
}
