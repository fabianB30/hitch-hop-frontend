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
      'exo.medium': require('@/assets/fonts/exo.medium.otf'),
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
            width: '100%',
            height: '100%',
            position: 'absolute',
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
      <View style={styles.content}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/HistorialMain")}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.titulo}>Historial</Text>
            <Text style={styles.subtitulo}>Conductor</Text>
          </View>
        </View>

        {/* Lista de viajes */}
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          {viajes.map((viaje, idx) => (
            <View key={idx} style={styles.card}>
              {/* Barra lateral */}
              <View style={styles.sideBar} />

              {/* Texto del viaje */}
              <View style={{ flex: 1, marginLeft: 19 }}>
                <Text style={styles.viajeTexto}>
                  Viaje del {viaje.fecha} a las {viaje.hora}
                </Text>
              </View>

              {/* Botón Detalles */}
              <TouchableOpacity
                style={styles.boton}
                onPress={() => router.push("/(tabs)/HistorialConductor/C_detHistorial")}
              >
                <Text style={styles.botonTexto}>Detalles</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

    </View> 
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
    marginRight: 32,
  },
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFCF2',
    marginHorizontal: 24,
    marginBottom: 14,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },
  sideBar: {
    width: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#FFAB00',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  viajeTexto: {
    fontSize: 13,
    color: '#181718',
    fontFamily: 'exo.medium',
  },
  boton: {
    height: 40,
    borderWidth: 1,
    borderColor: '#FFAB00',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginLeft: 8,
    justifyContent: 'center',
  },
  botonTexto: {
    color: '#FFAB00',
    fontFamily: 'exo.medium',
    fontSize: 13,
  },
});
