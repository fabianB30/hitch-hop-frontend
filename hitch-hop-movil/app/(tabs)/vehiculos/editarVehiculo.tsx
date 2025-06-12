import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

export default function EditarVehiculo() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Simulación de datos actuales del vehículo
  const [marca, setMarca] = useState('Hyundai');
  const [modelo, setModelo] = useState('Santa Fe');
  const [placa, setPlaca] = useState('BTR-932');
  const [color, setColor] = useState('Gris');
  const [anio, setAnio] = useState('2019');
  const [foto, setFoto] = useState(require('@/assets/images/santafe.png'));

  // Nueva función para acceder a la galería
  const handleCambiarFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso para acceder a la galería es necesario.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFoto({ uri: result.assets[0].uri });
    }
  };

  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#A18AFF' }}>
      {/* Fondo superior con patrón y logo */}
      <View style={{ width: '100%', height: 140, position: 'absolute', top: 0, left: 0 }}>
        <Image
          source={require('@/assets/images/backround_gestion.png')}
          style={{
            width: '160%',
            height: '100%',
            position: 'absolute',
            top: -20,
            left: '-10%',
          }}
          resizeMode="cover"
        />
        <Image
          source={require('@/assets/images/HHLogoDisplay.png')}
          style={{ width: 120, height: 36, position: 'absolute', top: 16, right: 16 }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        {/* Flecha y título */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18, paddingHorizontal: 8 }}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/vehiculos/vehiculoCreado")}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Editar Información</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Campos */}
          <View style={styles.inputGroupRow}>
            <Text style={styles.label}>Marca<Text style={{ color: '#FF3D00' }}>*</Text></Text>
            <TextInput
              style={styles.inputRight}
              value={marca}
              onChangeText={setMarca}
              placeholder="Marca"
              placeholderTextColor="#bbb"
              editable={true}
            />
          </View>
          <View style={styles.inputGroupRow}>
            <Text style={styles.label}>Modelo<Text style={{ color: '#FF3D00' }}>*</Text></Text>
            <TextInput
              style={styles.inputRight}
              value={modelo}
              onChangeText={setModelo}
              placeholder="Modelo"
              placeholderTextColor="#bbb"
              editable={true}
            />
          </View>
          <View style={styles.inputGroupRow}>
            <Text style={styles.label}>Placa<Text style={{ color: '#FF3D00' }}>*</Text></Text>
            <TextInput
              style={styles.inputRight}
              value={placa}
              onChangeText={setPlaca}
              placeholder="Placa"
              placeholderTextColor="#bbb"
              editable={true}
            />
          </View>
          <View style={styles.inputGroupRow}>
            <Text style={styles.label}>Color<Text style={{ color: '#FF3D00' }}>*</Text></Text>
            <TextInput
              style={styles.inputRight}
              value={color}
              onChangeText={setColor}
              placeholder="Color"
              placeholderTextColor="#bbb"
              editable={true}
            />
          </View>
          <View style={styles.inputGroupRow}>
            <Text style={styles.label}>Año<Text style={{ color: '#FF3D00' }}>*</Text></Text>
            <TextInput
              style={styles.inputRight}
              value={anio}
              onChangeText={setAnio}
              placeholder="Año"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              editable={true}
            />
          </View>

          <Text style={[styles.label, { marginTop: 18, marginBottom: 6, alignSelf: 'center' }]}>Fotografía del vehículo</Text>
          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <Image
              source={foto}
              style={styles.vehicleImg}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={[styles.changePhotoBtn, { alignSelf: 'center' }]}
            onPress={handleCambiarFoto}
          >
            <Text style={styles.changePhotoBtnText}>Cambiar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => router.push('/(tabs)/vehiculos/vehiculoCreado?from=editarVehiculo')}
          >
            <Text style={styles.saveBtnText}>Guardar Datos</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
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
