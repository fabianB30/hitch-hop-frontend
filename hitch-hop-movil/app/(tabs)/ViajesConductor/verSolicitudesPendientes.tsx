import { PendingRequestCard } from "@/components/PendingRequestCard";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MoveRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { useAuth } from "../Context/auth-context";

export default function VerSolicitudesPendientes() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    users,
    userLimit,
    actualPassengerNumber,
    tripIdParam,
    startParam,
    endParam,
  } = useLocalSearchParams();
  const usersList = users ? JSON.parse(users as string) : [];
  const userLimitNumber = userLimit ? Number(userLimit) : 0;
  const passengerCount = actualPassengerNumber
    ? Number(actualPassengerNumber)
    : 0;
  const tripId = tripIdParam ? String(tripIdParam) : "0";
  const start = startParam ? String(startParam) : "Empty";
  const end = endParam ? String(endParam) : "Empty";
  const capacity = userLimitNumber - passengerCount;
  // boolean if ride is full
  const isFull = capacity <= 0;
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
    "exo.medium": require("@/assets/fonts/exo.medium.otf"),
    "Exo-SemiBold": require("@/assets/fonts/Exo-SemiBold.otf"),
    "Exo-Regular": require("@/assets/fonts/Exo-Regular.otf"),
    "Exo-Bold": require("@/assets/fonts/Exo-Bold.otf"),
  });
  if (!fontsLoaded) return null;

  interface Requests {
    id: number;
    name: string;
    price: string;
    location: string;
    time: string;
    capacity: string;
    image?: string; // base64
  }

  // Use state for requests
  const [requests, setRequests] = useState<Requests[]>(
    usersList.map((user: any, idx: number) => ({
      id: user.id,
      name: user.name,
      price: user.price,
      location: user.location,
      time: user.time,
      capacity: String(capacity),
      image: user.image,
    }))
  );

  useEffect(() => {
    // if (requests.length == 0) {
    //   router.replace("/(tabs)/ViajesConductor/sinProgramados");
    // }
  }, [requests, router]);

  // if (requests.length === 0) {
  //   return null;
  // }

  async function handleAccept(tripId: String, requestId: number) {
    console.log(
      `(FALSO: es de prueba) Accepted request with passengerId: ${requestId}, tripId: ${tripId}`
    );
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
    // Descomentar bloque para activar la función real
    //--------------------------------------------------
    // const res = await updatePassangerStatusRequest(
    //   tripId,
    //   requestId,
    //   "Aprobado"
    // );
    // if (res) {
    //   setRequests((prev) => prev.filter((req) => req.id !== requestId));
    // } else {
    //   console.error("No se pudo actualizar el estado del pasajero.");
    // }
    //--------------------------------------------------
  }

  function handleReject(tripId: String, requestId: number) {
    console.log(
      `(FALSO: es de prueba) Rejected request with passengerId: ${requestId}, tripId: ${tripId}`
    );
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
  }

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
              alignItems: "flex-start",
              width: "100%",
              paddingHorizontal: 25,
              zIndex: 10,
            }}
          >
            <Box style={{ flex: 1, alignItems: "flex-start", paddingRight: 5 }}>
              <Text style={styles.start}>{start}</Text>
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
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#171717",
                  textAlign: "left",
                  maxWidth: "90%",
                }}
              >
                {end}
              </Text>
            </Box>
          </HStack>
        </Box>
        <Text
          style={
            isFull
              ? {
                  color: "#EF4444",
                  fontSize: 18,
                  fontFamily: "Exo-SemiBold",
                  fontWeight: "600",
                  textAlign: "left",
                  left: 25,
                  zIndex: 10,
                }
              : styles.disponibles
          }
        >
          {" "}
          {isFull
            ? "Sin espacios disponibles"
            : `Espacios disponibles: ${capacity} `}{" "}
        </Text>
        <Box
          style={{ height: "100%", paddingHorizontal: 20, marginBottom: 100 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {requests.length === 0 ? (
              <Text
                style={{
                  fontFamily: "Exo-SemiBold",
                  fontSize: 20,
                  color: "#171717",
                  textAlign: "center",
                  marginTop: 40,
                }}
              >
                No hay solicitudes pendientes
              </Text>
            ) : (
              requests.map((request) => (
                <PendingRequestCard
                  key={request.id}
                  {...request}
                  onAccept={() => handleAccept(tripId, request.id)}
                  onReject={() => handleReject(tripId, request.id)}
                />
              ))
            )}
          </ScrollView>
        </Box>
      </Box>
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
    fontFamily: "Exo",
    fontWeight: "600",
    textAlign: "left",
    zIndex: 10,
  },
  capacity: {
    left: 25,
    color: "#171717",
    fontSize: 16,
    fontFamily: "Exo",
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
    fontSize: 18,
    fontFamily: "Exo",
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
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
    color: "#171717",
    textAlign: "left",
  },
  disponibles: {
    left: 25,
    color: "#171717",
    fontSize: 18,
    fontFamily: "Exo-SemiBold",
    fontWeight: "600",
    textAlign: "left",
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
});
