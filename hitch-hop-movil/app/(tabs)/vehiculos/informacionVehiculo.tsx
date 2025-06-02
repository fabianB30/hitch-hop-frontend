import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';

const mockVehiculo = {
  marca: 'Hyundai',
  modelo: 'Santa Fe',
  placa: 'BTR-932',
  color: 'Gris',
  anio: '2019',
  foto: require('@/assets/images/santafe.png'),
};

export default function InformacionVehiculo() {
  const router = useRouter();
  const vehiculo = mockVehiculo;

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>Información</Text>
      <Image source={require('@/assets/images/santafe.png')} style={{ width: 160, height: 120, borderRadius: 12, marginBottom: 16 }} />
      <Text>Marca</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo.marca}</Text>
      <Text>Modelo</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo.modelo}</Text>
      <Text>Placa</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo.placa}</Text>
      <Text>Color</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo.color}</Text>
      <Text>Año</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>{vehiculo.anio}</Text>
      <TouchableOpacity
        style={{ backgroundColor: '#FFB800', borderRadius: 8, padding: 12, marginTop: 16 }}
        onPress={() => router.push("/(tabs)/vehiculos/editarVehiculo")}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Editar Información</Text>
      </TouchableOpacity>
    </View>
  );
}