import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { deleteVehicleByIdRequest } from '@/interconnection/vehicle';
import { useAuth } from '../Context/auth-context';

export default function ConfirmarEliminacion() {
  const router = useRouter();
  const [id, setId] = useState('1');
  const { marca, modelo } = useLocalSearchParams();
  const { user, setUser } = useAuth();

  const handleCancelar = () => 
    router.push('/(tabs)/vehiculos');
  const handleAceptar = () => {
    deleteVehicleByIdRequest(id);
    setUser({
          ...user,
          vehicles: [...user.vehicles, vehicle._id] // Actualizar el estado del usuario con el nuevo vehículo
        });
    router.push('/(tabs)/vehiculos');
  };

  return (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)'
    }}>
      <Image
        source={require('@/assets/images/hitchhop-logo.png')}
        style={{ width: '100%', height: 60, resizeMode: 'cover', marginBottom: -15, position: 'absolute', top: 0 }}
      />
      <View style={{
        backgroundColor: '#fff', borderRadius: 16, padding: 24, width: 300, alignItems: 'center'
      }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
          ¿Estás seguro que quieres eliminar el vehículo Hyundai Santa Fe?
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