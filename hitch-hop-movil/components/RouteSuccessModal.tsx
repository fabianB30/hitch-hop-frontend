// Autores: Anthony Guevara
// Modal para mostrar que la ruta se ha publicado con éxito
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";

interface RouteSuccessModalProps {
  isVisible: boolean;
  onAccept: () => void;
}

export default function RouteSuccessModal({ isVisible, onAccept }: RouteSuccessModalProps) {
  return (
    <Modal isOpen={isVisible} onClose={onAccept}>
      <ModalBackdrop />
      <ModalContent style={styles.modalContainer}>
        <View style={styles.container}>
          {/* Header Container */}
          <View style={styles.headerContainer}>
            <Text style={styles.successMessage}>
              La ruta se ha publicado con éxito
            </Text>
          </View>
          
          {/* Actions Container */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={onAccept}
              activeOpacity={0.8}
            >
              <Text style={styles.acceptButtonText}>
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalContent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    maxWidth: 350,
    maxHeight: 500,
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    shadowColor: '#262626',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  successMessage: {
    fontFamily: 'Exo',
    fontWeight: '600', 
    fontSize: 16,
    lineHeight: 18,
    color: '#000000',
    textAlign: 'left',
    width: '100%',
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 0,
  },
  acceptButton: {
    backgroundColor: '#7875f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7875f8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  acceptButtonText: {
    fontFamily: 'Exo',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    color: '#fefeff',
    textAlign: 'center',
  },
});
