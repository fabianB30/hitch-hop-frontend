import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function VehiculoCreado() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Image
        source={require('../../../assets/gatoautos.png')}
        style={{ width: 140, height: 140, marginBottom: 24 }}
        resizeMode="contain"
      />
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 12, color: '#7B61FF' }}>
        ¡Vehículo agregado con éxito!
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#7B61FF',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 32,
          marginBottom: 12,
          width: 200,
        }}
        onPress={() => router.push("C:\Users\Mayorga\OneDrive\Documents\gitAP\hitch-hop-frontend\hitch-hop-movil\app\(tabs)\vehiculos\informacionVehiculo.tsx")}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Ver información
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#E0D7FF',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 32,
          width: 200,
        }}
        onPress={() => router.push('/(tabs)/C:\Users\Mayorga\OneDrive\Documents\gitAP\hitch-hop-frontend\hitch-hop-movil\app\(tabs)\vehiculos\confirmarEliminacion.tsx/confirmarEliminacion')}
      >
        <Text style={{ color: '#7B61FF', textAlign: 'center', fontWeight: 'bold' }}>
          Eliminar vehículo
        </Text>
      </TouchableOpacity>
    </View>
  );
}