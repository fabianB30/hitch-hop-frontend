import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";
import { RideCard } from "@/components/RideCard";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Users, Phone, Clock, MapPinCheck } from "lucide-react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";

export default function VerDetalleViajeProgramado() {
  const router = useRouter();

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
      <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 10 }}>
        <Box
          style={{
            justifyContent: "flex-start",
            marginLeft: 30,
            alignSelf: "stretch",
            marginTop: 150,
            paddingBottom: 50,
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
                marginRight: 20,
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
                <Text style={styles.title}>Adrian Zamora</Text>
                <Text style={styles.carData}>ABC-123</Text>
                <Text style={styles.carData}>Toyota Camry Blanco</Text>
              </VStack>
            </Box>
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginRight: 20,
              }}
            >
              <Users size={24} color="black" />
              <Text style={styles.capacity}>4</Text>
            </Box>
          </HStack>
          <HStack
            style={{
              justifyContent: "flex-end", // Align children to the right
              marginBottom: 24,
              alignItems: "flex-end",
              marginTop: 24,
              marginRight: 20,
              gap: 32, // Optional: space between the two elements
            }}
          >
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Phone size={24} color="black" />
              <Text style={styles.capacity}>9514-7485</Text>
            </Box>
            <Text style={styles.capacity}>Tarifa: ₡1500</Text>
          </HStack>
          <HStack
            style={{
              justifyContent: "flex-end", // Align children to the right
              marginBottom: 24,
              alignItems: "flex-end",
              marginTop: 10,
              marginRight: 20,
              gap: 32, // Optional: space between the two elements
            }}
          >
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Clock size={24} color="black" />
              <Text style={styles.capacity}>Sáb. 12 de Abr, 2025.</Text>
            </Box>
            <Text style={styles.capacity}>11:55 AM</Text>
          </HStack>
          <HStack
            style={{
              gap: 16,
              justifyContent: "space-between",
              marginBottom: 24,
              alignItems: "flex-start",
              marginTop: 24,
              marginRight: 30,
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
                Tecnológico de Costa Rica, San Jose, av. 9
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
                Tecnológico de Costa Rica, Cartago
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
            <Text style={styles.title}>Destino</Text>
          </Box>
          <Text style={styles.carData}>Alianza Francesa, San José Av. 7.</Text>

          <Box
            style={{
              width: 300,
              marginTop: 24,
              marginBottom: 12, // Slightly less to fit button closer
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
          >
            <ButtonText style={{ color: "#FEFEFF" }}>Cancelar</ButtonText>
          </Button>
        </Box>
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
    top: 44,
    right: 24,
    color: "black",
    fontSize: 20,
    fontFamily: "Montserrat",
    fontWeight: "800",
    textAlign: "right",
    zIndex: 3,
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
    fontWeight: "100",
    color: "#171717",
    textAlign: "left",
  },
  carData: {
    fontFamily: "Exo",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "100",
    color: "#171717",
    textAlign: "left",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1,
  },
});
