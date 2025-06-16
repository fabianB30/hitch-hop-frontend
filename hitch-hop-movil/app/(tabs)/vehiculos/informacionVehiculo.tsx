import React,{ useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getVehicleByIdRequest } from '@/interconnection/vehicle';
import { useLocalSearchParams } from 'expo-router';

const mockVehiculo = {
  brand: 'Hyundai',
  model: 'Santa Fe',
  plate: 'BTR-932',
  color: 'Gris',
  year: '2019',
  foto: require('@/assets/images/santafe.png'),
};

export default function InformacionVehiculo() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Obtenemos la ID del vehículo desde los parametros
  //console.log('vehiculo: ', id);
  const [vehiculo, setVehiculo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchVehicle = async () => {
        try {
          if (typeof id === 'string'){
            const data = await getVehicleByIdRequest(id); 
            setVehiculo(data);
          } else {
             console.error('Error mamadisimo que no deberia pasar, id:', id);
          }
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      };
  
      fetchVehicle();
    }, [id]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Image
              source={require('@/assets/images/hitchhop-logo.png')}
              style={{ width: '115%', height: 100, resizeMode: 'cover', marginBottom: 8, marginLeft: -25, marginTop: -24 }}
            />
      <TouchableOpacity onPress={() => router.push('/vehiculos/vehiculosIndex')}>
        <Image
          source={require('@/assets/images/flechaback.png')}
          style={{ width: 32, height: 32, marginBottom: 16 }}
        />
      </TouchableOpacity>

      { /*Problema problemos, la base no tiene fotos creo*/ }
      <Image
        source={require('@/assets/images/santafe.png')}
        style={{ width: 160, height: 120, borderRadius: 12, marginBottom: 16 }}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>Información</Text>
      <Text>Marca</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo?.brand || "No disponible"}</Text>
      <Text>Modelo</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo?.model || "No disponible"}</Text>
      <Text>Placa</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo?.plate || "No disponible"}</Text>
      <Text>Color</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo?.color || "No disponible"}</Text>
      <Text>Año</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>{vehiculo?.year || "No disponible"}</Text>
      <TouchableOpacity
        style={{ backgroundColor: '#FFB800', borderRadius: 8, padding: 12, marginTop: 16 }}
        onPress={() => router.push({
          pathname: "/(tabs)/vehiculos/editarVehiculo",
          params: { id: id }
        })}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Editar Información</Text>
      </TouchableOpacity>
    </View>
  );
}