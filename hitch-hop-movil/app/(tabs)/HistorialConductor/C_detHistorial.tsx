import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function C_detHistorial() {
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
          source={require('@/assets/images/HHlogo.pngg')}
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
          <TouchableOpacity onPress={() => router.push('/(tabs)/HistorialConductor/C_historialLleno')}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
            <Text style={{ fontSize: 20, color: '#181718' }}>
              Viaje del 25 de febrero del 2025 a las 20:43
            </Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#181718', marginTop: -4 }}>
              Conductor
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>

          {/* Punto de inicio */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>Punto de Inicio</Text>
          <Text style={{ marginBottom: 8 }}>C.22, San José, San Bosco</Text>

          {/* Destino */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>Destino</Text>
          <Text style={{ marginBottom: 8 }}>Calles 5 y 7, Avenida 9, Av 9, San José, Amón</Text>

          {/* Detalles del auto y costo */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Detalles del Auto</Text>
              <Text>Hyundai Santa Fe</Text>
              <Text>BXF132</Text>
              <Text>Gris</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Costo</Text>
              <Text>₡2150</Text>
            </View>
          </View>

          {/* Pasajeros */}
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 2 }}>Pasajeros</Text>
          <View style={{ flexDirection: 'row', marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold', width: 180 }}>Nombre</Text>
            <Text style={{ fontWeight: 'bold' }}>Lugar de recogida</Text>
          </View>
          {/* Lista de pasajeros */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={require('@/assets/images/pfphitchhop.png')}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
            />
            <Text style={{ width: 180 }}>Esteban Herrera Solís</Text>
            <Text style={{ flex: 1 }}>75 metros Oeste del Hospital de Niños, San José</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={require('@/assets/images/pfphitchhop.png')}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
            />
            <Text style={{ width: 180 }}>Mariano Torres Monge</Text>
            <Text style={{ flex: 1 }}>Av. 4, San José, Merced</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Image
              source={require('@/assets/images/pfphitchhop.png')}
              style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
            />
            <Text style={{ width: 180 }}>Carolina Salas Guardia</Text>
            <Text style={{ flex: 1 }}>Cementerio Extranjero, C.20, San José, Santa Lucía</Text>
          </View>
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