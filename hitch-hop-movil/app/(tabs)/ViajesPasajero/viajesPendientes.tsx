import {ImageBackground, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { useRouter } from 'expo-router';
import { RideCard } from "@/components/RideCard";
import { Clock } from "lucide-react-native";
import CancelPopup from '@/components/cancelPopUp';
import CancelSuccessPopup from '@/components/CancelSuccessPopUp';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTripsByUserRequest, updatePassangerStatusRequest } from '@/interconnection/trip';
import { useAuth } from '../Context/auth-context';
import { useFonts } from "expo-font";

export default function viajesPendientes() {

  const router = useRouter();
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [rideToCancel, setRideToCancel] = useState<number | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    'Montserrat-ExtraBold': require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
    'exo.medium': require('@/assets/fonts/exo.medium.otf'),
    'Exo-SemiBold': require('@/assets/fonts/Exo-SemiBold.otf'),
    'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    'Exo-Light': require('@/assets/fonts/Exo-Light.otf'),
    'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
  });

  const handleCancelPress = (rideId: number) => {
    setRideToCancel(rideId);
    setShowPopup(true);
  };

  const handleConfirmCancel = async () => {
    if (rideToCancel !== null && user?._id) {
      try {
        const res = await updatePassangerStatusRequest(rideToCancel, user._id, "Cancelado");
        if (res) {
          setRides((prev) => {
            const updatedRides = prev.filter((ride) => ride.id !== rideToCancel);
            if (updatedRides.length === 0) {
              router.replace("/(tabs)/ViajesPasajero/sinViajes");
            } else {
              setShowSuccessPopup(true);
            }
            return updatedRides;
          });
        } else {
          setSuccessMessage("Hubo un error al cancelar la solicitud.");
          setShowSuccessPopup(true);
        }
      } catch {
        setSuccessMessage("Hubo un error al cancelar la solicitud.");
        setShowSuccessPopup(true);
      }
      setShowPopup(false);
      setRideToCancel(null);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setRideToCancel(null);
  };

  // La interfaz tiene las mismas propiedades que RideCardProps(RideCard.tsx)
  interface Ride {
    id: number;
    avatar: any;
    name: string;
    car: string;
    price: string;
    date: string;
    time: string;
    start: string;
    end: string;
    stopName?: string;
  }

  useEffect(() => {
    async function fetchRides() {
      try {
        const trips = await getTripsByUserRequest(user._id, false, "Pendiente");
        if (trips) {
          const mappedRides: Ride[] = trips.map((trip: any) => {
            const userStop = trip.stops?.find((stop: any) =>
              stop.passengersId?.includes(user._id)
            );
            return {
              id: trip._id,
              avatar: require("@/assets/images/avatar1.png"),
              name: trip.driver?.name || "Nombre Conductor",
              car: "Modelo Auto",
              price: `₡${trip.costPerPerson}`,
              date: trip.departure.split("T")[0],
              time: trip.departure.split("T")[1]?.slice(0,5),
              start: trip.startpoint?.name || "",
              end: trip.endpoint?.name || "",
              stopName: userStop ? userStop.place.name : "Parada no encontrada",
            };
          });

          const now = new Date();
          const filteredRides = mappedRides.filter((ride) => {
            const rideDateTime = new Date(`${ride.date}T${ride.time}`);
            return rideDateTime.getTime() >= now.getTime();
          });

          filteredRides.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA.getTime() - dateB.getTime();
          });

          setRides(filteredRides);

          // Si no hay rides, redirige
          if (mappedRides.length === 0) {
            router.replace("/(tabs)/ViajesPasajero/sinViajes");
          }
        } else {
          // Si trips es null o undefined, también redirige
          setRides([]);
          router.replace("/(tabs)/ViajesPasajero/sinViajes");
        }
      } catch (error) {
        console.error("Error al obtener viajes:", error);
        setRides([]);
        router.replace("/(tabs)/ViajesPasajero/sinViajes");
      }
    }

    if (user?._id) {
      fetchRides();
    }
  }, [user, router]);

  if (!fontsLoaded) return null;
  if (rides.length === 0) {
    return null;
  }

   return (
    <ImageBackground
      source={require('@/assets/images/fondoDefault.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Pressable
        onPress={() => router.back()}
        style={styles.backArrow}
      >
        <Image
          source={require('@/assets/images/backArrow.png')}
          style={{ width: 30, height: 30 }}
        />
      </Pressable>
      
      <Text style={styles.hitchhopText}>HitchHop</Text>

      <View style={styles.overlay} />

      <Text style={styles.title}>Viajes Pendientes</Text>

      <Box style={styles.buttonsContainer}>
        <Pressable 
            onPress={() => router.push('/(tabs)/ViajesPasajero/verDetallesViajesAceptados')}
            style={styles.aprobadosButton}
        >
          <Text style={styles.buttonText}>Aprobados</Text>
        </Pressable>
        <Pressable style={styles.pendientesButton}>
          <Text style={styles.buttonText}>Pendientes</Text>
        </Pressable>
      </Box>
      <CancelPopup
        visible={showPopup}
        onConfirm={handleConfirmCancel}
        onCancel={handleClosePopup}
      />
      <CancelSuccessPopup
        visible={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        message={successMessage}
      />
      <ScrollView
        style={styles.cardsScroll}
        contentContainerStyle={[
          styles.cardsContainer,
          { paddingBottom: insets.bottom + 50 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {rides.map((ride) => (
          <React.Fragment key={ride.id}>
            <Box
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                    width: '100%',
                }}
            >
                <Clock size={18} color="black" style={{ marginRight: 8 }} />
                <Text style={styles.esperandoAprobacion}>Esperando Aprobación</Text>
            </Box>
            <RideCard
                {...ride}
                startLabel={`Parada solicitada: ${ride.stopName || "No disponible"}`}
                onCancel={() => handleCancelPress(ride.id)}
                onDetails={() => {
                  console.log("Detalles del viaje:", ride);
                  router.push({pathname: "/(tabs)/ViajesPasajero/verDetalleViajeProgramado",
                  params: { rideId: ride.id, source: "pendiente", userStop: ride.stopName }
                  });
                }}
            />
            </React.Fragment>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backArrow: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 30,
    height: 30,
    zIndex: 11,
  },
  hitchhopText: {
    position: 'absolute',
    top: 30,
    right: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#000',
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1,
  },
  title: {
    position: 'absolute',
    top: 140,     
    left: 24,      
    color: '#171717',
    fontSize: 25,
    fontFamily: 'Exo-SemiBold',
    fontWeight: '600',
    textAlign: 'left',
    zIndex: 2,
  },
  buttonsContainer: {
    position: 'absolute',
    top: 180, 
    left: 24,
    right: 24,
    flexDirection: 'row',
    gap: 16,
    zIndex: 2,
  },
  aprobadosButton: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#ADA7FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    height: 48,
  },
  pendientesButton: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#7875F8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    height: 48,
  },
  buttonText: {
    color: '#FEFEFF',
    fontSize: 16,
    fontFamily: 'exo.medium',
    fontWeight: '500',
  },
  cardsScroll: {
    position: 'absolute',
    top: 240, 
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  cardsContainer: {
    paddingBottom: 32,
    paddingTop: 8,
  },
  esperandoAprobacion: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Exo',
    fontWeight: '500',
    flexWrap: 'wrap',
    zIndex: 2,
    },
});

