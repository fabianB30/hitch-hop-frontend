import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter, useNavigation, useFocusEffect } from 'expo-router';
import * as Font from 'expo-font';

export default function VehiculoCreado() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Load fonts as in agregarVehiculo
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Show modal only if coming from agregarVehiculo
  const [showModal, setShowModal] = useState(true);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // <-- Cambia el valor inicial a false

  // Show success popup if coming from editarVehiculo
  useEffect(() => {
    if (params?.from === 'editarVehiculo') {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), 3000); // Hide after 3s
      return () => clearTimeout(timeout);
    }
  }, [params]);

  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
      'Exo-SemiBold': require('@/assets/fonts/Exo-SemiBold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  // Datos del vehículo (puedes reemplazar por props o params si es necesario)
  const vehiculo = {
    marca: 'Hyundai',
    modelo: 'Santa Fe',
    placa: 'BTR-932',
    color: 'Gris',
    anio: '2019',
    foto: require('@/assets/images/santafe.png'),
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#A18AFF' }}>
      {/* Fondo superior con patrón */}
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

      {/* Contenedor principal */}
      <View style={styles.formContainer}>
        {/* Flecha y título */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/GestionPerfilConductor")}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[styles.formTitle, { marginLeft: 85 }]}>Vehículos</Text>
        </View>

        {/* Vehicle Card with blue figure */}
        <View style={{ position: 'relative', marginHorizontal: 16, marginTop: 8, marginBottom: 32, height: 140 }}>
          {/* Blue Figure OVER the card */}
          <View style={[styles.blueFigure, { position: 'absolute', left: 0, top: 0, zIndex: 2, elevation: 3 }]} />
          {/* Card */}
          <View style={[styles.vehicleCard, { position: 'relative', zIndex: 1 }]}>
            <Image
              source={vehiculo.foto}
              style={styles.vehicleImg}
              resizeMode="cover"
            />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleTitle}>{vehiculo.marca} {vehiculo.modelo}</Text>
              <View style={styles.vehicleButtonsRow}>
                <TouchableOpacity style={styles.infoBtn} onPress={() => setShowInfoPopup(true)}>
                  <Text style={styles.infoBtnText}>Información</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => setShowDeletePopup(true)}>
                  <Text style={styles.deleteBtnText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Botón Agregar Vehículo fijo abajo */}
      <TouchableOpacity
        style={[styles.addButton, { position: 'absolute', bottom: 32, left: 80, right: 32, marginHorizontal: 0, width: "60%" }]}
        onPress={() => router.push('/(tabs)/vehiculos/agregarVehiculo')}
      >
        <Text style={styles.addButtonText}>Agregar Vehiculo</Text>
      </TouchableOpacity>

      {/* Popup modal de vehículo agregado */}
      <Modal
        visible={showModal && params?.from !== 'editarVehiculo'}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.popupCard}>
            {/* Encabezado con check y texto */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Image
                source={require('@/assets/images/circle-check.png')}
                style={{ width: 32, height: 32, marginRight: 8 }}
                resizeMode="contain"
              />
              <Text style={styles.popupTitle}>Vehículo Agregado</Text>
            </View>
            {/* Info y foto */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoMarca}>{vehiculo.marca}</Text>
                <Text style={styles.infoLabel}>Modelo</Text>
                <Text style={styles.infoValue}>{vehiculo.modelo}</Text>
                <Text style={styles.infoLabel}>Placa</Text>
                <Text style={styles.infoValue}>{vehiculo.placa}</Text>
                <Text style={styles.infoLabel}>Color</Text>
                <Text style={styles.infoValue}>{vehiculo.color}</Text>
                <Text style={styles.infoLabel}>Año</Text>
                <Text style={styles.infoValue}>{vehiculo.anio}</Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Image
                  source={vehiculo.foto}
                  style={{
                    width: 120,
                    height: 90,
                    borderRadius: 8,
                    borderWidth: 5,
                    borderColor: '#7B61FF',
                    backgroundColor: '#fff',
                  }}
                  resizeMode="cover"
                />
              </View>
            </View>
            {/* Botón continuar */}
            <TouchableOpacity
              style={styles.continuarBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.continuarBtnText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Información del vehículo popup */}
      <Modal
        visible={showInfoPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInfoPopup(false)}
      >
        <View style={styles.infoModalOverlay}>
          <View style={styles.infoPopupCard}>
            {/* Blue top bar */}
            <View style={styles.infoPopupBar} />
            {/* Contenido desplazado hacia abajo */}
            <View style={{ marginTop: 1 }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <TouchableOpacity onPress={() => setShowInfoPopup(false)}>
                  <Image
                    source={require('@/assets/images/flechaback.png')}
                    style={{ width: 32, height: 32 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={styles.infoPopupTitle}>Información</Text>
              </View>
              {/* Info and image */}
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Marca</Text>
                  <Text style={styles.infoValue}>{vehiculo.marca}</Text>
                  <Text style={styles.infoLabel}>Modelo</Text>
                  <Text style={styles.infoValue}>{vehiculo.modelo}</Text>
                  <Text style={styles.infoLabel}>Placa</Text>
                  <Text style={styles.infoValue}>{vehiculo.placa}</Text>
                  <Text style={styles.infoLabel}>Color</Text>
                  <Text style={styles.infoValue}>{vehiculo.color}</Text>
                  <Text style={styles.infoLabel}>Año</Text>
                  <Text style={styles.infoValue}>{vehiculo.anio}</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <View style={styles.infoImageShadow}>
                    <Image
                      source={vehiculo.foto}
                      style={styles.infoImage}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>
              {/* Editar Información button */}
              <TouchableOpacity
                style={styles.editInfoBtn}
                onPress={() => {
                  setShowInfoPopup(false);
                  router.push('/(tabs)/vehiculos/editarVehiculo');
                }}
              >
                <Text style={styles.editInfoBtnText}>Editar Información</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Eliminar vehículo popup */}
      <Modal
        visible={showDeletePopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeletePopup(false)}
      >
        <View style={styles.deleteModalOverlay}>
          <View style={styles.deletePopupCard}>
            <Text style={styles.deletePopupTitle}>
              ¿Estás seguro que quieres eliminar el vehículo Hyundai Tucson?
            </Text>
            <Text style={styles.deletePopupSubtitle}>
              Todos los datos del vehiculo serán eliminados
            </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 18 }}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowDeletePopup(false)}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => {
                  setShowDeletePopup(false);
                  router.replace('/(tabs)/vehiculos/sinVehiculos');
                }}
              >
                <Text style={styles.acceptBtnText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success popup */}
      {showSuccess && (
        <View style={{
          position: 'absolute',
          top: 180,
          left: 16,
          right: 16,
          backgroundColor: '#E6FFF1',
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 16,
          shadowColor: '#000',
          shadowOpacity: 0.10,
          shadowRadius: 8,
          elevation: 4,
        }}>
          <Image
            source={require('@/assets/images/circle-check.png')}
            style={{ width: 24, height: 24, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text style={{ color: '#219653', fontFamily: 'Exo-Bold', fontSize: 20 }}>
            Se han guardado los datos con éxito
          </Text>
        </View>
      )}

      {/* Barra de navegación inferior */}
    </View>
  );
}

const styles = StyleSheet.create({
  topBackground: { height: 120, position: 'relative' },
  bgPattern: { position: 'absolute' },
  logo: { width: 120, height: 36, position: 'absolute', top: 16, right: 16 },

  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 100,
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  vehicleCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 32,
    position: 'relative',
    height: 140,
  },
  blueFigure: {
    width: 30,
    marginLeft: -10,
    height: 140,
    backgroundColor: '#7875F8',
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    elevation: 3,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F2FF',
    borderRadius: 32,
    paddingLeft: 24,
    paddingVertical: 16,
    paddingRight: 24,
    flex: 1,
    minHeight: 140,
    position: 'relative',
    zIndex: 1,
  },
  vehicleImg: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: 20,
  },
  vehicleInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  formTitle: {
    fontFamily: 'Exo-Bold',
    fontSize: 28,
    color: '#181718',
    marginLeft: 12,
  },
  vehicleTitle: {
    fontFamily: 'Exo-Bold',
    fontSize: 22,
    color: '#181718',
    marginBottom: 18,
  },
  vehicleButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoBtn: {
    backgroundColor: '#7875F8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  infoBtnText: {
    color: '#fff',
    fontFamily: 'Exo-Bold',
    fontSize: 13,
    textAlign: 'center',
  },
  deleteBtn: {
    backgroundColor: '#F3F2FF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7875F8',
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#7875F8',
    fontFamily: 'Exo-Bold',
    fontSize: 13,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#7875F8',
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 60,
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Exo-Bold',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: 340,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  popupTitle: {
    color: '#4CAF50',
    fontFamily: 'Exo-Bold',
    fontSize: 26,
    fontWeight: 'bold',
  },
  infoMarca: {
    fontFamily: 'Exo-Bold',
    fontSize: 22,
    color: '#181718',
    marginBottom: 2,
  },
  infoLabel: {
    color: '#888',
    fontSize: 13,
    fontFamily: 'Exo-Regular',
    marginTop: 2,
  },
  infoValue: {
    fontFamily: 'Exo-Bold',
    fontSize: 18,
    color: '#181718',
    marginBottom: 2,
  },
  continuarBtn: {
    backgroundColor: '#7B61FF',
    borderRadius: 8,
    paddingVertical: 12,
    alignSelf: 'center',
    width: '100%',
    marginTop: 18,
  },
  continuarBtnText: {
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
  infoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)', // Más oscuro para el fondo del popup de información
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoPopupCard: {
    backgroundColor: '#F3F2FF',
    borderRadius: 28,
    width: 360,
    padding: 24,
    paddingTop: 0,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  infoPopupBar: {
    height: 24,
    width: '124%',
    backgroundColor: '#7B7BFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    alignSelf: 'center',
    marginLeft: -24,
    marginBottom: 8,
  },
  infoPopupTitle: {
    fontFamily: 'Exo-Bold',
    fontSize: 32,
    color: '#181718',
    marginLeft: 12,
  },
  infoImageShadow: {
    backgroundColor: '#7B7BFF',
    borderRadius: 12,
    padding: 6,
    marginTop: 8,
  },
  infoImage: {
    width: 110,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  editInfoBtn: {
    backgroundColor: '#FFA800',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'flex-end',
    marginTop: 18,
  },
  editInfoBtnText: {
    color: '#fff',
    fontFamily: 'Exo-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  deletePopupCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: 340,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  deletePopupTitle: {
    fontFamily: 'Exo-Bold',
    fontSize: 20,
    color: '#181718',
    marginBottom: 12,
  },
  deletePopupSubtitle: {
    fontFamily: 'Exo-Regular',
    fontSize: 15,
    color: '#888',
    marginBottom: 0,
  },
  cancelBtn: {
    backgroundColor: '#FFA800',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
  },
  cancelBtnText: {
    color: '#fff',
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  acceptBtn: {
    backgroundColor: '#7B61FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  acceptBtnText: {
    color: '#fff',
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)', // Más oscuro que modalOverlay
    justifyContent: 'center',
    alignItems: 'center',
  },
});
