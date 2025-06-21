import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';

export default function C_historialVacio() {
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
    <View style={styles.container}>
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
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => router.push('/HistorialMain')}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Historial</Text>
            <Text style={styles.subtitle}>Conductor</Text>
          </View>
        </View>

        {/* Imagen del personaje */}
        <Image
          source={require('@/assets/images/gatoautosConductor.png')}
          style={{ width: 500, height: 600, marginVertical: 16, marginTop: -90, marginLeft: 10 }}
          resizeMode="contain"
        />

        {/* Texto vacío */}
        <Text style={[styles.emptyText, { marginTop: -130, paddingHorizontal: 40 }]}>
          No hay viajes registrados como conductor
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
    fontFamily: 'Exo-SemiBold',
  },
  emptyText: {
    fontSize: 20,
    color: '#181718',
    textAlign: 'center',
    fontFamily: 'Exo-Regular',
    marginTop: 8,
  },
});
