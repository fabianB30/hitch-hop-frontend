// Import React
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Input Fields Components
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, } from "react-native";
// Removed unused imports from @/components/ui/input
import { Modal, ModalBackdrop, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"
import { Select } from "@/components/ui/select";
import { Button, ButtonText } from "@/components/ui/button";
import DateTimeModal from '@/components/SelectDateTimeModal';
import SelectPaymentModal from '@/components/SelectPaymentModal';
import { LucideCalendar } from "lucide-react-native";


// Assets
const fondoHeader = require("@/assets/images/fondoPubRutas2.png");
const flechaBack = require("@/assets/images/flechaback.png");
const logoHeader = require("@/assets/images/HHLogoDisplay.png");

// Payment method options - now handled by SelectPaymentModal

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
    // Modal visibility states
  const [dateTimeModalVisible, setDateTimeModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  
  // Cost state
  const [costoPasajero, setCostoPasajero] = useState("");
  
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
      costoPasajero
    });
  };
  // Function to handle the date/time selection
  const handleDateTimeConfirm = (selectedDate: Date, selectedTime: Date) => {
    setFecha(selectedDate);
    setHora(selectedTime);
  };
  
  // Function to handle payment method selection
  const handlePaymentConfirm = (paymentMethods: string[], cost: string) => {
    setMetodoPago(paymentMethods.join(", "));
    setCostoPasajero(cost);
    
    // If Gratuito is selected, set cost to 0
    if (paymentMethods.includes("Gratuito")) {
      setCostoPasajero("0");
    }
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
      </View>      <View
        style={styles.formContainer}
      >        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Contenido del formulario */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Punto de Inicio</Text>
            <TextInput
              value={origen}
              onChangeText={setOrigen}
              placeholder="Ingrese el punto de inicio"
              style={styles.textInput}
            />
          </View>
          {/* Divider */}
          <View style={styles.divider} />
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Puntos de Parada</Text>
            <TextInput
              value={paradas}
              onChangeText={setParadas}
              placeholder="Ingrese los puntos de parada"
              style={styles.textInput}
            />
          </View>
          {/* Divider */}
          <View style={styles.divider} />
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Punto Final</Text>
            <TextInput
              value={destino}
              onChangeText={setDestino}
              placeholder="Ingrese el punto final"
              style={styles.textInput}
            />
          </View>
          {/* Divider */}
          <View style={styles.divider} />
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
          {/* Divider */}
          <View style={styles.divider} />
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
          {/* Divider */}
          <View style={styles.divider} />          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Método de Pago</Text>
            <TouchableOpacity 
              style={styles.dateTimeSelector}
              onPress={() => setPaymentModalVisible(true)}
            >
              <View style={styles.dateTimeSelectorInner}>                <Text style={[styles.dateTimeText, !metodoPago && styles.placeholderText]}>
                  {metodoPago || "Seleccione un método de pago"}
                  {costoPasajero && metodoPago && !metodoPago.includes("Gratuito") ? ` - ₡${costoPasajero}` : ""}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Divider */}
          <View style={styles.divider} />
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
              </View>          {/* Button with proper margins */}
          <View style={styles.buttonContainer}>
            <Button onPress={handlePublicarRuta} style={styles.button}>
              <ButtonText style={{ fontWeight: "bold" }}>Registrar Ruta</ButtonText>
            </Button>
          </View>
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
            <ModalFooter>            <Button 
                onPress={() => {
                  setShowNoVehicleModal(false);
                  router.push('/(tabs)/vehiculos/agregarVehiculo');
                }}
                style={{ backgroundColor: '#7875F8', width: '100%' }}
              >
                <ButtonText>Añadir</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}      {/* Modal that appears when clicking on the date/time selector */}
      <DateTimeModal 
        isVisible={dateTimeModalVisible}
        onClose={() => setDateTimeModalVisible(false)}
        onConfirm={handleDateTimeConfirm}
        initialDate={fecha}
        initialTime={hora}
      />
      
      {/* Modal that appears when clicking on the payment method selector */}
      <SelectPaymentModal
        isVisible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onConfirm={handlePaymentConfirm}
        initialPaymentMethods={metodoPago ? metodoPago.split(", ") : []}
        initialCost={costoPasajero}
      />
    </View>
  );
}

const styles = StyleSheet.create({  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 45,
    paddingTop: 10, 
    paddingBottom: 30, // Added bottom padding to ensure the button is not cut off
    backgroundColor: "#fff",
    borderRadius: 30,
    flexGrow: 1, // Use flexGrow instead of flex to ensure content can expand in scrollview
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    marginTop: 50,
    flex: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 2,
  },  button: {
    backgroundColor: "#7875F8",
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 16,
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",    marginBottom: 5,
  },  inputGroup: {
    marginVertical: 10,
    width: "100%",
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },  backgroundImageContainer: {
    width: "115%",
    height: 150, // Increased height for better effect
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    top: -25,
    left: 0,
    zIndex: 0, // Changed from 1 to 0 to ensure form appears above it
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 10,
    resizeMode: "cover",
  },  hitchhopText: {
    position: "absolute",
    right: 75,
    bottom: 70, // Adjusted to be more visible with the new container position
    zIndex: 5, // Increased to ensure it's above background but below header buttons
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
    zIndex: 10, // Keep high to ensure it's on top
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
  },  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDDCDB',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
});
