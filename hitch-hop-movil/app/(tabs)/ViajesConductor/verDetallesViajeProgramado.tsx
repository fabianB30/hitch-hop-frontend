import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";
import { PassengerCard } from "@/components/PassengerCard";
import { HStack } from "@/components/ui/hstack";
import { MoveRight, Users } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { useFonts } from "expo-font";

export default function VerDetallesViajeProgramado() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Montserrat-ExtraBold': require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
    'exo.medium': require('@/assets/fonts/exo.medium.otf'),
    'Exo-SemiBold': require('@/assets/fonts/Exo-SemiBold.otf'),
    'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
    'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
  });
  if (!fontsLoaded) return null;

  // boolean if ride is full
  var isFull = false;

  //Esto no funciona, la página recibe parámetros para crear las cards
  const handlePendingRequests = () => {
    router.push("/(tabs)/ViajesConductor/verSolicitudesPendientes");
  };

  const passengers = [
    {
      id: 1,
      name: "Robert Schumann",
      price: "₡1500",
      phone: "8888-8888",
      location: "INS, San José Av. 7.",
    },

    {
      id: 2,
      name: "Johannes Brahms",
      price: "₡1500",
      phone: "8888-8888",
      location: "INS, San José Av. 7.",
    },

    {
      id: 3,
      name: "Jan Sibelius",
      price: "₡1500",
      phone: "8888-8888",
      location: "INS, San José Av. 7. Calle 2",
    },
  ];

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
                  fontFamily: 'Exo-Regular',
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#171717",
                  textAlign: "right",
                  marginLeft: 2,
                }}
              >
                3/4
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
                Tecnológico de Costa Rica, San José Av. 9.
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
                  fontFamily: 'Exo-SemiBold',
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#171717",
                  textAlign: "left",
                }}
              >
                Tecnológico de Costa Rica, Cartago
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
                zIndex: 10,
                alignSelf: "center",
              }}
            >
              <ButtonText style={styles.buttonText}>Cancelar</ButtonText>
            </Button>
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
    position: 'absolute',
    top: 30,
    right: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#000',
    zIndex: 10,
  },
  title: {
    left: 25,
    color: "#171717",
    fontSize: 20,
    fontFamily: 'Exo-SemiBold',
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
    fontSize: 16,
    fontFamily: 'Exo-Regular',
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
    fontFamily: 'Exo-SemiBold',
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
