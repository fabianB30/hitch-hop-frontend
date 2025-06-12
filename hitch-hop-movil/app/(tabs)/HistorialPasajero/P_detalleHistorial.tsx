import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';

export default function P_detalleHistorial() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Light.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

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
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.subtitleCentered}>Viaje del 25 de febrero del 2025 a las 20:43</Text>
          </View>
        </View>


        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>

          {/* Conductor */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>

            <Image
              source={require('@/assets/images/avatar1.png')}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8, marginLeft: 0, zIndex: 1 }}
            />
            <View>
              <Text style={styles.subtitle}>Conductor</Text>
              <Text style={styles.text}>Gilberto Arias Guardia</Text>
            </View>
          </View>

          {/* Detalles del auto */}
          <Text style={styles.subtitle}>Detalles del Auto</Text>
          <Text style={styles.text}>Hyundai Santa Fe</Text>
          <Text style={styles.text}>BXF132</Text>
          <Text style={styles.text}>Gris</Text>

          {/* Punto de recogida */}
          <Text style={styles.subtitle}>Punto de Recogida</Text>
          <Text style={styles.text}>75 metros Oeste del Hospital de Niños, San José</Text>

          {/* Destino */}
          <Text style={styles.subtitle}>Destino</Text>
          <Text style={styles.text}>Calles 5 y 7, Avenida 9, Av 9, San José, Amón</Text>

          {/* Hora de salida */}
          <Text style={styles.subtitle}>Hora de Salida</Text>
          <Text style={styles.text}>12:43</Text>

          {/* Costo */}
          <Text style={styles.subtitle}>Costo</Text>
          <Text style={styles.text}>₡1500</Text>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 32,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 40, 
  },
  title: {
    fontSize: 18,
    fontFamily: 'Exo-Bold',
    color: '#181718',
    marginTop: -4,
    textAlign: 'center',
  },
  subtitleCentered: {
    fontSize: 13,
    fontFamily: 'Exo-Bold',
    color: '#181718',
    textAlign: 'center',
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Exo-Bold',
    color: '#181718',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Exo-Bold',
    marginBottom: 2,
    color: '#181718',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Exo-Regular',
    color: '#181718',
    marginBottom: 8,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  passengerHeader: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  }
})