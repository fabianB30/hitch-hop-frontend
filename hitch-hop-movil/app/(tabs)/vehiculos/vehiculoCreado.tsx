import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function VehiculoCreado() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Show modal only if coming from agregar or editar
  const [showModal, setShowModal] = useState(params.from === 'agregarVehiculo' || params.from === 'editarVehiculo');

  // Popup content based on origin
  let titulo = '';
  let colorTitulo = '#4CAF50';
  if (params.from === 'editarVehiculo') {
    titulo = 'Vehículo Editado';
  } else if (params.from === 'agregarVehiculo') {
    titulo = 'Vehículo Agregado';
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Encabezado */}
      <View style={{ backgroundColor: '#B9A4FF', paddingTop: 48, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Vehículos</Text>
      </View>

      {/* Popup Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)'
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 24,
            alignItems: 'center',
            width: 290,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
          }}>
            {/* Icono de check */}
            <Image
              source={require('@/assets/images/circle-check.png')}
              style={{ width: 36, height: 36, marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text style={{ color: colorTitulo, fontWeight: 'bold', fontSize: 22, marginBottom: 12, textAlign: 'center' }}>
              {titulo}
            </Text>
            <View style={{ alignItems: 'flex-start', width: '100%', marginBottom: 8 }}>
              <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Hyundai</Text>
              <Text style={{ color: '#888', fontSize: 13 }}>Modelo</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Santa Fe</Text>
              <Text style={{ color: '#888', fontSize: 13 }}>Placa</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>BTR-932</Text>
              <Text style={{ color: '#888', fontSize: 13 }}>Color</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Gris</Text>
              <Text style={{ color: '#888', fontSize: 13 }}>Año</Text>
              <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>2019</Text>
            </View>
            <Image
              source={require('@/assets/images/santafe.png')}
              style={{ width: 120, height: 80, borderRadius: 8, marginBottom: 16, borderWidth: 3, borderColor: '#B9A4FF' }}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#7B61FF',
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 32,
                marginTop: 8,
                width: '100%',
              }}
              onPress={() => setShowModal(false)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
