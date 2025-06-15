import React from 'react';
import { Modal, Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type CancelPopupProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const { width, height } = Dimensions.get('window');

export default function CancelPopup({ visible, onConfirm, onCancel }: CancelPopupProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>¿Desea cancelar el viaje?</Text>
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
              <Text style={styles.yesText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={onCancel}>
              <Text style={styles.noText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.90,
    minHeight: height * 0.25,
    maxHeight: height * 0.35,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Exo-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 3,
  },
  yesButton: {
    width: 104,
    height: 43,
    backgroundColor: '#FFAB00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  noButton: {
    width: 104,
    height: 43,
    backgroundColor: '#7875F8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  yesText: {
    color: '#FEFEFF',
    fontSize: 18,
    fontFamily: 'Exo-Regular',
    fontWeight: '500',
  },
  noText: {
    color: '#FEFEFF',
    fontSize: 18,
    fontFamily: 'Exo-Regular',
    fontWeight: '500',
  },
});