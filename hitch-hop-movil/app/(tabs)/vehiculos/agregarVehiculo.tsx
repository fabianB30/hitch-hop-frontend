import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';

export default function AgregarVehiculo() {
  const router = useRouter();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [color, setColor] = useState('');
  const [anio, setAnio] = useState('');
  const [foto, setFoto] = useState(null);

  const handleAgregar = () => {
    // Aquí iría la lógica para guardar el vehículo
    router.back();
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
        onPress={() => router.push('/vehiculos/vehiculoCreado')}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Agregar</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 393,
    height: 852,
    position: 'relative',
    backgroundColor: 'white'
  },
  backgroundImageStyle: {
    opacity: 0.15,
  },
  logo: {
    position: 'absolute',
    top: 30,
    right: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#000'
  },
  title: {
    position: 'absolute',
    top: 80,
    left: 65,
    fontSize: 36,
    fontFamily: 'Exo-Medium',
    fontWeight: '700',
    color: '#171717'
  },
  firstCard: {
    position: 'absolute',
    top: 210,
    left: 25.81,
    width: 342,
    height: 185,
    backgroundColor: 'rgba(120, 117, 248, 0.72)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 180
  },
  firstCardText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Exo-Medium'
  },
  firstCharacter: {
    position: 'absolute',
    top: 135,
    left: -39,
    width: 262,
    height: 262,
    resizeMode: 'contain'
  },
  secondCard: {
    position: 'absolute',
    top: 460,
    left: 25.81,
    width: 342,
    height: 185,
    backgroundColor: 'rgba(255, 171, 0, 0.6)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 25
  },
  secondCardText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Exo-Medium',
    paddingBottom: 10,
    maxWidth: 160,
    textAlign: 'left'
  },
  secondCharacter: {
    position: 'absolute',
    top: 385,
    left: 133,
    width: 292,
    height: 292,
    resizeMode: 'contain'
  },
});

