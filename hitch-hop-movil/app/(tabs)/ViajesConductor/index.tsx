import { Image } from "expo-image";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Font from 'expo-font';

export default function Index() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({   
      'Montserrat-ExtraBold': require('@/assets/fonts/Montserrat-ExtraBold.ttf'),      
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);
      
  if (!fontsLoaded) return null;

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
          width: "100%",
          gap: 71,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 70,
          zIndex: 3,
        }}
      >
        {/* Card 1 */}
        <Pressable
          onPress={() =>
            router.push("/(tabs)/ViajesConductor/verViajesAceptados")
          }
        >
          <Box
            style={{
              height: 240,
              width: 340,
              maxWidth: "90%",
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "#B8B7FB",
              alignSelf: "center",
            }}
          >
            <ImageBackground
              source={require("@/assets/images/buttonCardBackground.png")}
              style={{
                flex: 1,
                alignItems: "center",
              }}
              imageStyle={{
                borderRadius: 8,
                width: "260%",
                height: "260%",
                alignSelf: "center",
              }}
              resizeMode="cover"
            >
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: "rgba(255,255,255,0.4)",
                  borderRadius: 8,
                  zIndex: 1,
                }}
              />
              <Image
                source={require("@/assets/images/image18.png")}
                style={{ width: 220, height: 220, zIndex: 2 }}
              />
              <Text
                style={{
                  position: "absolute",
                  width: "100%",
                  textAlign: "center",
                  color: "#FEFEFF",
                  fontSize: 30,
                  fontFamily: 'Exo-Bold',
                  fontWeight: "700",
                  letterSpacing: 0.2,
                  textShadowColor: "#6C63FF",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 10,
                  marginTop: 120,
                  zIndex: 2,
                }}
              >
                Viajes Programados Aprobados
              </Text>
            </ImageBackground>
          </Box>
        </Pressable>

        {/* Card 2 */}
        <Pressable
          onPress={() => router.push('/(tabs)/ViajesConductor/verViajesPendientes')}
        >
          <Box
            style={{
              height: 240,
              width: 340,
              maxWidth: "90%",
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "#B8B7FB",
              alignSelf: "center",
            }}
          >
            <ImageBackground
              source={require("@/assets/images/buttonCardBackground.png")}
              style={{
                flex: 1,
                alignItems: "center",
              }}
              imageStyle={{
                borderRadius: 8,
                width: "260%",
                height: "260%",
                alignSelf: "center",
              }}
              resizeMode="cover"
            >
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: "rgba(255,255,255,0.4)",
                  borderRadius: 8,
                  zIndex: 1,
                }}
              />
              <Image
                source={require("@/assets/images/image19.png")}
                style={{ width: 260, height: 260, marginTop: -20, zIndex: 2 }}
                contentFit="contain"
              />
              <Text
                style={{
                  position: "absolute",
                  width: "100%",
                  textAlign: "center",
                  color: "#FEFEFF",
                  fontSize: 30,
                  fontFamily: 'Exo-Bold',
                  fontWeight: "700",
                  letterSpacing: 0.2,
                  textShadowColor: "#6C63FF",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 10,
                  marginTop: 120,
                  zIndex: 2,
                }}
              >
                Pasajeros Pendientes de Aprobación
              </Text>
            </ImageBackground>
          </Box>
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
    position: 'absolute',
    top: 30,
    right: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#000',
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 1,
  },
});
// default home screen at the root of the stack
