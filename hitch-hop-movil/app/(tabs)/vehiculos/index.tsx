import React, { useState } from 'react';
import { View, Text, Button, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const mockVehiculos = [
  {
    marca: 'Hyundai',
    modelo: 'Santa Fe',
    placa: 'BTR-932',
    color: 'Gris',
    anio: '2019',
    foto: '...\assets\images\santafe.png',
  },
];

export default function VehiculosIndex() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={mockVehiculos}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{
            margin: 10,
            backgroundColor: '#F3F1FF',
            borderRadius: 16,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image source={{ uri: item.foto }} style={{ width: 80, height: 80, borderRadius: 12, marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.marca} {item.modelo}</Text>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity
                  style={{ backgroundColor: '#7B61FF', borderRadius: 8, padding: 8, marginRight: 8 }}
                  onPress={() => router.push('informacionVehiculo')}
                >
                  <Text style={{ color: '#fff' }}>Información</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: '#E0D7FF', borderRadius: 8, padding: 8 }}
                  onPress={() => setShowModal(true)}
                >
                  <Text style={{ color: '#7B61FF' }}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <Button title="Agregar Vehiculo" color="#7B61FF" onPress={() => router.push('agregarVehiculo')} />
        }
      />

      {/* Modal de confirmación solo para navegación visual */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
          <View style={{
            backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 300, alignItems: 'center'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
              ¿Estás seguro que quieres eliminar el vehículo Hyundai Santa Fe?
            </Text>
            <Text style={{ color: '#888', marginBottom: 24 }}>Todos los datos del vehículo serán eliminados</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ backgroundColor: '#E0D7FF', borderRadius: 8, padding: 10, marginRight: 12 }}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: '#7B61FF' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: '#7B61FF', borderRadius: 8, padding: 10 }}
                onPress={() => {
                  setShowModal(false);
                  router.push('sinVehiculos');
                }}
              >
                <Text style={{ color: '#fff' }}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
