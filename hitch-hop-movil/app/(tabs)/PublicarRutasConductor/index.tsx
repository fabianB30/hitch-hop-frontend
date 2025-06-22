import { Image } from "expo-image";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    const handleBackPress = () => {
        router.push("/(tabs)");
    };

    const handlePublicarRutaPress = () => {
        router.push("/(tabs)/PublicarRutasConductor/formPublicarRuta");
    };

    const handleVerRutasPress = () => {
        // Add navigation when ready
        // router.push("/(tabs)/PublicarRutasConductor/verRutasPublicadas");
    };

    return (
        <ImageBackground
            source={require("@/assets/images/fondo.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <Pressable onPress={handleBackPress} style={styles.backArrow}>
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
                <Pressable onPress={handlePublicarRutaPress}>
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
                                source={require("@/assets/images/conductorFlor.png")}
                                style={{ width: 220, height: 220, zIndex: 2 }}
                            />
                            <Text
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    textAlign: "center",
                                    color: "#FEFEFF",
                                    fontSize: 30,
                                    fontFamily: "Exo",
                                    fontWeight: "700",
                                    letterSpacing: 0.2,
                                    textShadowColor: "#6C63FF",
                                    textShadowOffset: { width: 1, height: 1 },
                                    textShadowRadius: 10,
                                    marginTop: 120,
                                    zIndex: 2,
                                }}
                            >
                                Publicar Ruta
                            </Text>
                        </ImageBackground>
                    </Box>
                </Pressable>

                {/* Card 2 */}
                <Pressable onPress={handleVerRutasPress}>
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
                                source={require("@/assets/images/conductorFlor.png")}
                                style={{ width: 220, height: 220, zIndex: 2 }}
                            />
                            <Text
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    textAlign: "center",
                                    color: "#FEFEFF",
                                    fontSize: 30,
                                    fontFamily: "Exo",
                                    fontWeight: "700",
                                    letterSpacing: 0.2,
                                    textShadowColor: "#6C63FF",
                                    textShadowOffset: { width: 1, height: 1 },
                                    textShadowRadius: 10,
                                    marginTop: 120,
                                    zIndex: 2,
                                }}
                            >
                                Ver Rutas Publicadas
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
    },
    backArrow: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
    },
    hitchhopText: {
        position: "absolute",
        top: 40,
        width: "100%",
        textAlign: "center",
        color: "#6C63FF",
        fontSize: 24,
        fontFamily: "Exo",
        fontWeight: "700",
        zIndex: 2,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255,255,255,0.4)",
        zIndex: 1,
    },
});