import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';


export default function P_historialVacio() {
  const router = useRouter();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Exo-Medium': require('@/assets/fonts/exo.medium.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;


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
        alignItems: 'center'
      }}>
        {/* Flecha back y título */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingHorizontal: 16, alignSelf: 'flex-start' }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#181718' }}>Historial</Text>
            <Text style={{ fontSize: 18, color: '#181718', marginTop: -4 }}>Pasajero</Text>
          </View>
        </View>

        {/* Gato imagen */}
        <Image
          source={require('@/assets/images/gatoautosPasajero.png')}
          style={{ width: 180, height: 260, marginVertical: 16 }}
          resizeMode="contain"
        />

        {/* Texto de vacío */}
        <Text style={{ fontSize: 20, color: '#181718', textAlign: 'center', marginTop: 8 }}>
          No hay viajes registrados{'\n'}como pasajero
        </Text>
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
