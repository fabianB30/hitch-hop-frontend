import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';

import { registerVehicleRequest } from '@/interconnection/vehicle';
import { useAuth } from '../Context/auth-context';
import { addCarsRequest } from '@/interconnection/user';

export default function AgregarVehiculo() {
  const router = useRouter();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [color, setColor] = useState('');
  const [anio, setAnio] = useState('');
  const [foto, setFoto] = useState(null);
  const { user,setUser } = useAuth();

  const handleAgregar = async () => {
      const vehicleData = { 
        model: modelo, 
        brand: marca, 
        color: color, 
        plate: placa,
        year: anio,
        userId: user._id
      };
    try {
      const vehicle = await registerVehicleRequest(vehicleData);
      //console.log('Vehículo registrado:', vehicle);
      if (user && vehicle) {
        setUser({
          ...user,
          vehicles: [...user.vehicles, vehicle._id] // Actualizar el estado del usuario con el nuevo vehículo
        });
      }

    } catch (error) {
      console.error('Error al registrar el vehículo:', error);
    }

    router.push('/vehiculos')
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 24 }}>
      <Image
              source={require('@/assets/images/hitchhop-logo.png')} 
              style={{ width: '115%', height: 100, resizeMode: 'cover', marginBottom: 8, marginTop: -24, marginLeft: -25 }}
            />
      <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>Agregar Vehículo</Text>
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
      {foto ? (
        <Image source={{ uri: foto }} style={{ width: 120, height: 80, borderRadius: 8, marginVertical: 8 }} />
      ) : (
        <View style={{ borderWidth: 1, borderRadius: 8, height: 100, justifyContent: 'center', alignItems: 'center', marginVertical: 8 }}>
          <Text>Sube una foto</Text>
        </View>
      )}
      <TouchableOpacity
        style={{ backgroundColor: '#FFB800', borderRadius: 8, padding: 12, marginTop: 16 }}
        onPress={handleAgregar}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Agregar</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}
