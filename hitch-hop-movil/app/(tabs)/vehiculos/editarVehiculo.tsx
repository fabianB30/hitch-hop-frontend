import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';

const mockVehiculos = [
  {
    id: '1',
    marca: 'Hyundai',
    modelo: 'Santa Fe',
    placa: 'BTR-932',
    color: 'Gris',
    anio: '2019',
    foto: require('@/assets/images/santafe.png'),
  },
];

export default function EditarVehiculo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const vehiculo = mockVehiculos.find(v => v.id === id);

  const [marca, setMarca] = useState(vehiculo?.marca || '');
  const [modelo, setModelo] = useState(vehiculo?.modelo || '');
  const [placa, setPlaca] = useState(vehiculo?.placa || '');
  const [color, setColor] = useState(vehiculo?.color || '');
  const [anio, setAnio] = useState(vehiculo?.anio || '');
  const [foto, setFoto] = useState(vehiculo?.foto || '');

  const handleGuardar = () => {
    // Aquí iría la lógica para guardar los cambios
    router.back();
  };

  if (!vehiculo) return <Text>Vehículo no encontrado</Text>;

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>Editar Información</Text>
      <Text>Marca*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={marca} onChangeText={setMarca} />
      <Text>Modelo*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={modelo} onChangeText={setModelo} />
      <Text>Placa*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={placa} onChangeText={setPlaca} />
      <Text>Color*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={color} onChangeText={setColor} />
      <Text>Año*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={anio} onChangeText={setAnio} keyboardType="numeric" />
      <Text style={{ marginTop: 8 }}>Fotografía del vehículo</Text>
      <Image source={{ uri: foto }} style={{ width: 120, height: 80, borderRadius: 8, marginVertical: 8 }} />
      <TouchableOpacity style={{ backgroundColor: '#FFB800', borderRadius: 8, padding: 12, marginTop: 16 }} onPress={handleGuardar}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Guardar Datos</Text>
      </TouchableOpacity>
    </View>
  );
}