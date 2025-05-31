import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ConfirmarEliminacion() {
  const router = useRouter();
  const { marca, modelo } = useLocalSearchParams();

  const handleCancelar = () => router.back();
  const handleAceptar = () => {
    // Aquí deberías eliminar el vehículo y luego regresar
    router.back();
  };

  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)'
    }}>
      <View style={{
        backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 300, alignItems: 'center'
      }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
          ¿Estás seguro que quieres eliminar el vehículo {marca} {modelo}?
        </Text>
        <Text style={{ color: '#888', marginBottom: 24, textAlign: 'center' }}>
          Todos los datos del vehículo serán eliminados
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#FFB800', borderRadius: 8, padding: 10, marginRight: 12 }}
            onPress={handleCancelar}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: '#7B61FF', borderRadius: 8, padding: 10 }}
            onPress={handleAceptar}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}