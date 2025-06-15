import React, { useEffect, useState } from "react";
import { ImageBackground, View, ScrollView, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";
import { RideCard } from "@/components/RideCard";
import CancelPopup from '@/components/cancelPopUp';
import CancelSuccessPopup from "@/components/CancelSuccessPopUp";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VerDetallesViajesAceptados() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [rideToCancel, setRideToCancel] = useState<number | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const insets = useSafeAreaInsets();

    const handleCancelPress = (rideId: number) => {
      setRideToCancel(rideId);
      setShowPopup(true);
    };
  
    const handleConfirmCancel = () => {
      // Pendiente la lógica para cancelar el viaje
      setShowPopup(false);
      setRideToCancel(null);
      // Debería ir un if para validar si se canceló correctamente
      setShowSuccessPopup(true);
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
  }

  const rides: Ride[] = [
    {
      id: 1,
      avatar: require("@/assets/images/avatar1.png"),
      name: "Adrián Zamora",
      car: "Toyota Camry",
      price: "₡1500",
      date: "11 de Abr, 2025.",
      time: "11:55 AM",
      start: "Alianza Francesa, San José Av. 7.",
      end: "Tecnológico de Costa Rica, Cartago.",
    },

    {
      id: 2,
      avatar: require("@/assets/images/avatar1.png"),
      name: "Juan Pérez",
      car: "Chevrolet Spark",
      price: "₡2000",
      date: "14 de Abr, 2025.",
      time: "11:50 AM",
      start: "INS, San José Av. 7.",
      end: "Tecnológico de Costa Rica, Cartago.",
    },
  ];

  useEffect(() => {
    if (rides.length == 0) {
      router.replace("/(tabs)/ViajesPasajero/sinViajes");
    }
  }, [rides, router]);

  if (rides.length === 0) {
    return null;
  }
  return (
    <ImageBackground
      source={require("@/assets/images/fondoDefault.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Pressable
        onPress={() => router.push("/(tabs)/ViajesPasajero")}
        style={styles.backArrow}
      >
        <Image
          source={require("@/assets/images/backArrow.png")}
          style={{ width: 30, height: 30 }}
        />
      </Pressable>

      <Text style={styles.hitchhopText}>HitchHop</Text>

      <Text style={styles.title}>Viajes Programados</Text>

      <View style={styles.overlay} />

      <Box style={styles.buttonsContainer}>
        <Pressable style={styles.aprobadosButton}>
          <Text style={styles.buttonText}>Aprobados</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/(tabs)/ViajesPasajero/viajesPendientes")}
          style={styles.pendientesButton}
        >
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
          <RideCard
            key={ride.id}
            {...ride}
            onCancel={() => handleCancelPress(ride.id)}
            onDetails={() => {
              router.push("/(tabs)/ViajesPasajero/verDetalleViajeProgramado");
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
    backgroundColor: 'rgba(255,255,255,0.8)', 
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
    zIndex: 2,
  },
  cardsContainer: {
    paddingBottom: 32,
    paddingTop: 8,
  },
});
