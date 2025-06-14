import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getAllVehiclesRequest, deleteVehicleByIdRequest } from '@/interconnection/vehicle';
import { updateUserRequest } from '@/interconnection/user';
import { useAuth } from '../Context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tenemos un problema creo
/*
  Esto deberia funcionar trayyendose todos los vehiculos de un usuario supongo
  Pero lo del back se trae todos los vehiculos de todos los usuarios
  nada mas es cosa de filtrarlos en el back creo o se puede filtrar aqui
*/
const mockVehiculos = [
  {
    brand: 'Hyundai',
    model: 'Santa Fe',
    plate: 'BTR-932',
    color: 'Gris',
    year: '2019',
    foto: require('@/assets/images/santafe.png'),
  },
];


export default function VehiculosIndex() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [vehicles, setVehicles] = useState<any[] | null>(null);
  const { user,setUser } = useAuth(); 
  const [idVehicle, setIdVehicle] = useState<string | null>(null);


  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAllVehiclesRequest(); //Se trae todos
        if (user && data) {
          const filteredVehicles = data.filter((vehiculo: any) =>
            user.vehicles.includes(vehiculo._id)
          );
          setVehicles(filteredVehicles);

          if (filteredVehicles.length === 0) {
            router.push('/(tabs)/vehiculos/sinVehiculos'); // Redirige si no hay vehículos
          }

        } else {
          setVehicles([]);
          console.log('No hay usuario o datos de vehículos disponibles');
          router.push('/(tabs)/vehiculos/sinVehiculos'); // Redirige si no hay usuario o datos
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [user]);

  const handleEliminar = async () => {
      if (!idVehicle) {
        console.error("No vehicle ID provided for deletion.");
        return;
      }
      await deleteVehicleByIdRequest(idVehicle);
      setUser({
            ...user,
            vehicles: user.vehicles.filter((v: string) => v !== idVehicle)
      });
      await updateUserRequest(user._id, user);
  };

  

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={vehicles} // Cambia esto a vehicles cuando tengas los datos reales
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
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.brand} {item.model}</Text>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity
                  style={{ backgroundColor: '#7B61FF', borderRadius: 8, padding: 8, marginRight: 8 }}
                  onPress={() => router.push({
                    pathname:"/(tabs)/vehiculos/informacionVehiculo",
                    params: { id: item._id }
                  })}
                >
                  <Text style={{ color: '#fff' }}>Información</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={{ backgroundColor: '#E0D7FF', borderRadius: 8, padding: 8 }}
                  onPress={() => {
                    setIdVehicle(item._id);
                    setShowModal(true);
                  }}
                >
                  <Text style={{ color: '#7B61FF' }}>Eliminar</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <Button title="Agregar Vehiculo" color="#7B61FF" onPress={() => router.push('/(tabs)/vehiculos/agregarVehiculo')} />
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
                onPress={async () => {
                  await handleEliminar();
                  setShowModal(false);
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
