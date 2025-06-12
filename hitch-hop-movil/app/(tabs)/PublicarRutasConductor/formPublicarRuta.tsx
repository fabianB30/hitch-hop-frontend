// Import React
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Input Fields Components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const fondoHeader = require("@/assets/images/fondoPubRutas2.png");
const flechaBack = require("@/assets/images/flechaback.png");
const logoHeader = require("@/assets/images/HHLogoDisplay.png");

export default function FormPublicarRuta() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [origen, setOrigen] = useState("");
  const [paradas, setParadas] = useState("");
  const [destino, setDestino] = useState("");
  const [asientosDisponibles, setAsientosDisponibles] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [error, setError] = useState("");

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
        style={{
          marginTop: 70,
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
          overflow: "hidden", // This ensures content doesn't spill outside rounded corners
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 15,
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          {/*Contenido del formulario*/}
          <View style={styles.formContainer}></View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Punto de Inicio</Text>
            <TextInput
              value={origen}
              onChangeText={setOrigen}
              placeholder="Ingrese el punto de inicio"
              style={styles.textInput}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Puntos de Parada</Text>
            <TextInput
              value={paradas}
              onChangeText={setParadas}
              placeholder="Ingrese los puntos de parada"
              style={styles.textInput}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Punto Final</Text>
            <TextInput
              value={destino}
              onChangeText={setDestino}
              placeholder="Ingrese el punto final"
              style={styles.textInput}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vehículo a Usar</Text>
            <Select
              options={["Vehículo 1", "Vehículo 2", "Vehículo 3"]}
              selectedValue={vehiculo}
              onValueChange={setVehiculo}
              placeholder="Seleccione un vehículo"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Elegir un Horario</Text>
            <TouchableOpacity onPress={() => setHora(new Date())}>
              <Text style={styles.dateTimeText}>
                {hora.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <Button onPress={handlePublicarRuta} style={styles.button}>
            <Text style={{ color: "white" }}>Registrar Ruta</Text>
          </Button>
        </ScrollView>
      </View>
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
    paddingHorizontal: 15,
    paddingBottom: 0,
    paddingTop: 20, // Reduced from 80 to show more content
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    borderRadius: 30,
  },
  dateTimeText: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    width: "100%",
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
    top: -20,
    left: 0,
    zIndex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
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
});
