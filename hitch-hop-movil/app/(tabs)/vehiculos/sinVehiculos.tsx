import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SinVehiculos() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Image
        source={require('../../../assets/gatoautos.png')}
        style={{ width: 180, height: 180, marginBottom: 24 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 16, marginBottom: 16, color: '#222' }}>
        No hay vehículos registrados
      </Text>
      <Button
        title="Agregar Vehículo"
        color="#7B61FF"
        onPress={() => router.push('agregarVehiculo')}
      />
    </View>
  );
}