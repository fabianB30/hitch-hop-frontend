import { Box } from "@/components/ui/box";
import { Image } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Dimensions } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Platform, StyleSheet } from 'react-native';
import { Heading } from "@/components/ui/heading";
import { ClockIcon, Icon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { MapPin } from "lucide-react-native"

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth + 62;
const boxWidth = windowWidth * 0.72;
const boxHeight = windowHeight * 0.5;
const headerHeight = windowHeight * 0.15;

const notificaciones = [
    {
        id: 0,
        tipo: "SP",
        fecha: "01/04/2004",
        hora: "00:11:30HH"
    },
    {
        id: 1,
        tipo: "VC",
        lugar: "Estación del Pacífico",
        hora: "00:12:30HH"
    }
]

export default function NotificacionesConductor (){
    return(
        <Box style={{ flex: 1, backgroundColor: "#fff" }}>
            <Box style={styles.contenedorFondo}>
                <Image style={styles.fondo} source={require("@/assets/images/fondoNotificaciones.png")} resizeMode="cover"/>
            </Box>
        
            <Box style={{height: 30}}/>  {/* Espacio de barra de notificaciones */}

            <Box style={styles.header}>
                <Box style={{position: "absolute", top: windowHeight*0.04, left: windowWidth*0.08}}>
                    <Image source={require("@/assets/images/backArrow.png")} style={styles.backArrow}/>
                </Box>
    
                <Box style={{flex: 1, top: 0, alignItems: "flex-end"}}>
                    <Text style={styles.appTitulo}>
                        HitchHop
                    </Text>  
                </Box>
            </Box>
            
            <Box>
                <Box style={{left: windowWidth*0.04, marginTop: 15}}>
                    <Text style={styles.tituloNotif}>
                        Notificaciones
                    </Text>
                </Box>
                <VStack space="lg" style={styles.notifBox}>
                    <Card size="sm" variant="filled" style={styles.cards}>
                        <Heading style={styles.cardHeadSize}>
                            <Text style={styles.cardHeadFont}>
                                Viaje cancelado
                            </Text>
                        </Heading>
                        <HStack space="sm" style={{marginLeft: 6, alignContent: "center", marginBottom: 10}}>
                            <Icon color="#404040" as={MapPin} size="md"/>
                            <Text size="sm" style={styles.lugarFont}>
                                Estación del Pacífico
                            </Text>
                        </HStack>
                        <HStack space="sm" style={{marginLeft: 6, alignContent: "center"}}>
                            <Icon color="#404040" as={ClockIcon} size="md"/>
                            <Text size="sm" style={styles.horaFont}>
                                11:55am
                            </Text>
                        </HStack>
                    </Card>
                    <Card size="sm" variant="filled" style={styles.cards}>
                        <Heading style={styles.cardHeadSize}>
                            <Text style={styles.cardHeadFont}>
                                Solicitud pendiente
                            </Text>
                        </Heading>
                        <HStack space="sm" style={{marginLeft: 6, alignContent: "center"}}>
                            <Icon as={ClockIcon} size="md"/>
                            <Text size="sm" style={styles.lugarFont}>
                                Estación del Pacífico
                            </Text>
                        </HStack>
                    </Card>
                    <Card size="sm" variant="filled" style={styles.cards}>
                        <Heading style={styles.cardHeadSize}>
                            <Text style={styles.cardHeadFont}>
                                Viaje cancelado
                            </Text>
                        </Heading>
                        <HStack space="sm" style={{marginLeft: 6, alignContent: "center"}}>
                            <Icon as={ClockIcon} size="md"/>
                            <Text size="sm" style={styles.lugarFont}>
                                Estación del Pacífico
                            </Text>
                        </HStack>
                    </Card>
                    <Card size="sm" variant="filled" style={styles.cards}>
                        <Heading style={styles.cardHeadSize}>
                            <Text style={styles.cardHeadFont}>
                                Viaje cancelado
                            </Text>
                        </Heading>
                        <HStack space="sm" style={{marginLeft: 6, alignContent: "center"}}>
                            <Icon as={ClockIcon} size="md"/>
                            <Text size="sm" style={styles.lugarFont}>
                                Estación del Pacífico
                            </Text>
                        </HStack>
                    </Card>
                </VStack>
            </Box>
        </Box>
    )
}

const styles = StyleSheet.create({
    header: {
        height: windowHeight*0.11,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 16,
        position: "relative",
        zIndex: 2
    },
    backArrow: {
        width: 30,
        height: 30
    },
    buttonTextHitch: {
        fontFamily: "Exo_600SemiBold",
        fontSize: 17
    },
    boxHitch: {
        backgroundColor: "#A49DFF",
        borderRadius: 30,
        padding: 20,
        justifyContent: "center",
        width: boxWidth,
        height: boxHeight,
        zIndex: 2
    },
    appTitulo:{
        fontSize: 24,
        height: 24,
        top: 0,
        fontFamily: "Montserrat_800ExtraBold",
        color: "#000"
    },
    contenedorFondo: {
        position: "absolute",
        top: 0,
        left: 0,
        width: windowWidth,
        height: windowHeight,
        zIndex: 0, 
    },
    fondo: {
        width: windowWidth,
        height: windowHeight,
        transform: [{ scale: 2.5 }, { translateX: 50 }, { translateY: -80 }],
        opacity: 0.3
    },
    tituloNotif: {
        fontSize: 20,
        fontFamily: "Exo_600SemiBold",
        color: "black"
    },
    notifBox: {
        marginTop: 28,
        justifyContent: "center",
        alignItems: "center"
    },
    cards: {
        width: 336,
        height: 107,
        backgroundColor: "#ECECFF",
        borderRadius: 8
    },
    cardHeadSize: {
        height: 25
    },
    cardHeadFont: {
        fontSize: 24,
        fontFamily: "Exo_700Bold",
        color: "black"
    },
    lugarFont: {
        fontSize: 18,
        fontFamily: "Exo_500Medium",
        color: "#404040"
    },
    horaFont: {
        fontSize: 14,
        fontFamily: "Exo_500Medium",
        color: "#404040"
    }
})