import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const mockVehiculos = [
  {
    id: '1',
    marca: 'Hyundai',
    modelo: 'Santa Fe',
    placa: 'BTR-932',
    color: 'Gris',
    anio: '2019',
    foto: 'C:\Users\Mayorga\OneDrive\Documents\gitAP\hitch-hop-frontend\hitch-hop-movil\assets\images\santafe.png',
  },
];

export default function InformacionVehiculo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const vehiculo = mockVehiculos.find(v => v.id === id);

  if (!vehiculo) return <Text>Vehículo no encontrado</Text>;

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>Información</Text>
      <Image source={{ uri: vehiculo.foto }} style={{ width: 160, height: 120, borderRadius: 12, marginBottom: 16 }} />
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
      <TouchableOpacity style={{ backgroundColor: '#FFB800', borderRadius: 8, padding: 12, marginTop: 16 }} onPress={() => router.push({pathname: 'editarVehiculo', params: { id: vehiculo.id } })}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Editar Información</Text>
      </TouchableOpacity>
    </View>
  );
}