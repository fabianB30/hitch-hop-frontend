import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

export default function agregarVehiculo() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // All useState hooks must be here, before any return!
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [color, setColor] = useState('');
  const [anio, setAnio] = useState('');
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  const handleBrowseFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#A18AFF' }}>
      {/* Fondo superior con patrón */}
      <View style={styles.topBackground}>
        <Image
          source={require('@/assets/images/backround_gestion.png')}
          style={styles.bgPattern}
          resizeMode="cover"
        />
        <Image
              source={require('@/assets/images/HHLogoDisplay.png')}
              style={{ width: 120, height: 36, position: 'absolute', top: 16, right: 16 }}
              resizeMode="contain"
            />
      </View>

      {/* Contenedor principal con esquinas superiores redondeadas */}
      <View style={styles.formContainer}>
        {/* Flecha y título */}
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/GestionPerfilConductor")}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[styles.formTitle, { marginLeft: 32 }]}>Agregar Vehículo </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Campos */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>Marca<Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={marca} onChangeText={setMarca} />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Modelo<Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Placa<Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Color<Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={color} onChangeText={setColor} />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Año<Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={anio} onChangeText={setAnio} keyboardType="numeric" />
          </View>

          {/* Fotografía */}
          <Text style={styles.photoLabel}>Fotografía del vehículo</Text>
          <View style={styles.photoBox}>
            <Text style={styles.photoBoxText}>
              Choose a file or drag & drop it here.{"\n"}
              JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
            </Text>
            <TouchableOpacity style={styles.browseButton} onPress={handleBrowseFile}>
              <Text style={styles.browseButtonText}>Browse File</Text>
            </TouchableOpacity>
            {foto && (
              <Image
                source={{ uri: foto }}
                style={{ width: 80, height: 80, marginTop: 8, borderRadius: 8 }}
                resizeMode="cover"
              />
            )}
          </View>

          {/* Botón Agregar */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/vehiculos/vehiculoCreado')}
          >
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Barra de navegación inferior */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 64,
              backgroundColor: '#7B61FF',
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}>
              <TouchableOpacity>
                <Image source={"asset"} style={{ width: 32, height: 32 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={"asset"} style={{ width: 32, height: 32 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={"asset"} style={{ width: 32, height: 32 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={"asset"} style={{ width: 32, height: 32 }} />
              </TouchableOpacity>
            </View>
          </View>
        );
}

const styles = StyleSheet.create({
  topBackground: {
    height: 120,
    backgroundColor: '#A18AFF',
    position: 'relative',
    justifyContent: 'flex-start',
  },
  bgPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginLeft: 24,
    zIndex: 2,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4FC3F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarLetter: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'Exo-Bold',
  },
  logoText: {
    color: '#fff',
    fontFamily: 'Exo-Bold',
    fontSize: 22,
    marginLeft: 8,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 0,
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
    fontFamily: 'Exo-Bold',
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
  photoBox: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    height: 120,
    marginHorizontal: 24,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  photoBoxText: {
    color: '#888',
    fontFamily: 'Exo-Regular',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
  browseButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#A18AFF',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  browseButtonText: {
    color: '#A18AFF',
    fontFamily: 'Exo-Bold',
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 24,
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Exo-Bold',
    fontSize: 18,
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

