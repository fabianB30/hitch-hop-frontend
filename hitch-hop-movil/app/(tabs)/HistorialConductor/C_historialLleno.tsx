import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';

export default function C_HistorialLleno() {
  const router = useRouter();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-SemiBold': require('@/assets/fonts/Exo-SemiBold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  const viajes = [
    { fecha: '25 de febrero del 2025', hora: '20:43' },
    { fecha: '4 de febrero del 2025', hora: '8:43' },
    { fecha: '14 de enero del 2025', hora: '19:13' },
    { fecha: '5 de enero del 2025', hora: '9:00' },
    { fecha: '4 de enero del 2025', hora: '8:43' },
  ];

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
        paddingTop: 24,
      }}>
        {/* Encabezado */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
            <Text style={styles.titulo}>Historial</Text>
            <Text style={styles.subtitulo}>Conductor</Text>
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
              <View style={{ flex: 1 }}>
                <Text style={styles.viajeTexto}>
                  Viaje del {viaje.fecha} a las {viaje.hora}
                </Text>
              </View>
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
                <Text style={styles.botonDetalles}>Detalles</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
    color: '#181718',
    fontFamily: 'Exo-Bold',
  },
  subtitulo: {
    fontSize: 18,
    color: '#181718',
    marginTop: -4,
    fontFamily: 'Exo-SemiBold',
  },
  viajeTexto: {
    fontSize: 15,
    color: '#181718',
    fontFamily: 'Exo-Regular',
  },
  botonDetalles: {
    color: '#FFB800',
    fontSize: 15,
    fontFamily: 'Exo-Bold',
  },
});
