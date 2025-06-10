import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function C_HistorialLleno() {
  const router = useRouter();
  // Example data for trips
  const viajes = [
    { fecha: '25 de febrero del 2025', hora: '20:43' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f3ff' }}>
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
          <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#181718' }}>Historial</Text>
            <Text style={{ fontSize: 18, color: '#181718', marginTop: -4 }}>Conductor</Text>
          </View>
        </View>

        {/* Lista de viajes */}
        <ScrollView contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 24 }}>
          {viajes.map((viaje, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                marginHorizontal: 16,
                marginBottom: 16,
                borderRadius: 16,
                paddingVertical: 8,
                paddingHorizontal: 0,
                shadowColor: '#000',
                shadowOpacity: 0.03,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              {/* Icono circular */}
              <View style={{
                width: 32,
                height: 48,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                backgroundColor: '#FFB800',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }} />
              {/* Info del viaje */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: '#181718' }}>
                  Viaje del {viaje.fecha} a las {viaje.hora}
                </Text>
              </View>
              {/* Botón Detalles */}
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  borderColor: '#FFB800',
                  borderRadius: 8,
                  paddingVertical: 4,
                  paddingHorizontal: 14,
                  marginLeft: 8,
                }}
                onPress={() => router.push("/(tabs)/HistorialConductor/C_detHistorial")}
              >
                <Text style={{ color: '#FFB800', fontWeight: 'bold', fontSize: 15 }}>Detalles</Text>
              </TouchableOpacity>
            </View>
          ))}
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
