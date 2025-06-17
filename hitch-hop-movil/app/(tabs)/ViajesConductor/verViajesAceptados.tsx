import { CancelRideModal } from "@/components/cancelRide";
import CancelRideSuccess from "@/components/CancelRideSuccess";
import { RideCardDriver } from "@/components/RideCardDriver";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { getTripsByUserRequest, deleteTripRequest } from "@/interconnection/trip";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../Context/auth-context";

export default function VerViajesAceptados() {
  const router = useRouter();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );
  const [requests, setRequests] = useState<Requests[]>([]);
  const [successVisible, setSuccessVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
    "exo.medium": require("@/assets/fonts/exo.medium.otf"),
    "Exo-SemiBold": require("@/assets/fonts/Exo-SemiBold.otf"),
    "Exo-Bold": require("@/assets/fonts/Exo-Bold.otf"),
    "Exo-Light": require("@/assets/fonts/Exo-Light.otf"),
    "Exo-Regular": require("@/assets/fonts/Exo-Regular.otf"),
  });

  interface Requests {
    id: number;
    users: number;
    userLimit: number;
    price: string;
    date: string;
    time: string;
    start: string;
    end: string;
  }

  const handleCancel = (requestId: number) => {
    setSelectedRequestId(requestId);
    setModalVisible(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedRequestId) {
      const result = await deleteTripRequest(selectedRequestId);
      if (result) {
        setRequests(prev => prev.filter(r => r.id !== selectedRequestId));
        setSuccessVisible(true);
      }
    }
    setModalVisible(false);
    setSelectedRequestId(null);
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
  };

  useEffect(() => {
    async function fetchTrips() {
      try {
        const trips = await getTripsByUserRequest(user._id, true, "Aprobado");
        if (trips) {
          const mappedRequests = trips.map((trip: any) => ({
            id: trip._id,
            users:
              trip.passengers?.filter((p: any) => p.status === "Aprobado")
                .length ?? 0,
            userLimit: 4,
            price: `₡${trip.costPerPerson}`,
            date: trip.departure.split("T")[0],
            time: trip.departure.split("T")[1]?.slice(0, 5),
            start: trip.startpoint?.name || "",
            end: trip.endpoint?.name || "",
          }));
          setRequests(mappedRequests);

          if (mappedRequests.length === 0) {
            router.replace("/(tabs)/ViajesConductor/sinProgramados");
          }
        } else {
          setRequests([]);
          router.replace("/(tabs)/ViajesConductor/sinProgramados");
        }
      } catch (error) {
        setRequests([]);
        router.replace("/(tabs)/ViajesConductor/sinProgramados");
      }
    }

    if (user?._id) {
      fetchTrips();
    }
  }, [user, router]);

  if (!fontsLoaded) return null;
  if (requests.length === 0) {
    return null;
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

      <View style={styles.overlay} />

      <Text style={styles.hitchhopText}>HitchHop</Text>

      <Text style={styles.title}>Viajes Programados</Text>

      <Box style={styles.buttonsContainer}>
        <Pressable style={styles.aprobadosButton}>
          <Text style={styles.buttonText}>Programados</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.replace("/(tabs)/ViajesConductor/verViajesPendientes")
          }
          style={styles.pendientesButton}
        >
          <Text style={styles.buttonText}>Por aprobar</Text>
        </Pressable>
      </Box>
      <CancelRideModal
        visible={modalVisible}
        onConfirm={handleConfirmCancel}
        onCancel={() => {
          setModalVisible(false);
          setSelectedRequestId(null);
        }}
      />
      <CancelRideSuccess
        visible={successVisible}
        onClose={handleCloseSuccess}
      />
      <ScrollView
        style={styles.cardsScroll}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
      >
        {requests.map((request) => (
          <RideCardDriver
            key={request.id}
            {...request}
            onCancel={() => handleCancel(request.id)}
            onDetails={() =>
              router.push({
                pathname: "/(tabs)/ViajesConductor/verDetallesViajeProgramado",
                params: { tripId: request.id },
              })
            }
          />
        ))}
      </ScrollView>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 1,
  },
  title: {
    position: "absolute",
    top: 140,
    left: 24,
    color: "#171717",
    fontSize: 25,
    fontFamily: "Exo-SemiBold",
    fontWeight: "600",
    textAlign: "left",
    zIndex: 2,
  },
  buttonsContainer: {
    position: "absolute",
    top: 180,
    left: 24,
    right: 24,
    flexDirection: "row",
    gap: 16,
    zIndex: 2,
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
    fontFamily: "exo.medium",
    fontWeight: "500",
  },
  cardsScroll: {
    position: "absolute",
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
});
