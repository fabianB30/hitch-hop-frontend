import React,{ useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getVehicleByIdRequest } from '@/interconnection/vehicle';

const mockVehiculo = {
  marca: 'Hyundai',
  modelo: 'Santa Fe',
  placa: 'BTR-932',
  color: 'Gris',
  anio: '2019',
  foto: require('@/assets/images/santafe.png'),
};

export default function InformacionVehiculo() {
  const router = useRouter();
  const [vehiculo, setVehiculo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  //Por el momento voy a dejar la id as[i, luego hay que comunicarlo con todo]
  const [id, setId] = useState('1');

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        const data = await getVehicleByIdRequest(id);
        if (data) {
          setVehiculo(data);
        } else {
          console.error('No se encontró el vehículo con la ID:', id);
          setVehiculo(mockVehiculo); //usamos el mock si no se encuentra x si acaso
        }
      } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        setVehiculo(mockVehiculo);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Image
              source={require('@/assets/images/hitchhop-logo.png')}
              style={{ width: '115%', height: 100, resizeMode: 'cover', marginBottom: 8, marginLeft: -25, marginTop: -24 }}
            />
      <TouchableOpacity onPress={() => router.push('/vehiculos/vehiculoCreado')}>
        <Image
          source={require('@/assets/images/flechaback.png')}
          style={{ width: 32, height: 32, marginBottom: 16 }}
        />
      </TouchableOpacity>

      <Image
        source={require('@/assets/images/santafe.png')}
        style={{ width: 160, height: 120, borderRadius: 12, marginBottom: 16 }}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>Información</Text>
      <Text>Marca</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo.marca}</Text>
      <Text>Modelo</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo.modelo}</Text>
      <Text>Placa</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo.placa}</Text>
      <Text>Color</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{vehiculo.color}</Text>
      <Text>Año</Text>
      <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>{vehiculo.anio}</Text>
      <TouchableOpacity
        style={{ backgroundColor: '#FFB800', borderRadius: 8, padding: 12, marginTop: 16 }}
        onPress={() => router.push("/(tabs)/vehiculos/editarVehiculo")}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Editar Información</Text>
      </TouchableOpacity>
    </View>
  );
}