import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { getVehicleByIdRequest, updateVehicleByIdRequest } from '@/interconnection/vehicle';
import { useAuth } from '../Context/auth-context';

export default function EditarVehiculo() {
  const router = useRouter();
  //Por el momento voy a dejar la id as[i, luego hay que comunicarlo con todo]
  const { id } = useLocalSearchParams();;
  const [brand, setMarca] = useState('Hyundai');
  const [model, setModelo] = useState('Santa Fe');
  const [plate, setPlaca] = useState('BTR-932');
  const [color, setColor] = useState('Gris');
  const [anio, setAnio] = useState('2019');
  const [foto, setFoto] = useState(null);
  const { user, setUser } = useAuth();

  useEffect(() => {
        const fetchVehicle = async () => {
          try {
            if (typeof id === 'string'){
              const data = await getVehicleByIdRequest(id); 
              setMarca(data.brand);
              setModelo(data.model);
              setPlaca(data.plate);
              setColor(data.color);
              setAnio(data.year);
              //setFoto(data.foto);
            } else {
               console.log('Error mamadisimo que no deberia pasar, id:', id);
            }
          } catch (error) {
            console.error("Error fetching vehicles:", error);
          }
        };
    
        fetchVehicle();
  }, [id]);

  const handleEditar = async () => {
        const vehicleData = { 
          model: model, 
          brand: brand, 
          color: color, 
          plate: plate,
          year: anio
        };
      try {
        if (typeof id === 'string') {
          const vehicle = await updateVehicleByIdRequest(id, vehicleData);
          setUser({...user});
        } else {
          console.log('Error mamadisimo que no deberia pasar, id:', id);
        }
      } catch (error) {
        console.error('Error al editar el vehículo:', error);
      }
  
      router.push('/vehiculos')
    };


  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 24 }}>
      <Image
                    source={require('@/assets/images/hitchhop-logo.png')} 
                    style={{ width: '115%', height: 100, resizeMode: 'cover', marginBottom: 8, marginTop: -24, marginLeft: -25 }}
                  />
      <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 16 }}>Editar Vehículo</Text>
      <Text>Marca*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={brand} onChangeText={setMarca} />
      <Text>Modelo*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={model} onChangeText={setModelo} />
      <Text>Placa*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={plate} onChangeText={setPlaca} />
      <Text>Color*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={color} onChangeText={setColor} />
      <Text>Año*</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, marginBottom: 8, padding: 8 }} value={anio} onChangeText={setAnio} keyboardType="numeric" />
      <Text style={{ marginTop: 8 }}>Fotografía del vehículo</Text>
      {foto ? (
        <Image source={{ uri: foto }} style={{ width: 120, height: 80, borderRadius: 8, marginVertical: 8 }} />
      ) : (
        <View style={{ borderWidth: 1, borderRadius: 8, height: 100, justifyContent: 'center', alignItems: 'center', marginVertical: 8 }}>
          <Text>Sube una foto</Text>
        </View>
      )}
      <TouchableOpacity
        style={{ backgroundColor: '#FFB800', borderRadius: 8, padding: 12, marginTop: 16 }}
        onPress={() => handleEditar()}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Editar</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#F3F2FF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 100,
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  title: {
    fontFamily: 'Exo-Bold',
    fontSize: 32,
    color: '#181718',
    marginLeft: 18,
  },
  inputGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Exo-Bold',
    fontSize: 18,
    color: '#181718',
    marginBottom: 2,
  },
  inputRight: {
    flex: 1,
    fontFamily: 'Exo-Regular',
    fontSize: 17,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginLeft: 12,
    color: '#181718',
    minWidth: 120,
    maxWidth: 270,
  },
  vehicleImg: {
    width: 180,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginLeft: 18,
  },
  changePhotoBtn: {
    alignSelf: 'flex-start',
    marginLeft: 18,
    marginBottom: 18,
    backgroundColor: '#fff',
    borderColor: '#FFA800',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 22,
  },
  changePhotoBtnText: {
    color: '#FFA800',
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  saveBtn: {
    backgroundColor: '#7B61FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'flex-end',
    marginRight: 18,
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontFamily: 'Exo-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#A18AFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  bottomIcon: {
    flex: 1,
    alignItems: 'center',
  },
  iconImg: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
});
