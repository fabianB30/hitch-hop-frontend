// Creado por Xotchil
// Ediciones: Xotchil
// Contiene el código del componente CancelRideModal que muestra un modal de confirmación
// para cancelar un viaje.
import React from "react";
import { View, Dimensions, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

type CancelRideModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const { width, height } = Dimensions.get('window');

export function CancelRideModal({ visible, onConfirm, onCancel }: CancelRideModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>¿Desea cancelar el viaje?</Text>
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
              <Text style={styles.buttonTextYes}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noButton} onPress={onCancel}>
              <Text style={styles.buttonTextNo}>No</Text>
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
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: width * 0.90,
    minHeight: height * 0.25,
    maxHeight: height * 0.35,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "black",
    fontSize: 18,
    fontFamily: "Exo-SemiBold",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  yesButton: {
    width: 104,
    height: 43,
    backgroundColor: "#FFAB00",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
  },
  noButton: {
    width: 104,
    height: 43,
    backgroundColor: "#7875F8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextYes: {
    color: "#FEFEFF",
    fontSize: 18,
    fontFamily: "Exo-Regular",
    fontWeight: "500",
  },
  buttonTextNo: {
    color: "#FEFEFF",
    fontSize: 18,
    fontFamily: "Exo-Regular",
    fontWeight: "500",
  },
});