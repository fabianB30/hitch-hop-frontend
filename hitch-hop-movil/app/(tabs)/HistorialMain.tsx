import React, { useEffect, useState } from 'react';
import { Image as ExpoImage} from 'expo-image';

import { useRouter } from 'expo-router';
import { Pressable, View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import * as Font from 'expo-font';

export default function HistorialMain() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        Font.loadAsync({
          'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
          'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
        }).then(() => setFontsLoaded(true));
      }, []);
    
      if (!fontsLoaded) return null;
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f3ff' }}>
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
        alignItems: 'center'
      }}>
        {/* Flecha back y título */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingHorizontal: 16, alignSelf: 'flex-start' }}>
          <TouchableOpacity onPress={() => router.push('/GestionPerfilConductor')}> 
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
            <Text style={styles.title}>Historial</Text>
            <Text style={styles.subtitle}>Tipo de Actividad</Text>
          </View>
        </View>
        {/* Opción Conductor */}
        <TouchableOpacity
          style={{ alignItems: 'center', width: 240, marginTop: 24, marginBottom: -5 }}
          onPress={() => router.push('/(tabs)/HistorialConductor/C_historialLleno')}
        >
          <View
            style={{
              width: 220,
              height: 150,
              borderRadius: 16,
              backgroundColor: '#ADA7FF',
              borderWidth: 1,
              borderColor: '#080808',
              position: 'relative',
              zIndex: 0,
            }}
          />
          {/* Imagen independiente y encima */}
          <Image
            source={require('@/assets/images/conductorFlor.png')}
            style={{
              width: 370,
              height: 320,
              position: 'absolute',
              top: -50,
              left: -70,
              right: 0,
              alignSelf: 'center',
              zIndex: 1,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={[styles.subtitle, { color: '#7875F8', marginBottom: 24, marginTop: 20, textAlign: 'center' }]}>
          Conductor
        </Text>

        {/* Opción Pasajero */}
        <TouchableOpacity
          style={{ alignItems: 'center', width: 240, marginBottom: 0 }}
          onPress={() => router.push('/(tabs)/HistorialPasajero/P_historialLleno')}
        >
          <View
            style={{
              width: 220,
              height: 150,
              top: 35,
              borderRadius: 16,
              backgroundColor: '#b8b7fb',
              borderWidth: 1,
              borderColor: '#080808',
              position: 'relative',
              zIndex: 0,
            }}
          />
          <Image
            source={require('@/assets/images/pasajeroEstrella.png')}
            style={{
              width: 370,
              height: 340,
              position: 'absolute',
              top: -30,
              left: -60,
              right: 0,
              alignSelf: 'center',
              zIndex: 1,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={[styles.subtitle, { color: '#7875F8', marginBottom: 30, marginTop: 50, textAlign: 'center' }]}>
          Pasajero
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  headerBackground: {
    width: '100%',
    height: 140,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerImage: {
    width: '160%',
    height: '100%',
    position: 'absolute',
    top: -20,
    left: '-10%',
  },
  logo: {
    width: 120,
    height: 36,
    position: 'absolute',
    top: 16,
    right: 16,
  },
  content: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 0,
    paddingTop: 24,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 32,
  },
  title: {
    fontSize: 28,
    color: '#181718',
    fontFamily: 'Exo-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#181718',
    marginTop: -4,
    fontFamily: 'Exo-Bold',
  },
  emptyText: {
    fontSize: 20,
    color: '#181718',
    textAlign: 'center',
    fontFamily: 'Exo-Regular',
    marginTop: 8,
  },
  navbar: {
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
  },
});
