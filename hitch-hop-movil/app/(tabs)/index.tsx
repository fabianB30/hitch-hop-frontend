import { Image } from "expo-image";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/fondoDefault.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        source={require("@/assets/images/backArrow.png")}
        style={styles.backArrow}
      />

      <Text style={styles.hitchhopText}>HitchHop</Text>

      <View style={styles.overlay} />

      <Box
        style={{
          width: "100%",
          gap: 71,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 70,
          zIndex: 3,
        }}
      >
        <Pressable
          style={{ padding: 16, backgroundColor: "#007AFF", borderRadius: 8 }}
          onPress={() => router.push("/(tabs)/ViajesPasajero")}
        >
          <Text style={{ color: "#fff" }}>Ver viajes como pasajero</Text>
        </Pressable>
        <Pressable
          style={{ padding: 16, backgroundColor: "#007AFF", borderRadius: 8 }}
          onPress={() => router.push("/(tabs)/ViajesConductor")}
        >
          <Text style={{ color: "#fff" }}>Ver viajes como conductor</Text>
        </Pressable>
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
});
