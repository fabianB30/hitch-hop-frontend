import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';


export default function P_HistorialLleno() {
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

  // Example data for trips
  const viajes = [
    { fecha: '23 de febrero del 2025', hora: '12:43' },
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
            <Text style={{ fontSize: 18, color: '#181718', marginTop: -4 }}>Pasajero</Text>
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
                onPress={() => router.push("/(tabs)/HistorialPasajero/P_detalleHistorial")}
              >
                <Text style={{ color: '#FFB800', fontWeight: 'bold', fontSize: 15 }}>Detalles</Text>
              </TouchableOpacity>
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