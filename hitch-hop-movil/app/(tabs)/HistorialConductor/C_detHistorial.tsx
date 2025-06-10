import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function C_detHistorial() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f3ff' }}>
      {/* Fondo superior con logo */}
      <View style={{ width: '100%', height: 140, position: 'absolute', top: 0, left: 0 }}>
        <Image
          source={require('@/assets/images/HHlogo.png')}
          style={{
            width: '160%',
            height: '100%',
            position: 'absolute',
            top: -20,
            left: '-10%',
          }}
          resizeMode="cover"
        />
        {/* Logo encima del fondo */}
        <Image
          source={require('@/assets/images/HHLogoDisplay.png')}
          style={{ width: 120, height: 36, position: 'absolute', top: 16, right: 16 }}
          resizeMode="contain"
        />
      </View>

      {/* Contenido principal */}
      <View style={{
        flex: 1,
        marginTop: 100,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 0,
        paddingTop: 24,
      }}>
        {/* Flecha back y título */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/HistorialConductor/C_historialLleno')}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
            <Text style={{ fontSize: 20, color: '#181718' }}>
              Viaje del 25 de febrero del 2025 a las 20:43
            </Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#181718', marginTop: -4 }}>
              Conductor
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>

          {/* Punto de inicio */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>Punto de Inicio</Text>
          <Text style={{ marginBottom: 8 }}>C.22, San José, San Bosco</Text>

          {/* Destino */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>Destino</Text>
          <Text style={{ marginBottom: 8 }}>Calles 5 y 7, Avenida 9, Av 9, San José, Amón</Text>

          {/* Detalles del auto y costo */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Detalles del Auto</Text>
              <Text>Hyundai Santa Fe</Text>
              <Text>BXF132</Text>
              <Text>Gris</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Costo</Text>
              <Text>₡2150</Text>
            </View>
          </View>

          {/* Pasajeros */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>Pasajeros</Text>
          <View style={{ flexDirection: 'row', marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold', width: 180 }}>Nombre</Text>
            <Text style={{ fontWeight: 'bold' }}>Lugar de recogida</Text>
          </View>
          {/* Lista de pasajeros */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={require('@/assets/images/avatar1.png')}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
            />
            <Text style={{ width: 180 }}>Esteban Herrera Solís</Text>
            <Text style={{ flex: 1 }}>75 metros Oeste del Hospital de Niños, San José</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={require('@/assets/images/avatar1.png')}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
            />
            <Text style={{ width: 180 }}>Mariano Torres Monge</Text>
            <Text style={{ flex: 1 }}>Av. 4, San José, Merced</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={require('@/assets/images/avatar1.png')}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
            />
            <Text style={{ width: 180 }}>Carolina Salas Guardia</Text>
            <Text style={{ flex: 1 }}>Cementerio Extranjero, C.20, San José, Santa Lucía</Text>
          </View>
        </ScrollView>
      </View>
    </View>
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