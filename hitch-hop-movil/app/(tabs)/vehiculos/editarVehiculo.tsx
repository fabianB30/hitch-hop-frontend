import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { getVehicleByIdRequest, updateVehicleByIdRequest } from '@/interconnection/vehicle';
import { useAuth } from '../Context/auth-context';

/*Desde esta página se puede editar un vehículo en la aplicación
*
* Esta página fue trabajada por:
*	Laura Amador
*	Óscar Obando
*	Mariano Mayorga
*
*
* */

export default function EditarVehiculo() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user, setUser } = useAuth();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [brand, setMarca] = useState('');
  const [model, setModelo] = useState('');
  const [plate, setPlaca] = useState('');
  const [color, setColor] = useState('');
  const [anio, setAnio] = useState('');
  const [foto, setFoto] = useState<string | null>(null);

  useEffect(() => {
    Font.loadAsync({
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-SemiBold': require('@/assets/fonts/Exo-SemiBold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        if (typeof id === 'string') {
          const data = await getVehicleByIdRequest(id);
          setMarca(data.brand);
          setModelo(data.model);
          setPlaca(data.plate);
          setColor(data.color);
          setAnio(data.year);
          setFoto(data.photoUrl);
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };
    fetchVehicle();
  }, [id]);

  if (!fontsLoaded) return null;

  const handleBrowseFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleEditar = async () => {
    const vehicleData = {
      model,
      brand,
      color,
      plate,
      photoUrl: foto,
      year: anio,
    };
    try {
      if (typeof id === 'string') {
        await updateVehicleByIdRequest(id, vehicleData);
        setUser({ ...user });
        router.push('/vehiculos/vehiculosIndex');
      }
    } catch (error) {
      console.error('Error al editar el vehículo:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#A18AFF' }}>
      <View style={styles.topBackground}>
        <Image
          source={require('@/assets/images/mg_backround_gestion.png')}
          style={styles.bgPattern}
          resizeMode="cover"
        />
        <Image
          source={require('@/assets/images/HHLogoDisplay.png')}
          style={{ width: 120, height: 36, position: 'absolute', top: 16, right: 16 }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => router.push("/vehiculos/vehiculosIndex")}>
            <Image source={require('@/assets/images/flechaback.png')} style={{ width: 32, height: 32 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
            <Text style={styles.formTitle}>Editar Información</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {[
            { label: 'Marca', value: brand, setter: setMarca },
            { label: 'Modelo', value: model, setter: setModelo },
            { label: 'Placa', value: plate, setter: setPlaca },
            { label: 'Color', value: color, setter: setColor },
            { label: 'Año', value: anio, setter: setAnio, keyboard: 'numeric' },
          ].map((f, i) => (
            <View key={i} style={styles.inputRow}>
              <Text style={styles.label}>{f.label}<Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={f.value}
                onChangeText={f.setter}
                keyboardType={f.keyboard as any}
              />
            </View>
          ))}

          <Text style={styles.photoLabel}>Fotografía del vehículo</Text>
          <View style={styles.photoUploadArea}>
            {foto ? (
              <View>
                <Image source={{ uri: foto }} style={styles.photoRect} />
                <TouchableOpacity style={styles.editIcon} onPress={handleBrowseFile}>
                  <FontAwesome name="pencil" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.photoPlaceholderRect} onPress={handleBrowseFile}>
                <Text style={styles.browseButtonText}>+ Seleccionar foto</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.editButton} onPress={handleEditar}>
            <Text style={styles.editButtonText}>Guardar Datos</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBackground: { height: 120, position: 'relative' },
  bgPattern: { position: 'absolute' },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    paddingTop: 24,
    zIndex: 10,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  formTitle: {
    fontFamily: 'Exo-Bold',
    fontSize: 28,
    color: '#181718',
    marginLeft: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  label: {
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    color: '#181718',
    width: 80,
  },
  required: {
    color: '#E53935',
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D1D5DB',
    padding: 8,
    marginLeft: 8,
    fontFamily: 'Exo-Regular',
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  photoLabel: {
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    color: '#181718',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  photoUploadArea: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  photoPlaceholderRect: {
    width: 180,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  photoRect: {
    width: 180,
    height: 180,
    borderRadius: 12,
  },
  editIcon: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#7875F8',
    padding: 6,
    borderRadius: 16,
  },
  browseButtonText: {
    color: '#A18AFF',
    fontFamily: 'Exo-Regular',
    fontSize: 16,
  },
  editButton: {
    width: 170,
    height: 44,
    backgroundColor: '#7B61FF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Exo-SemiBold',
    fontSize: 18,
  },
});
