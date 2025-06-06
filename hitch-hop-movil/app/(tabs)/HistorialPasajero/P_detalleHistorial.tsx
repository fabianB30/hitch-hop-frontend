import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function P_detalleHistorial() {
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
        <Image
          source={require('@/assets/images/HHlogo.png')}
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
          <TouchableOpacity onPress={() => router.push('/(tabs)/HistorialPasajero/P_historialLleno')}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
            <Text style={{ fontSize: 18, color: '#181718', textAlign: 'center' }}>
              Viaje del 23 de febrero del 2025 a las 12:43
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>

          {/* Conductor */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={"asset"}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: -16, zIndex: 2 }}
            />
            <Image
              source={"asset"}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8, marginLeft: -16, borderWidth: 3, borderColor: '#00C2FF', zIndex: 1 }}
            />
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Conductor</Text>
              <Text>Gilberto Arias Guardia</Text>
            </View>
          </View>

          {/* Detalles del auto */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>Detalles del Auto</Text>
          <Text>Hyundai Santa Fe</Text>
          <Text>BXF132</Text>
          <Text>Gris</Text>

          {/* Punto de recogida */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>Punto de Recogida</Text>
          <Text>75 metros Oeste del Hospital de Niños, San José</Text>

          {/* Destino */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>Destino</Text>
          <Text>Calles 5 y 7, Avenida 9, Av 9, San José, Amón</Text>

          {/* Hora de salida */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>Hora de Salida</Text>
          <Text>12:43</Text>

          {/* Costo */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>Costo</Text>
          <Text>₡1500</Text>
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