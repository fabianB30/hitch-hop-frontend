import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RideCard } from "@/components/RideCard";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Users, Phone, Clock, MapPinCheck } from "lucide-react-native";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CancelPopup from "@/components/cancelPopUp";
import React, { useEffect, useState } from "react";
import { getTripByIdRequest } from "../../../interconnection/trip";

export default function VerDetalleViajeProgramado() {
  const router = useRouter();
  const { rideId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [showPopup, setShowPopup] = useState(false);
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    async function fetchTrip() {
      if (!rideId) return;
      const data = await getTripByIdRequest(rideId);
      if (data) setTrip(data);
    }
    fetchTrip();
  }, [rideId]);

  if (!trip) return null;

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
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ zIndex: 10 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
      >
        <Box
          style={{
            justifyContent: "flex-start",
            paddingHorizontal: 24,
            marginTop: 130,
            marginBottom: 50,
            zIndex: 10,
          }}
        >
          <Box
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text style={styles.title}>Detalles de Viaje Programado</Text>
          </Box>
          <HStack
            style={{
              gap: 16,
              justifyContent: "space-between",
              marginBottom: 24,
              alignItems: "stretch",
              marginTop: 24,
            }}
          >
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Avatar size="xl">
                <AvatarImage source={require("@/assets/images/image17.png")} />
              </Avatar>
              <VStack
                style={{
                  gap: 4,
                  justifyContent: "center",
                }}
              >
                <Text style={styles.title}>{trip?.driver?.name || "Conductor"} {trip?.driver?.firstSurname || ""}</Text>
                <Text style={styles.carData}>ABC-123</Text>
                <Text style={styles.carData}>Toyota Camry - Blanco</Text>
              </VStack>
            </Box>
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Users size={24} color="black" />
              <Text style={styles.capacity}>{trip?.passengerLimit ?? 4}</Text>
            </Box>
          </HStack>
          <VStack style={{ gap: 20, marginBottom: 24, marginTop: 10 }}>

          <HStack style={{ alignItems: "center" }}>
            <Box style={{ width: 32, alignItems: "center" }}>
              <Phone size={24} color="black" />
            </Box>
            <Text style={[styles.capacity, { marginLeft: 8, flex: 1 }]}>{trip?.driver?.phone || "No disponible"}</Text>
            <Text style={styles.capacity}>Tarifa: ₡{trip?.costPerPerson ?? "0"}</Text>
          </HStack>

          <HStack style={{ alignItems: "center" }}>
            <Box style={{ width: 32, alignItems: "center" }}>
              <Clock size={24} color="black" />
            </Box>
            <Text style={[styles.capacity, { marginLeft: 8, flex: 1 }]}>{trip ? trip.departure.split("T")[0] : ""}</Text>
            <Text style={styles.capacity}>{trip ? trip.departure.split("T")[1]?.slice(0,5) : ""}</Text>
          </HStack>
        </VStack>
          <Divider className="my-0.5" />
          <HStack
            style={{
              gap: 16,
              justifyContent: "space-between",
              marginBottom: 24,
              alignItems: "flex-start",
              marginTop: 24,
            }}
          >
            <VStack
              style={{
                gap: 4,
                justifyContent: "center",
                flex: 1,
                maxWidth: "50%",
              }}
            >
              <Text style={styles.title}>Partida</Text>
              <Text style={styles.carData}>
                {trip?.startpoint?.name || ""}
              </Text>
            </VStack>
            <VStack
              style={{
                gap: 4,
                justifyContent: "center",
                flex: 1,
                maxWidth: "50%",
              }}
            >
              <Text style={styles.title}>Destino</Text>
              <Text style={styles.carData}>
                {trip?.endpoint?.name || ""}
              </Text>
            </VStack>
          </HStack>

          <Box
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginTop: 35,
            }}
          >
            <MapPinCheck size={24} color="black" />
            <Text style={styles.title}>Punto de Inicio</Text>
          </Box>
          {/* Hay que cambiar esto probablemente, pero no hay manera de ver cual es el punto de partida del usuario*/}
          <Text style={styles.carData}>Alianza Francesa, San José Av. 7.</Text>

          <Box
            style={{
              width: 300,
              marginTop: 24,
              marginBottom: 12, 
            }}
          >
            <Image
              source={require("@/assets/images/MapaRepresentacion.png")}
              style={{ width: 320, height: 180, borderRadius: 16 }}
              resizeMode="cover"
            />
          </Box>
          <Button
            size="md"
            variant="solid"
            action="primary"
            style={{
              backgroundColor: "#F87171",
              width: 320,
              marginTop: 0,
            }}
            onPress={() => setShowPopup(true)}
          >
            <ButtonText style={{ color: "#FEFEFF" }}>Cancelar</ButtonText>
          </Button>
        </Box>
      </ScrollView>
      <CancelPopup
        visible={showPopup}
        onCancel={() => setShowPopup(false)}
        onConfirm={() => {
          setShowPopup(false);
          router.back();
        }}
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
    position: 'absolute',
    top: 30,
    right: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#000',
    zIndex: 10,
  },
  title: {
    fontFamily: "Exo",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
    color: "#171717",
    textAlign: "left",
    zIndex: 3,
  },
  capacity: {
    fontFamily: "Exo",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
    color: "#171717",
    textAlign: "left",
  },
  carData: {
    fontFamily: "Exo",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "300",
    color: "#171717",
    textAlign: "left",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
});
