// Import React
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Input Fields Components
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, } from "react-native";
import { Input, InputField, InputSlot, InputError } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DateTimeModal from '@/components/SelectDateTimeModal';
import { LucideCalendar } from "lucide-react-native";


// Assets
const fondoHeader = require("@/assets/images/fondoPubRutas2.png");
const flechaBack = require("@/assets/images/flechaback.png");
const logoHeader = require("@/assets/images/HHLogoDisplay.png");

const tiposPago = [ "Efectivo", "SINPE Movil", "Gratuito" ];

interface Vehiculo {
  nombre: string;
}

export default function FormPublicarRuta() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [userVehicles, setUserVehicles] = useState<Vehiculo[]>([]);
  const [showNoVehicleModal, setShowNoVehicleModal] = useState(false);

  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [origen, setOrigen] = useState("");
  const [paradas, setParadas] = useState("");
  const [destino, setDestino] = useState("");
  const [asientosDisponibles, setAsientosDisponibles] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  
  // New state for the modal
  const [dateTimeModalVisible, setDateTimeModalVisible] = useState(false);
  
  useEffect(() => {
    const fetchUserVehicles = async () => {
      try {
        const vehiculos: Vehiculo[] = []; // Simulación de vehículos del usuario #TODO: Reemplazar con llamada a API real
        vehiculos.push({ nombre: "Vehículo 1" });
        vehiculos.push({ nombre: "Vehículo 2" });
        vehiculos.push({ nombre: "Vehículo 3" });
        if (vehiculos.length === 0) {
          setShowNoVehicleModal(true);
        } else {
          setUserVehicles(vehiculos);
          setShowNoVehicleModal(false);
        }
      } catch (error) {
        console.error("Error fetching user vehicles:", error);
      }
    };

    fetchUserVehicles();
  }, []);

  const handlePublicarRuta = () => {
    // Aquí iría la lógica para publicar la ruta
    console.log("Ruta publicada:", {
      fecha,
      hora,
      origen,
      paradas,
      destino,
      asientosDisponibles,
      vehiculo,
      metodoPago,
    });
  };

  // Function to handle the selection
  const handleDateTimeConfirm = (selectedDate: Date, selectedTime: Date) => {
    setFecha(selectedDate);
    setHora(selectedTime);
  };
  
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Imagen de fondo Superior*/}
      <View style={styles.backgroundImageContainer}>
        <Image
          source={fondoHeader}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <Image source={logoHeader} style={styles.hitchhopText} />
      </View>

      {/* Flecha back */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={flechaBack}
            style={styles.flechaBack}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View
        style={styles.formContainer}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => {
          // Dismiss keyboard when tapping outside of input fields
          const input = TextInput.State.currentlyFocusedInput();
          if (input) {
            TextInput.State.blurTextInput(input);
          }
        }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={true}
        >
          {/*Contenido del formulario*/}
          <View style={{padding: 18}}></View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Punto de Inicio</Text>
            <TextInput
              value={origen}
              onChangeText={setOrigen}
              placeholder="Ingrese el punto de inicio"
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Puntos de Parada</Text>
            <TextInput
              value={paradas}
              onChangeText={setParadas}
              placeholder="Ingrese los puntos de parada"
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Punto Final</Text>
            <TextInput
              value={destino}
              onChangeText={setDestino}
              placeholder="Ingrese el punto final"
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vehículo a Usar</Text>
            {userVehicles.length > 0 ? (
              <Select
                options={userVehicles.map((v) => v.nombre)}
                selectedValue={vehiculo}
                onValueChange={setVehiculo}
                placeholder="Seleccione un vehículo"
              />
            ) : (
              <TouchableOpacity 
                style={styles.disabledSelect}
                onPress={() => setShowNoVehicleModal(true)}
              >
                <Text style={styles.placeholderText}>No hay vehículos disponibles</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cantidad de Pasajeros</Text>
            <TextInput
              value={asientosDisponibles}
              onChangeText={setAsientosDisponibles}
              placeholder="Ingrese la cantidad de asientos disponibles"
              keyboardType="numeric"
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Método de Pago</Text>
            <Select
              options={[
                "Efectivo",
                "Tarjeta de Crédito",
                "Transferencia Bancaria",
              ]}
              selectedValue={metodoPago}
              onValueChange={setMetodoPago}
              placeholder="Seleccione un método de pago"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Horario del Viaje</Text>
            <TouchableOpacity 
              style={styles.dateTimeSelector}
              onPress={() => setDateTimeModalVisible(true)}
            >
              <View style={styles.dateTimeSelectorInner}>
                <Text style={styles.dateTimeText}>
                  {fecha.toLocaleDateString('es-ES')} - {hora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <LucideCalendar
                  size={24}
                  color="#7875F8"
                />
              </View>
            </TouchableOpacity>
            
          </View>
          <Button onPress={handlePublicarRuta} style={styles.button}>
            <Text style={{ color: "white" }}>Registrar Ruta</Text>
          </Button>
        </ScrollView>
      </View>

      {showNoVehicleModal && (
        <Modal isOpen={showNoVehicleModal} onClose={() => setShowNoVehicleModal(false)}>
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>No tienes vehículos registrados</Text>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Text>Para publicar una ruta, primero debes agregar un vehículo.</Text>
            </ModalBody>
            <ModalFooter>
              <Button 
                onPress={() => {
                  setShowNoVehicleModal(false);
                  router.push('/(tabs)/vehiculos/agregarVehiculo');
                }}
                style={{ backgroundColor: '#5D12D2', width: '100%' }}
              >
                <Text style={{ color: 'white' }}>Agregar vehículo</Text>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {/* Modal that appears when clicking on the date/time selector */}
      <DateTimeModal 
        isVisible={dateTimeModalVisible}
        onClose={() => setDateTimeModalVisible(false)}
        onConfirm={handleDateTimeConfirm}
        initialDate={fecha}
        initialTime={hora}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 45,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    marginTop: 100,
    flex: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: "#7875F8",
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 16,
    
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 5,
  },
  inputGroup: {
    marginBottom: 15,
    width: "100%",
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  backgroundImageContainer: {
    width: "115%",
    height: 130,
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    top: -25,
    left: 0,
    zIndex: 1,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 10,
    resizeMode: "cover",
  },
  hitchhopText: {
    position: "absolute",
    right: 75,
    bottom: 75,
    zIndex: 1,
    width: 135,
    height: 25,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 20,
    paddingLeft: 16,
    position: "absolute",
    zIndex: 10,
    top: 0,
  },
  flechaBack: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  disabledSelect: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 5,
  },
  placeholderText: {
    color: "#999",
  },
  dateTimeSelector: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dateTimeSelectorInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
});
