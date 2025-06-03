import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function SinVehiculos() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      {/* Logo hitchhop encima */}
      <Image
        source={require('@/assets/images/hitchhop-logo.png')} 
        style={{ width: '115%', height: 100, resizeMode: 'cover', marginBottom: 8, marginTop: -90 }}
      />
      <Image
        source={require('@/assets/images/gatoautos.png')}
        style={{ width: 400, height: 400, marginBottom: 24, marginLeft: -50, marginTop: +58 }}
      />
      <Text style={{ fontSize: 20, marginBottom: 16, color: '#222' }}>
        No hay vehículos registrados
      </Text>
      <Button
        title="Agregar Vehículo"
        color="#7B61FF"
        onPress={() => router.push("/(tabs)/vehiculos/agregarVehiculo")}
      />
    </View>
  );
}