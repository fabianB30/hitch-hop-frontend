import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f3ff' }}>
      {/* Fondo superior con logo */}
      <View style={{ width: '100%', height: 140, position: 'absolute', top: 0, left: 0 }}>
        <Image
          source={require('@/assets/images/HHlogo.png')}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          resizeMode="cover"
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
            <Text style={{ fontSize: 18, color: '#181718', marginTop: -4 }}>Tipo de Actividad</Text>
          </View>
        </View>

        {/* Opción Conductor */}
        <TouchableOpacity
          style={{
            marginTop: 24,
            marginBottom: 24,
            alignItems: 'center',
            width: 220,
            borderRadius: 16,
            overflow: 'hidden'
          }}
          onPress={() => router.push('/(tabs)/HistorialConductor/C_historialLleno')}
        >
          <Image
            source={require('@/assets/images/conductorFlor.png')}
            style={{ width: 200, height: 120, marginBottom: 8 }}
            resizeMode="contain"
          />
          <Text style={{ color: '#7B61FF', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Conductor</Text>
        </TouchableOpacity>

        {/* Opción Pasajero */}
        <TouchableOpacity
          style={{
            marginBottom: 24,
            alignItems: 'center',
            width: 220,
            borderRadius: 16,
            overflow: 'hidden'
          }}
          onPress={() => router.push('/(tabs)/HistorialPasajero/P_historialLleno')}
        >
          <Image
            source={require('@/assets/images/pasajeroEstrella.png')}
            style={{ width: 200, height: 120, marginBottom: 8 }}
            resizeMode="contain"
          />
          <Text style={{ color: '#7B61FF', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Pasajero</Text>
        </TouchableOpacity>
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