import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = Math.min(Math.max(width * 0.9, 310), 368);

export default function CancelSuccessPopup({ visible, onClose }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, { width: CONTAINER_WIDTH }]}>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name="alert-circle" size={22} color="#FB954B" style={{ marginRight: 8 }} />
            <Text style={styles.heading}>Viaje Cancelado</Text>
          </View>          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={20} color="#8E8E8E" />
          </TouchableOpacity>          
          <Text style={styles.message}>El conductor de este viaje ha sido notificado.</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.10)',
    paddingBottom: 40,
  },
  container: {
    minWidth: 310,
    maxWidth: 368,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  heading: {
    color: '#FB954B',
    fontSize: 16,
    fontFamily: 'Exo',
    fontWeight: '600',
    marginBottom: 2,
  },
  message: {
    color: '#262627',
    fontSize: 16,
    fontFamily: 'Exo',
    fontWeight: '400',
    lineHeight: 24,
    marginLeft: 42,
    marginTop: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    padding: 4,
  },
});