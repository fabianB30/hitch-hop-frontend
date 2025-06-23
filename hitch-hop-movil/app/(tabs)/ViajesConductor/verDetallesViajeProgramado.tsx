import { CancelRideModal } from "@/components/cancelRide";
import CancelRideSucess from "@/components/CancelRideSuccess";
import { PassengerCard } from "@/components/PassengerCard";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { deleteTripRequest, getTripByIdRequest } from "@/interconnection/trip";
import { useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MoveRight, Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { useAuth } from "../Context/auth-context";

export default function VerDetallesViajeProgramado() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
    "exo.medium": require("@/assets/fonts/exo.medium.otf"),
    "Exo-SemiBold": require("@/assets/fonts/Exo-SemiBold.otf"),
    "Exo-Regular": require("@/assets/fonts/Exo-Regular.otf"),
    "Exo-Bold": require("@/assets/fonts/Exo-Bold.otf"),
  });
  if (!fontsLoaded) return null;

  // boolean if ride is full
  var isFull = false;

  const handleConfirmCancel = async () => {
    console.log("Confirm cancel tripId:", tripId);
    if (tripId) {
      try {
        setShowPopup(false);
        const result = await deleteTripRequest(tripId);
        if (result) {
          setShowPopup(false);
          router.push("/(tabs)/ViajesConductor/verViajesAceptados");
        } else {
          setSuccessMessage("Hubo un error al cancelar la solicitud.");
          setShowSuccessPopup(true);
        }
      } catch (error) {
        setSuccessMessage("Hubo un error al cancelar la solicitud.");
        setShowSuccessPopup(true);
      }
      setShowPopup(false);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  //Esto no funciona, la página recibe parámetros para crear las cards
  const handlePendingRequests = () => {
    console.log(trip, pendingPassengers);
    router.push({
      pathname: "/(tabs)/ViajesConductor/verSolicitudesPendientes",
      params: {
        users: JSON.stringify(pendingPassengers),
        userLimit: trip ? trip.userLimit : 0,
        actualPassengerNumber: trip ? trip.users : 0,
        tripIdParam: trip ? trip.id : 0,
        startParam: trip ? trip.start : "Empty",
        endParam: trip ? trip.end : "Empty",
      },
    });
  };

  interface Passenger {
    id: string;
    name: string;
    price: string;
    phone: string;
    location: string;
    image: string;
    time: string;
  }
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [pendingPassengers, setPendingPassengers] = useState<Passenger[]>([]);

  interface Trip {
    id: number;
    users: number;
    userLimit: number;
    start: string;
    end: string;
  }
  const [trip, setTrip] = useState<Trip | null>(null);

  // Move fetchData outside of useEffect so it can be reused
  const fetchData = async () => {
    try {
      const trip = await getTripByIdRequest(tripId as string);
      const price = trip.costPerPerson;
      if (trip) {
        const mappedRequests = trip.passengers
          .filter((passenger: any) => passenger.status === "Aprobado")
          .map((passenger: any) => {
            const userStop = trip.stops?.find((stop: any) =>
              stop.passengersId?.includes(passenger.user._id)
            );
            return {
              id: passenger.user._id,
              name: passenger.user.name + " " + passenger.user.firstSurname,
              price: "₡" + price,
              phone: passenger.user.phone,
              location: userStop ? userStop.place.name : "No asignado",
              image: passenger.user.photoUrl,
              time: "FALTA",
            };
          });
        setPassengers(mappedRequests);
        setTrip({
          id: trip._id,
          users: mappedRequests.length,
          userLimit: trip.passengerLimit,
          start: trip.startpoint.name,
          end: trip.endpoint.name,
        });
        setPendingPassengers(
          trip.passengers
            .filter((passenger: any) => passenger.status === "Pendiente")
            .map((passenger: any) => ({
              id: passenger.user._id,
              name: passenger.user.name + " " + passenger.user.firstSurname,
              price: "₡" + price,
              phone: passenger.user.phone,
              location: trip.startpoint.name,
              image: passenger.user.photoUrl,
              time: trip.departure.split("T")[1]?.slice(0, 5),
            }))
        );
      } else {
        setPassengers([]);
        router.replace("/(tabs)/ViajesConductor/sinProgramados");
      }
    } catch (error) {
      setPassengers([]);
      console.log(tripId);
      router.replace("/(tabs)/ViajesConductor/sinProgramados");
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchData();
    }
  }, [user, router]);

  useFocusEffect(
    React.useCallback(() => {
      if (user?._id) {
        fetchData();
      }
    }, [user, tripId])
  );

  return (
    <ImageBackground
      source={require("@/assets/images/fondoDefault.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Pressable onPress={() => router.back()} style={styles.backArrow}>
        <Image
          source={require("@/assets/images/backArrow.png")}
          style={{ width: 30, height: 30 }}
        />
      </Pressable>

      <Text style={styles.hitchhopText}>HitchHop</Text>

      <View style={styles.overlay} />

      <Box
        style={{
          zIndex: 10,
          height: "100%",
          width: "100%",
          justifyContent: "flex-start",
          gap: 8,
          paddingTop: 110,
          paddingBottom: 150,
        }}
      >
        <Box style={{ gap: 10, paddingBottom: 10 }}>
          <HStack
            style={{
              alignItems: "stretch",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>Detalles del viaje programado</Text>
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                marginRight: 10,
              }}
            >
              <Users size={24} color="black" />
              <Text
                style={{
                  fontFamily: "Exo-Regular",
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#171717",
                  textAlign: "right",
                  marginLeft: 2,
                }}
              >
                {trip ? trip.users + "/" + trip.userLimit : "..."}
              </Text>
            </Box>
          </HStack>

          <HStack
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              width: "100%",
              paddingHorizontal: 25,
              zIndex: 10,
            }}
          >
            <Box style={{ flex: 1, alignItems: "flex-start", paddingRight: 5 }}>
              <Text style={styles.start}>
                {trip ? trip.start : "Cargando..."}
              </Text>
            </Box>
            <Box
              style={{
                width: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MoveRight size={35} color="black" />
            </Box>
            <Box style={{ flex: 1, alignItems: "flex-end", paddingLeft: 5 }}>
              <Text
                style={{
                  fontFamily: "Exo-SemiBold",
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#171717",
                  textAlign: "left",
                }}
              >
                {trip ? trip.end : "Cargando..."}
              </Text>
            </Box>
          </HStack>
        </Box>

        <Box
          style={{ height: "100%", paddingHorizontal: 20, marginBottom: 100 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {passengers.map((passenger) => (
              <PassengerCard key={passenger.id} {...passenger} />
            ))}
            {!isFull && (
              <Button
                size="md"
                variant="solid"
                action="primary"
                style={{
                  backgroundColor: "#7875F8",
                  width: 320,
                  marginTop: 0,
                  zIndex: 10,
                  alignSelf: "center",
                  height: 48,
                  marginVertical: 15,
                }}
              >
                <ButtonText
                  style={styles.buttonText}
                  onPress={handlePendingRequests}
                >
                  Solicitudes Pendientes
                </ButtonText>
              </Button>
            )}
            <Box
              style={{
                width: 320,
                marginTop: 24,
                marginBottom: 18, // Slightly less to fit button closer
                alignSelf: "center",
              }}
            >
            </Box>
            <Button
              size="md"
              variant="solid"
              action="primary"
              style={{
                backgroundColor: "#F87171",
                width: 320,
                marginTop: 0,
                zIndex: 10,
                alignSelf: "center",
              }}
              onPress={() => setShowPopup(true)}
            >
              <ButtonText style={styles.buttonText}>Cancelar</ButtonText>
            </Button>
          </ScrollView>
        </Box>
      </Box>
      <CancelRideModal
        visible={showPopup}
        onCancel={() => setShowPopup(false)}
        onConfirm={handleConfirmCancel}
      />
      <CancelRideSucess
        visible={showSuccessPopup}
        onClose={handleCloseSuccessPopup}
        message={successMessage}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    position: "absolute",
    top: 60,
    left: 24,
    width: 30,
    height: 30,
    zIndex: 11,
  },
  hitchhopText: {
    position: "absolute",
    top: 30,
    right: 20,
    fontSize: 20,
    fontFamily: "Montserrat-ExtraBold",
    color: "#000",
    zIndex: 10,
  },
  title: {
    left: 25,
    color: "#171717",
    fontSize: 20,
    fontFamily: "Exo-SemiBold",
    fontWeight: "600",
    textAlign: "left",
    zIndex: 10,
  },
  capacity: {
    left: 25,
    color: "#171717",
    fontSize: 16,
    fontFamily: "Exo-Regular",
    fontWeight: "400",
    textAlign: "left",
    zIndex: 10,
  },
  buttonsContainer: {
    position: "absolute",
    top: 180,
    left: 24,
    right: 24,
    flexDirection: "row",
    gap: 16,
  },
  aprobadosButton: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: "#7875F8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    height: 48,
  },
  pendientesButton: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: "#ADA7FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    height: 48,
  },
  buttonText: {
    color: "#FEFEFF",
    fontSize: 16,
    fontFamily: "Exo-Regular",
    fontWeight: "500",
  },
  cardsScroll: {
    position: "absolute",
    top: 240,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    height: "60%",
    zIndex: 10,
  },
  cardsContainer: {
    paddingBottom: 32,
    paddingTop: 8,
  },
  start: {
    fontFamily: "Exo-SemiBold",
    fontSize: 12,
    fontWeight: "400",
    color: "#171717",
    textAlign: "left",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
});
