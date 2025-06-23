import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal
} from 'react-native';
import * as Font from 'expo-font';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getAllVehiclesRequest, deleteVehicleByIdRequest } from '@/interconnection/vehicle';
import { useAuth } from '../Context/auth-context';

/*Página de inicio de gestión de vehículos desde aquí aparecen los modals y la página con toda la información de vehículos 
*
* Esta página fue trabajada por:
*	Laura Amador
*	Óscar Obando
*	Mariano Mayorga
*
*
* */

export default function VehiculosIndex() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { user, setUser } = useAuth();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ visible: boolean, id?: string, label?: string }>({ visible: false });
  const [showCreated, setShowCreated] = useState(params?.created === 'true');
  const [infoModal, setInfoModal] = useState<{ visible: boolean; vehiculo: any | null }>({ visible: false, vehiculo: null, });

  const USE_PLACEHOLDER = false;

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!user || !user.vehicles) return;
      try {
        const all = await getAllVehiclesRequest();
        if (!all) return;

        const mine = all.filter((v: any) => user.vehicles.includes(v._id));
        setVehicles(mine);
      } catch (error) {
        console.error("Error al cargar vehículos:", error);
      }
    };

    fetchVehicles();
  }, [user]);

  const confirmDelete = (id: string, label: string) => {
    setDeleteModal({ visible: true, id, label });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await deleteVehicleByIdRequest(deleteModal.id);
      if (user) {
        setUser({
          ...user,
          vehicles: user.vehicles.filter((v: string) => v !== deleteModal.id),
        });
      }
      setVehicles(prev => prev.filter(v => v._id !== deleteModal.id));
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
    } finally {
      setDeleteModal({ visible: false });
    }
  };

  useEffect(() => {
    Font.loadAsync({
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-SemiBold': require('@/assets/fonts/Exo-SemiBold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);


  if (!fontsLoaded) return null;
  if (!user || !user.vehicles) return null;
  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>
        <Image
          source={require('@/assets/images/mg_backround_gestion.png')}
          style={styles.bgPattern}
          resizeMode="cover"
        />
        <Image
          source={require('@/assets/images/HHLogoDisplay.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={require('@/assets/images/flechaback.png')} style={{ width: 32, height: 32 }} />
          </TouchableOpacity>
          <Text style={styles.title}>Vehículos</Text>
        </View>

        {/* Contenedor del scroll */}
        <View style={{ flex: 1 }}>
          {vehicles.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require('@/assets/images/gatoautos.png')}
                style={styles.emptyIllustration}
                resizeMode="contain"
              />
              <Text style={styles.emptyText}>No hay vehículos registrados</Text>
              <TouchableOpacity
                style={styles.addButtonEmpty}
                onPress={() => router.push("/(tabs)/vehiculos/agregarVehiculo")}
              >
                <Text style={styles.addButtonText}>Agregar Vehículo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <FlatList
                data={vehicles}
                keyExtractor={v => v._id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                  <View style={styles.cardWrapper}>

                    <View style={styles.card}>
                      <View style={styles.sideStripe} />
                      <Image source={{ uri: item.photoUrl }} style={styles.image} />
                      <View style={styles.info}>
                        <Text style={styles.name}>{item.brand} {item.model}</Text>
                        <View style={styles.actions}>
                          <TouchableOpacity
                            style={styles.btnInfo}
                            onPress={() => setInfoModal({ visible: true, vehiculo: item })}
                          >
                            <Text style={styles.btnInfoText}>Información</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.btnDelete}
                            onPress={() => confirmDelete(item._id, `${item.brand} ${item.model}`)}
                          >
                            <Text style={styles.btnDeleteText}>Eliminar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>

      {vehicles.length > 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addButtonFixed}
            onPress={() => router.push('/(tabs)/vehiculos/agregarVehiculo')}
          >
            <Text style={styles.addButtonText}>Agregar Vehículo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal eliminar */}
      <Modal transparent visible={deleteModal.visible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Estas seguro que quieres eliminar el vehiculo {deleteModal.label}?</Text>
            <Text style={styles.modalText}>
              Todos los datos del vehiculo serán eliminados.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setDeleteModal({ visible: false })}>
                <Text style={styles.modalBtnCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnAccept} onPress={handleDelete}>
                <Text style={styles.modalBtnAcceptText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal vehículo agregado */}
      <Modal transparent visible={showCreated} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: '#4CAF50' }]}>Vehículo Agregado Correctamente</Text>
            <TouchableOpacity style={styles.modalBtnAccept} onPress={() => setShowCreated(false)}>
              <Text style={styles.modalBtnAcceptText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={infoModal.visible} animationType="fade">
        <View style={styles.modalOverlay}>

          <View style={styles.modalInfoContainer}>
            <View style={styles.modalTopStripe} />

            <View style={styles.modalInfoHeader}>
              <TouchableOpacity
                onPress={() => setInfoModal({ visible: false, vehiculo: null })}
                style={styles.backButton}
              >
                <Image
                  source={require('@/assets/images/flechaback.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.modalInfoTitle}>Información</Text>
            </View>


            <View style={styles.modalInfoBody}>
              <View style={styles.textBlock}>
                <Text style={styles.infoLabel}>Marca</Text>
                <Text style={styles.infoValue}>{infoModal.vehiculo?.brand || '—'}</Text>

                <Text style={styles.infoLabel}>Modelo</Text>
                <Text style={styles.infoValue}>{infoModal.vehiculo?.model || '—'}</Text>

                <Text style={styles.infoLabel}>Placa</Text>
                <Text style={styles.infoValue}>{infoModal.vehiculo?.plate || '—'}</Text>

                <Text style={styles.infoLabel}>Color</Text>
                <Text style={styles.infoValue}>{infoModal.vehiculo?.color || '—'}</Text>

                <Text style={styles.infoLabel}>Año</Text>
                <Text style={styles.infoValue}>{infoModal.vehiculo?.year || '—'}</Text>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setInfoModal({ visible: false, vehiculo: null });
                    router.push({
                      pathname: "/(tabs)/vehiculos/editarVehiculo",
                      params: { id: infoModal.vehiculo._id },
                    });
                  }}
                >
                  <Text style={styles.editButtonText}>Editar información</Text>
                </TouchableOpacity>
              </View>

              {/* Imagen al lado derecho */}
              <View style={styles.imageBox}>
                <View style={styles.purpleBgBox} />
                <Image source={{ uri: infoModal.vehiculo?.photoUrl }} style={styles.vehicleImage} />
              </View>
            </View>
          </View>
        </View>
      </Modal >


    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A18AFF',
  },
  topBackground: {
    height: 130,
    width: '100%',
    position: 'relative',
  },
  bgPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 120,
    height: 36,
    position: 'absolute',
    top: 16,
    right: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    paddingTop: 24,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Exo-Bold',
    fontSize: 30,
    color: '#181718',
    marginLeft: 70,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 85,
  },
  cardWrapper: {
    marginBottom: 16,
    position: 'relative',
  },

  sideStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 19,
    backgroundColor: '#7875F8',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#F3F2FF',
    borderRadius: 30,
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 16,
    paddingRight: 16,
  },

  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
    marginLeft: 22,
  },
  info: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  name: {
    fontFamily: 'Exo-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  btnInfo: {
    backgroundColor: '#7875F8',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  btnInfoText: {
    color: '#FFFFFF',
    fontFamily: 'Exo-Regular',
    fontSize: 13,
  },
  btnDelete: {
    borderWidth: 1,
    borderColor: '#7875F8',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  btnDeleteText: {
    color: '#7875F8',
    fontFamily: 'Exo-Regular',
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 12
  },
  emptyIllustration: {
    width: 350,
    height: 350,
    marginBottom: 12,
    marginLeft: -50,
  },
  emptyText: {
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    color: '#181718',
    textAlign: 'center',
    marginBottom: 40,
  },
  addButtonEmpty: {
    backgroundColor: '#7875F8',
    borderRadius: 8,
    width: 190,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  backButton: {
    position: 'absolute',
    left: -15,
    top: 0,
    padding: 8,
  },

  backIcon: {
    width: 28,
    height: 28,
  },

  modalInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    position: 'relative',
    height: 48,
  },

  modalInfoTitle: {
    fontSize: 30,
    fontFamily: 'Exo-Bold',
    color: '#181718',
  },

  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    padding: 12,
    zIndex: 900,
    elevation: 8,
  },
  addButtonFixed: {
    backgroundColor: '#7875F8',
    borderRadius: 8,
    width: 190,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Exo-SemiBold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Exo-Regular',
    fontSize: 14,
    marginBottom: 14,
    textAlign: 'center',
    color: '#8C8C8C',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalBtnCancel: {
    backgroundColor: '#FFAB00',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  modalBtnCancelText: {
    color: '#FEFEFF',
    fontFamily: 'Exo-SemiBold',
    fontSize: 14,
  },
  modalBtnAccept: {
    backgroundColor: '#7875F8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalBtnAcceptText: {
    color: '#FEFEFF',
    fontFamily: 'Exo-SemiBold',
    fontSize: 14,
  },
  infoModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  infoModalContent: {
    width: '90%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  infoModalImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },

  modalBtnInfoAccept: {
    backgroundColor: '#7875F8',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  modalBtnInfoAcceptText: {
    color: '#FFFFFF',
    fontFamily: 'Exo-SemiBold',
    fontSize: 16,
  },
  infoField: {
    marginBottom: 12,
    alignItems: 'center',
  },
  modalTopStripe: {
    height: 25,
    width: 346,
    backgroundColor: '#7875F8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
  },
  modalInfoContainer: {
    width: '90%',
    backgroundColor: '#F3F2FF',
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingBottom: 0,
    paddingTop: 24 + 6,
    overflow: 'hidden',
  },

  modalInfoBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 5,
  },

  textBlock: {
    flex: 1,
    justifyContent: 'space-between',
  },

  infoLabel: {
    fontFamily: 'Exo-Regular',
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 10,
  },

  infoValue: {
    fontFamily: 'Exo-SemiBold',
    fontSize: 18,
    color: '#181718',
  },

  imageBox: {
    width: 140,
    height: 140,
    position: 'relative',
    marginLeft: 13,
  },

  purpleBgBox: {
    backgroundColor: '#7875F8',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 10,
  },

  vehicleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },

  editButton: {
    backgroundColor: '#FFB800',
    width: 180,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    bottom: 30,
    left: 130,
    alignSelf: 'flex-start',
  },

  editButtonText: {
    color: '#FFF',
    fontFamily: 'Exo-SemiBold',
    fontSize: 14,
  },


});
