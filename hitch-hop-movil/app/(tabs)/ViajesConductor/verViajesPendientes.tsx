import { CancelRideModal } from "@/components/cancelRide";
import CancelRideSuccess from "@/components/CancelRideSuccess";
import { RideCardDriver2 } from "@/components/RideCardDriver2";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
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
import {
  deleteTripRequest,
  getTripsByUserRequest,
} from "../../../interconnection/trip";
import { useAuth } from "../Context/auth-context";

export default function VerViajesPendientes() {
  const { user } = useAuth();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );
  const [successVisible, setSuccessVisible] = useState(false);
  const [requests, setRequests] = useState<Requests[]>([]);
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
    "exo.medium": require("@/assets/fonts/exo.medium.otf"),
    "Exo-SemiBold": require("@/assets/fonts/Exo-SemiBold.otf"),
    "Exo-Bold": require("@/assets/fonts/Exo-Bold.otf"),
    "Exo-Light": require("@/assets/fonts/Exo-Light.otf"),
    "Exo-Regular": require("@/assets/fonts/Exo-Regular.otf"),
  });

  type PendingRequestCard = {
    id: number;
    name: string;
    price: string;
    location: string;
    time: string;
  };

  interface Requests {
    id: number;
    users: PendingRequestCard[];
    userLimit: number;
    actualPassengerNumber: number;
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
        setRequests((prev) => prev.filter((r) => r.id !== selectedRequestId));
        if (requests.length !== 0) {
          setSuccessVisible(true);
        } else {
          router.replace("/(tabs)/ViajesConductor/sinProgramados");
        }
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
        const trips = await getTripsByUserRequest(user._id, true, "all");
        if (trips) {
          const mappedRequests: Requests[] = trips.map((trip: any) => {
            // Solo pasajeros pendientes
            const pendingPassengers =
              trip.passengers
                ?.filter((p: any) => p.status === "Pendiente")
                .map((p: any) => ({
                  id: p.user._id,
                  name: p.user.name,
                  price: `₡${trip.costPerPerson}`,
                  location: trip.startpoint?.name || "",
                  time: trip.departure.split("T")[1]?.slice(0, 5) || "",
                })) ?? [];

            return {
              id: trip._id,
              users: pendingPassengers,
              userLimit: trip.passengerLimit,
              actualPassengerNumber: pendingPassengers.length,
              price: `₡${trip.costPerPerson}`,
              date: trip.departure.split("T")[0],
              time: trip.departure.split("T")[1]?.slice(0, 5),
              start: trip.startpoint?.name || "",
              end: trip.endpoint?.name || "",
            };
          });

          const now = new Date();
          const filteredRequests = mappedRequests.filter((req) => {
            const tripDateTime = new Date(`${req.date}T${req.time}`);
            return tripDateTime.getTime() >= now.getTime();
          });

          filteredRequests.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA.getTime() - dateB.getTime();
          });

          setRequests(filteredRequests);

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
        <Pressable
          onPress={() =>
            router.replace("/(tabs)/ViajesConductor/verViajesAceptados")
          }
          style={styles.aprobadosButton}
        >
          <Text style={styles.buttonText}>Programados</Text>
        </Pressable>
        <Pressable style={styles.pendientesButton}>
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
          <RideCardDriver2
            key={request.id}
            {...request}
            onCancel={() => handleCancel(request.id)}
            onDetails={(users) => {
              if (!users || users.length === 0) return;
              router.push({
                pathname: "/(tabs)/ViajesConductor/verSolicitudesPendientes",
                params: {
                  users: JSON.stringify(users),
                  userLimit: String(request.userLimit),
                  actualPassengerNumber: String(request.actualPassengerNumber),
                  tripIdParam: String(request.id),
                  startParam: request.start,
                  endParam: request.end,
                },
              });
            }}
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
    backgroundColor: "#ADA7FF",
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
    backgroundColor: "#7875F8",
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
