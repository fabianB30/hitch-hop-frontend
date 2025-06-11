import { ImageBackground, View, ScrollView, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";
import { RideCardDriver } from "@/components/RideCardDriver";
import { useEffect, useState } from "react";
import { CancelRideModal } from "@/components/cancelRide";
import CancelRideSuccess from "@/components/CancelRideSuccess";

export default function VerViajesAceptados() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [successVisible, setSuccessVisible] = useState(false);

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

  const requests: Requests[] = [
    {
      id: 1,
      users: 2,
      userLimit: 4,
      price: "₡1500",
      date: "11 de Abr, 2025.",
      time: "11:55 AM",
      start: "Alianza Francesa, San José Av. 7.",
      end: "Tecnológico de Costa Rica, Cartago.",
    },

    {
      id: 2,
      users: 3,
      userLimit: 4,
      price: "₡2000",
      date: "14 de Abr, 2025.",
      time: "11:50 AM",
      start: "INS, San José Av. 7.",
      end: "Tecnológico de Costa Rica, Cartago.",
    },
  ];

  const handleCancel = (requestId: number) => {
    setSelectedRequestId(requestId);
    setModalVisible(true);
  };

  const handleConfirmCancel = () => {
    // Lógica para cancelar el viaje con selectedRequestId
    setModalVisible(false);
    setSelectedRequestId(null);
    setSuccessVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
  };

  useEffect(() => {
    if (requests.length == 0) {
      router.replace("/(tabs)/ViajesConductor/sinProgramados");
    }
  }, [requests, router]);
  
  if (requests.length === 0) {
    return null;
  }

  return (
    <ImageBackground
      source={require("@/assets/images/fondoDefault.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Pressable
        onPress={() => router.push("/(tabs)/ViajesConductor")}
        style={styles.backArrow}
      >
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
        <Pressable onPress={() => router.push('/(tabs)/ViajesConductor/verViajesPendientes')} style={styles.pendientesButton}>
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
              router.push("/(tabs)/ViajesConductor/verDetallesViajeProgramado")
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
    top: 40,
    right: 24,
    color: "black",
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: "800",
    textAlign: "right",
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
    fontFamily: "Exo",
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
    zIndex: 2,
  },
  cardsContainer: {
    paddingBottom: 32,
    paddingTop: 8,
  },
});
