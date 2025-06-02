import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function VehiculoCreado() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Encabezado */}
      <View style={{ backgroundColor: '#B9A4FF', paddingTop: 48, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Vehículos</Text>
      </View>

      {/* Tarjeta de Vehículo */}
      <View style={{
        margin: 24,
        backgroundColor: '#F4F3FF',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      }}>
        <Image
          source={require('@/assets/images/santafe.png')}
          style={{ width: 80, height: 80, borderRadius: 12, marginRight: 16 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Hyundai Santa Fe</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#7B61FF',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 14,
                marginRight: 8,
              }}
              onPress={() => router.push('/(tabs)/vehiculos/informacionVehiculo')}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Información</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: '#7B61FF',
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 14,
              }}
              onPress={() => router.push('/(tabs)/vehiculos/confirmarEliminacion')}
            >
              <Text style={{ color: '#7B61FF', fontWeight: 'bold' }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Botón Agregar Vehículo */}
      <View style={{ alignItems: 'center', marginTop: 32 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#7B61FF',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 32,
          }}
          onPress={() => router.push('/(tabs)/vehiculos/agregarVehiculo')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Agregar Vehiculo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
