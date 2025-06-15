import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getAllVehiclesRequest, deleteVehicleByIdRequest } from '@/interconnection/vehicle';
import { useAuth } from '../Context/auth-context';

export default function VehiculosIndex() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user, setUser } = useAuth();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ visible: boolean, id?: string, label?: string }>({ visible: false });
  const [showCreated, setShowCreated] = useState(params?.created === 'true');

  useEffect(() => {
    const fetchVehicles = async () => {
      const all = await getAllVehiclesRequest();
      if (!all) return;

      const mine = all.filter((v: any) => user.vehicles.includes(v._id));
      setVehicles(mine);

      if (mine.length === 0) {
        router.replace('/(tabs)/vehiculos/sinVehiculos');
      }
    };
    fetchVehicles();
  }, [user]);

  const confirmDelete = (id: string, label: string) => {
    setDeleteModal({ visible: true, id, label });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    await deleteVehicleByIdRequest(deleteModal.id);
    setUser({
      ...user,
      vehicles: user.vehicles.filter((v: string) => v !== deleteModal.id),
    });
    setVehicles(prev => prev.filter(v => v._id !== deleteModal.id));
    setDeleteModal({ visible: false });
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

        {vehicles.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 12 }}>
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
          <FlatList
            data={vehicles}
            keyExtractor={v => v._id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.sideStripe} />
                <Image source={{ uri: item.foto }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.brand} {item.model}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.btnInfo}
                      onPress={() => router.push({
                        pathname: '/(tabs)/vehiculos/informacionVehiculo',
                        params: { id: item._id },
                      })}
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
            )}
            ListFooterComponent={
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push({ pathname: '/(tabs)/vehiculos/agregarVehiculo', params: { created: 'true' } })}
              >
                <Text style={styles.addButtonText}>Agregar Vehículo</Text>
              </TouchableOpacity>
            }
          />
        )}
      </View>

      <Modal transparent visible={deleteModal.visible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Eliminar vehículo</Text>
            <Text style={styles.modalText}>
              ¿Deseas eliminar "{deleteModal.label}"?
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

      <Modal transparent visible={showCreated} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: '#4CAF50' }]}>✔ Vehículo Agregado</Text>
            <TouchableOpacity style={styles.modalBtnAccept} onPress={() => setShowCreated(false)}>
              <Text style={styles.modalBtnAcceptText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F3F2FF',
    borderRadius: 30,
    marginBottom: 16,
    alignItems: 'center',
  },
  sideStripe: {
    width: 12,
    backgroundColor: '#7875F8',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    height: '100%',
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
    marginLeft: 16,
    marginVertical: 16,
  },
  info: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Exo-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Exo-Bold',
    fontSize: 16,
    color: '#181718',
    textAlign: 'center',
    marginTop: -35,
    marginBottom: 40,
  },
  emptyIllustration: {
    width: 350,
    height: 350,
    marginBottom: 12,
    marginLeft: -50,
    marginTop: 15,
  },
  addButtonEmpty: {
    backgroundColor: '#7875F8',
    borderRadius: 12,
    width: 190,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  btnInfo: {
    backgroundColor: '#7875F8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  btnInfoText: {
    color: '#FFFFFF',
    fontFamily: 'Exo-Regular',
    fontSize: 14,
  },
  btnDelete: {
    borderWidth: 1,
    borderColor: '#7875F8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  btnDeleteText: {
    color: '#7875F8',
    fontFamily: 'Exo-Regular',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#7875F8',
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
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
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Exo-Regular',
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalBtnCancel: {
    backgroundColor: '#E0D7FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  modalBtnCancelText: {
    color: '#7875F8',
    fontFamily: 'Exo-Regular',
    fontSize: 14,
  },
  modalBtnAccept: {
    backgroundColor: '#7875F8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalBtnAcceptText: {
    color: '#FFFFFF',
    fontFamily: 'Exo-Regular',
    fontSize: 14,
  },
});
