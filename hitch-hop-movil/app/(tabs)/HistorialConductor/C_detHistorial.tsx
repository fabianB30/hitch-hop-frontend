import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';

export default function C_detHistorial() {
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
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/HistorialConductor/C_historialLleno')}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.subtitleCentered}>Viaje del 25 de febrero del 2025 a las 20:43</Text>
            <Text style={styles.title}>Conductor</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.label}>Punto de Inicio</Text>
          <Text style={styles.text}>C.22, San José, San Bosco</Text>

          <Text style={styles.label}>Destino</Text>
          <Text style={styles.text}>Calles 5 y 7, Avenida 9, Av 9, San José, Amón</Text>

          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>Detalles del Auto</Text>
              <Text style={styles.text}>Hyundai Santa Fe</Text>
              <Text style={styles.text}>BXF132</Text>
              <Text style={styles.text}>Gris</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.label}>Costo</Text>
              <Text style={styles.text}>₡2150</Text>
            </View>
          </View>

          <Text style={styles.label}>Pasajeros</Text>
          <View style={styles.passengerHeader}>
            <Text style={[styles.label, { width: 180 }]}>Nombre</Text>
            <Text style={styles.label}>Lugar de recogida</Text>
          </View>

          {[
            {
              name: 'Esteban Herrera Solís',
              location: '75 metros Oeste del Hospital de Niños, San José',
            },
            {
              name: 'Mariano Torres Monge',
              location: 'Av. 4, San José, Merced',
            },
            {
              name: 'Carolina Salas Guardia',
              location: 'Cementerio Extranjero, C.20, San José, Santa Lucía',
            },
          ].map((p, idx) => (
            <View key={idx} style={styles.passengerRow}>
              <Image
                source={require('@/assets/images/avatar1.png')}
                style={styles.avatar}
              />
              <Text style={[styles.text, { width: 128 }]}>{p.name}</Text>
              <Text style={[styles.text, { flex: 1, paddingLeft: 8 }]}>{p.location}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Barra de navegación inferior */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 64,
        backgroundColor: '#7B61FF',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
        <TouchableOpacity>
          <Image source={"asset"} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={"asset"} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={"asset"} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={"asset"} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
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
  subtitleCentered: {
    fontSize: 13,
    fontFamily: 'Exo-Bold',
    color: '#181718',
    textAlign: 'center',
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
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
  title: {
    fontSize: 32,
    fontFamily: 'Exo-Bold',
    color: '#181718',
    marginTop: -4,
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
    marginBottom: 12,
  }
})
