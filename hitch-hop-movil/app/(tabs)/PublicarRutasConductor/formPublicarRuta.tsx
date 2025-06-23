// Autores: Anthony Guevara
// Formulario para publicar rutas como conductor
// Componente principal de la página de publicación de rutas
// Llama y utiliza a: ClickableInput, SelectPaymentModal, DateTimeModal, RouteSuccessModal

// Import React
import React, { useEffect, useState, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

// Input Fields Components
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
// Removed unused imports from @/components/ui/input
import { Modal, ModalBackdrop, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"
import { Select } from "@/components/ui/select";
import { Button, ButtonText } from "@/components/ui/button";
import DateTimeModal from '@/components/SelectDateTimeModal';
import SelectPaymentModal from '@/components/SelectPaymentModal';
import ClickableInput from '@/components/ClickableInput';
import RouteSuccessModal from '@/components/RouteSuccessModal';
import { LucideCalendarDays, LucideChevronRight } from "lucide-react-native";

// Auth and API imports
import { useAuth } from '../Context/auth-context';
import { getVehiclesByIdsRequest } from '@/interconnection/vehicle';
import { getAllPlacesRequest } from '@/interconnection/place';
import { registerTripRequest } from '@/interconnection/trip';


// Assets
const fondoHeader = require("@/assets/images/fondoPubRutas2.png");
const flechaBack = require("@/assets/images/flechaback.png");
const logoHeader = require("@/assets/images/HHLogoDisplay.png");

// Payment method options - now handled by SelectPaymentModal

interface Vehiculo {
  _id: string;
  model: string;
  brand: string;
  color: string;
  plate: string;
  year: string;
  userId: string;
}

export default function FormPublicarRuta() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null); const { user } = useAuth(); // Get current user from auth context

  // Add ref only for the remaining text input (asientos)
  const asientosRef = useRef<TextInput>(null);
  const lastFetchedUserIdRef = useRef<string | null>(null); // Track the last user ID we fetched vehicles for
  const [userVehicles, setUserVehicles] = useState<Vehiculo[]>([]);
  const [showNoVehicleModal, setShowNoVehicleModal] = useState(false);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [vehicleCache, setVehicleCache] = useState<{ [userId: string]: Vehiculo[] }>({});

  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [origen, setOrigen] = useState("");
  const [paradas, setParadas] = useState("");
  const [destino, setDestino] = useState("");
  const [asientosDisponibles, setAsientosDisponibles] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");// Modal visibility states
  const [dateTimeModalVisible, setDateTimeModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false); const [successModalVisible, setSuccessModalVisible] = useState(false);
  // Cost state
  const [costoPasajero, setCostoPasajero] = useState("");

  // Trip submission states
  const [isSubmittingTrip, setIsSubmittingTrip] = useState(false);
  const [allPlaces, setAllPlaces] = useState<any[]>([]);

  // Validation error states
  const [fieldErrors, setFieldErrors] = useState({
    origen: false,
    destino: false,
    vehiculo: false,
    asientosDisponibles: false,
    metodoPago: false
  });
  const [showValidationError, setShowValidationError] = useState(false);

  // Optimize vehicle fetching - only fetch once per session or when user changes
  useEffect(() => {
    // Extract vehicle IDs at the beginning to satisfy ESLint
    const userVehicleIds = user?.vehicles ?? [];

    const fetchUserVehicles = async () => {
      try {
        const userId = user._id;

        // Check if we already have cached vehicles for this user
        if (vehicleCache[userId] && lastFetchedUserIdRef.current === userId) {
          console.log("Using cached vehicles for user:", userId);
          setUserVehicles(vehicleCache[userId]);
          setShowNoVehicleModal(vehicleCache[userId].length === 0);
          setIsLoadingVehicles(false);
          return;
        }
        if (!userId || userVehicleIds.length === 0) {
          console.log("No user found or user ID missing");
          setShowNoVehicleModal(true);
          setIsLoadingVehicles(false);
          lastFetchedUserIdRef.current = null;
          return;
        }

        // First time loading for this user - fetch from API
        console.log("Fetching vehicles for first time for user:", userId);
        setIsLoadingVehicles(true);

        // Call API to get user vehicles using the vehicle IDs from the user object
        const vehiculos = await getVehiclesByIdsRequest(userVehicleIds);

        if (!vehiculos || vehiculos.length === 0) {
          setShowNoVehicleModal(true);
          setUserVehicles([]);
          // Cache empty result
          setVehicleCache(prev => ({ ...prev, [userId]: [] }));
        } else {
          setUserVehicles(vehiculos);
          setShowNoVehicleModal(false);          // Cache successful result
          setVehicleCache(prev => ({ ...prev, [userId]: vehiculos }));
        }
      } catch (error) {
        console.error("Error fetching user vehicles:", error);
        setShowNoVehicleModal(true);
        setUserVehicles([]);
        // Cache empty result on error
        if (user?._id) {
          setVehicleCache(prev => ({ ...prev, [user._id]: [] }));
        }
      } finally {
        setIsLoadingVehicles(false);
      }
    };    // Only fetch vehicles if user exists
    if (user?._id) {
      fetchUserVehicles();
    } else if (!user?._id) {
      // Reset state if no user
      setUserVehicles([]);
      setIsLoadingVehicles(false);
      lastFetchedUserIdRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, user?.vehicles]); // Only depend on user ID and vehicles array (vehicleCache excluded to prevent infinite loop)


  // Effect to handle incoming data from navigation
  useEffect(() => {
    // Update all values at once to prevent conflicts
    if (params.selectedOrigin) {
      setOrigen(params.selectedOrigin as string);
    }
    if (params.selectedDestination) {
      setDestino(params.selectedDestination as string);
    }
    if (params.selectedStops) {
      setParadas(params.selectedStops as string);
    }
    // Restore other form values from context
    if (params.contextVehiculo) {
      setVehiculo(params.contextVehiculo as string);
    }
    if (params.contextAsientosDisponibles) {
      setAsientosDisponibles(params.contextAsientosDisponibles as string);
    }
    if (params.contextMetodoPago) {
      setMetodoPago(params.contextMetodoPago as string);
    }
    if (params.contextCostoPasajero) {
      setCostoPasajero(params.contextCostoPasajero as string);
    }
    if (params.contextFecha) {
      setFecha(new Date(params.contextFecha as string));
    }
    if (params.contextHora) {
      setHora(new Date(params.contextHora as string));
    }
  }, [params.selectedOrigin, params.selectedDestination, params.selectedStops, params.contextVehiculo, params.contextAsientosDisponibles, params.contextMetodoPago, params.contextCostoPasajero, params.contextFecha, params.contextHora]);

  // Load all places for trip submission
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const places = await getAllPlacesRequest();
        if (places && Array.isArray(places)) {
          setAllPlaces(places);
        }
      } catch (error) {
        console.error('Error loading places:', error);
      }
    };

    loadPlaces();
  }, []);

  // Effect to clear validation errors when user starts filling fields
  useEffect(() => {
    if (showValidationError) {
      const newErrors = { ...fieldErrors };
      let shouldUpdate = false;

      if (origen.trim() && fieldErrors.origen) {
        newErrors.origen = false;
        shouldUpdate = true;
      }
      if (destino.trim() && fieldErrors.destino) {
        newErrors.destino = false;
        shouldUpdate = true;
      }
      if (vehiculo.trim() && fieldErrors.vehiculo) {
        newErrors.vehiculo = false;
        shouldUpdate = true;
      }
      if (asientosDisponibles.trim() && parseInt(asientosDisponibles) > 0 && fieldErrors.asientosDisponibles) {
        newErrors.asientosDisponibles = false;
        shouldUpdate = true;
      }
      if (metodoPago.trim() && fieldErrors.metodoPago) {
        newErrors.metodoPago = false;
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        setFieldErrors(newErrors);
        // Check if all errors are resolved
        const hasAnyErrors = Object.values(newErrors).some(error => error);
        if (!hasAnyErrors) {
          setShowValidationError(false);
        }
      }
    }
  }, [origen, destino, vehiculo, asientosDisponibles, metodoPago, fieldErrors, showValidationError]);  // Helper function to find place ID by name

  const findPlaceIdByName = (placeName: string): string | null => {
    const place = allPlaces.find(p => p.name === placeName.trim());
    return place ? place._id : null;
  };

  // Function to submit trip to backend
  const submitTripToBackend = async (): Promise<boolean> => {
    try {
      setIsSubmittingTrip(true);

      // Find place IDs
      const startPointId = findPlaceIdByName(origen);
      const endPointId = findPlaceIdByName(destino);

      if (!startPointId || !endPointId) {
        console.error('Could not find place IDs for origin or destination');
        return false;
      }
      // Process stops
      const stopsList = paradas ? paradas.split(',').map(stop => stop.trim()).filter(Boolean) : [];
      const stopsWithIds = stopsList.map(stopName => {
        const placeId = findPlaceIdByName(stopName);
        if (!placeId) {
          console.error(`Could not find place ID for stop: ${stopName}`);
          return null;
        }
        return {
          place: placeId,
          status: 'Pendiente' as const
        };
      }).filter((stop): stop is { place: string; status: 'Pendiente' } => stop !== null);        // Get selected vehicle ID
      const selectedVehicle = userVehicles.find(v => getVehicleDisplayName(v) === vehiculo);
      if (!selectedVehicle) {
        console.error('Could not find selected vehicle');
        return false;
      }
      // Combine date and time for departure
      const departureDatetime = new Date(fecha);
      departureDatetime.setHours(hora.getHours(), hora.getMinutes(), 0, 0);

      // For arrival, since it's unknown, set it to same day at 23:59 as a placeholder
      // This represents "unknown arrival time" but satisfies the backend requirement
      const arrivalDatetime = new Date(departureDatetime);
      arrivalDatetime.setHours(23, 59, 59, 999);

      // Parse payment method for backend - simplified logic
      const paymentMethods = metodoPago.split(',').map(method => method.trim());
      let backendPaymethod: 'Gratuito' | 'Sinpe' | 'Efectivo';

      if (paymentMethods.includes('Gratuito')) {
        backendPaymethod = 'Gratuito';
      } else if (paymentMethods.includes('Sinpe')) {
        backendPaymethod = 'Sinpe';
      } else {
        backendPaymethod = 'Efectivo';
      }
      // Prepare trip data
      const tripData = {
        startpoint: startPointId,
        endpoint: endPointId,
        departure: departureDatetime,
        arrival: arrivalDatetime,
        stops: stopsWithIds,
        passengers: [], // Initially empty
        driver: user._id,
        vehicle: selectedVehicle._id, // Add vehicle ObjectId
        passengerLimit: parseInt(asientosDisponibles), // Add passenger limit
        paymethod: backendPaymethod,
        costPerPerson: parseFloat(costoPasajero) || 0
      };

      console.log('Submitting trip data:', tripData);

      // Submit to backend
      const result = await registerTripRequest(tripData);

      if (result) {
        console.log('Trip submitted successfully:', result);
        return true;
      } else {
        console.error('Failed to submit trip');
        return false;
      }

    } catch (error) {
      console.error('Error submitting trip:', error);
      return false;
    } finally {
      setIsSubmittingTrip(false);
    }
  };

  const handlePublicarRuta = async () => {
    // Reset validation errors
    const errors = {
      origen: false,
      destino: false,
      vehiculo: false,
      asientosDisponibles: false,
      metodoPago: false
    };

    let hasErrors = false;

    // Validate all required fields
    if (!origen.trim()) {
      errors.origen = true;
      hasErrors = true;
    }

    if (!destino.trim()) {
      errors.destino = true;
      hasErrors = true;
    }

    if (!vehiculo.trim()) {
      errors.vehiculo = true;
      hasErrors = true;
    }

    if (!asientosDisponibles.trim() || parseInt(asientosDisponibles) <= 0) {
      errors.asientosDisponibles = true;
      hasErrors = true;
    }

    if (!metodoPago.trim()) {
      errors.metodoPago = true;
      hasErrors = true;
    }

    // Update error states
    setFieldErrors(errors);
    setShowValidationError(hasErrors);

    // If there are errors, don't proceed
    if (hasErrors) {
      return;
    }
    // All validations passed, try to submit to backend
    const success = await submitTripToBackend();

    if (success) {
      console.log("Ruta publicada exitosamente:", {
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
      setSuccessModalVisible(true);
    } else {
      // Handle submission error
      console.error("Error al publicar la ruta");
      // You could show an error modal here or update state to show error message
      alert("Error al publicar la ruta. Por favor intente nuevamente.");
    }
  };

  // Function to handle success modal acceptance
  const handleSuccessAccept = () => {
    setSuccessModalVisible(false);
    router.push("/(tabs)/HomeConductor");
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

  // Function to scroll to input when focused
  const scrollToInput = (inputRef: React.RefObject<TextInput | null>) => {
    setTimeout(() => {
      inputRef.current?.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current?.scrollTo({
          y: pageY - 50, // Offset to show the input clearly
          animated: true,
        });
      });
    }, 100);
  };

  // Helper function to get vehicle display name
  const getVehicleDisplayName = (vehicle: Vehiculo) => {
    return `${vehicle.brand} ${vehicle.model} (${vehicle.plate})`;
  };

  // Helper function to get payment display text
  const getPaymentDisplayText = () => {
    if (!metodoPago) {
      return "Seleccione un método de pago";
    }

    if (metodoPago.includes("Gratuito")) {
      return metodoPago;
    }

    if (costoPasajero && costoPasajero !== "0") {
      return `${metodoPago} - ₡${costoPasajero}`;
    }

    return metodoPago;
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
    >
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
        <TouchableOpacity onPress={() => router.push("/(tabs)/HomeConductor")}>
          <Image
            source={flechaBack}
            style={styles.flechaBack}
            resizeMode="contain"
          />        </TouchableOpacity>
      </View>      <View style={styles.formContainer}>
        {/* Loading state */}
        {isLoadingVehicles ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7875F8" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : (
          // Form content
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.container}
            style={styles.scrollView}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            nestedScrollEnabled={true}
          >{/* Contenido del formulario */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, fieldErrors.origen && styles.errorLabel]}>
                Punto de Inicio<Text style={styles.asterisk}>*</Text>
              </Text>
              <ClickableInput
                header=""
                value={origen}
                placeholder="Sin seleccionar"
                destinationType="origin"
                currentOrigin={origen}
                currentDestination={destino}
                currentStops={paradas}
                currentVehiculo={vehiculo}
                currentAsientosDisponibles={asientosDisponibles}
                currentMetodoPago={metodoPago}
                currentCostoPasajero={costoPasajero}
                currentFecha={fecha.toISOString()}
                currentHora={hora.toISOString()}
              />
            </View>

            {/* Divider */}
            <View style={styles.divider} />          <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Puntos de Parada<Text style={styles.asterisk}>*</Text>
              </Text>
              <ClickableInput
                header=""
                value={paradas}
                placeholder="Sin seleccionar"
                destinationType="stops"
                currentOrigin={origen}
                currentDestination={destino}
                currentStops={paradas}
                currentVehiculo={vehiculo}
                currentAsientosDisponibles={asientosDisponibles}
                currentMetodoPago={metodoPago}
                currentCostoPasajero={costoPasajero}
                currentFecha={fecha.toISOString()}
                currentHora={hora.toISOString()}
              />
            </View>

            {/* Divider */}
            <View style={styles.divider} />
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, fieldErrors.destino && styles.errorLabel]}>
                Punto Final<Text style={styles.asterisk}>*</Text>
              </Text>
              <ClickableInput
                header=""
                value={destino}
                placeholder="Sin seleccionar"
                destinationType="destination"
                currentOrigin={origen}
                currentDestination={destino}
                currentStops={paradas}
                currentVehiculo={vehiculo}
                currentAsientosDisponibles={asientosDisponibles}
                currentMetodoPago={metodoPago}
                currentCostoPasajero={costoPasajero}
                currentFecha={fecha.toISOString()}
                currentHora={hora.toISOString()}
              />
            </View>

            {/* Divider */}
            <View style={styles.divider} />          <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, fieldErrors.vehiculo && styles.errorLabel]}>
                Vehículo a Usar<Text style={styles.asterisk}>*</Text>
              </Text>            {userVehicles.length > 0 ? (
                <Select
                  options={userVehicles.map((v) => getVehicleDisplayName(v))}
                  selectedValue={vehiculo}
                  onValueChange={setVehiculo}
                  placeholder="Seleccione un vehículo"
                />
              ) : (
                <TouchableOpacity
                  style={styles.disabledSelect}
                  onPress={() => setShowNoVehicleModal(true)}
                >
                  <Text style={[styles.placeholderText, { fontSize: 15 }]}>No hay vehículos disponibles</Text>
                </TouchableOpacity>
              )}          </View>

            {/* Divider */}
            <View style={styles.divider} />
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, fieldErrors.asientosDisponibles && styles.errorLabel]}>
                Cantidad de Pasajeros<Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                ref={asientosRef}
                value={asientosDisponibles}
                onChangeText={setAsientosDisponibles}
                placeholder="Ingrese la cantidad de pasajeros"
                keyboardType="numeric"
                style={styles.textInput}
                onFocus={() => scrollToInput(asientosRef)}
                returnKeyType="done"
              />          </View>

            {/* Divider */}
            <View style={styles.divider} />
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, fieldErrors.metodoPago && styles.errorLabel]}>
                Método de Pago<Text style={styles.asterisk}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.dateTimeSelector}
                onPress={() => setPaymentModalVisible(true)}
              >
                <View style={styles.dateTimeSelectorInner}>
                  <Text style={[styles.dateTimeText, !metodoPago && styles.placeholderText]}>
                    {getPaymentDisplayText()}
                  </Text>
                  <LucideChevronRight
                    size={24}
                    color="#414040"
                  />
                </View>
              </TouchableOpacity>
            </View>
            {/* Divider */}
            <View style={styles.divider} />          <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Horario del Viaje<Text style={styles.asterisk}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.dateTimeSelector}
                onPress={() => setDateTimeModalVisible(true)}
              >
                <View style={styles.dateTimeSelectorInner}>
                  <Text style={styles.dateTimeText}>
                    {fecha.toLocaleDateString('es-ES')} - {hora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <LucideCalendarDays
                    size={24}
                    color="#414040"
                  />
                </View>            </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider} />
            </View>          {/* Button with proper margins */}
            <View style={styles.buttonContainer}>
              {showValidationError && (
                <Text style={styles.validationError}>
                  *Por favor, complete los campos obligatorios.
                </Text>
              )}
              <Button onPress={handlePublicarRuta} style={styles.button} disabled={isSubmittingTrip}>
                {isSubmittingTrip ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>Registrar Ruta</Text>
                )}
              </Button>
            </View>        </ScrollView>
        )}
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
            </ModalBody>            <ModalFooter>
              <Button
                onPress={() => {
                  setShowNoVehicleModal(false);
                  router.push('/(tabs)/vehiculos/agregarVehiculo');
                }}
                style={{ backgroundColor: '#7875F8', width: '100%' }}
              >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Añadir</Text>
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
      {/* Modal that appears when clicking on the payment method selector */}
      <SelectPaymentModal
        isVisible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onConfirm={handlePaymentConfirm}
        initialPaymentMethods={metodoPago ? metodoPago.split(", ") : []}
        initialCost={costoPasajero}
      />

      {/* Success modal that appears when route is published successfully */}
      <RouteSuccessModal
        isVisible={successModalVisible}
        onAccept={handleSuccessAccept}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 45,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: "#fff",
    minHeight: '100%',
  },
  scrollView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
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
  }, button: {
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
    padding: 12,
    width: "100%",
    marginBottom: 5,
    fontSize: 13,
    backgroundColor: "#fff",
  },
  // Add focused input style
  textInputFocused: {
    borderColor: "#7875F8",
    borderWidth: 2,
    shadowColor: "#7875F8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  }, inputGroup: {
    marginVertical: 10,
    width: "100%",
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 16,
    color: "#000"
  },
  errorText: {
    color: "red",
    fontSize: 12,
  }, backgroundImageContainer: {
    width: "115%",
    height: 150,
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    top: -25,
    left: 0,
    zIndex: 0,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 10,
    resizeMode: "cover",
  }, hitchhopText: {
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
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dateTimeSelectorInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }, dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDDCDB',
    width: '100%',
    alignSelf: 'center',
  }, buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  // New styles for validation
  errorLabel: {
    color: '#dc2626', // Red color for error labels
  }, asterisk: {
    color: '#dc2626', // Red color for asterisks
    fontWeight: '600',
  },
  validationError: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});
