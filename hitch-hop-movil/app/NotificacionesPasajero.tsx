import { Box } from "@/components/ui/box";
import { Image } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Dimensions } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { StyleSheet } from 'react-native';
import { ClockIcon, Icon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { MapPin, Calendar, ChevronLeft, SignalZero, WindArrowDownIcon } from "lucide-react-native"
import { ScrollView } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const boxWidth = windowWidth * 0.72;
const boxHeight = windowHeight * 0.5;

const notificaciones: any[] = [
    {
        id: 0,
        tipo: "VA",
        lugar: "Estación del Pacífico",
        hora: "02:00pm"
    },
    {
        id: 1,
        tipo: "VC",
        lugar: "Estación del Pacífico",
        hora: "12:50pm"
    },
    {
        id: 2,
        tipo: "VA",
        lugar: "Estación del Pacífico",
        hora: "12:50pm"
    },
    {
        id: 3,
        tipo: "VA",
        lugar: "Estación del Pacífico",
        hora: "12:50pm"
    },
    {
        id: 4,
        tipo: "VC",
        lugar: "Estación del Pacífico",
        hora: "12:50pm"
    },
    {
        id: 5,
        tipo: "VC",
        lugar: "Estación del Pacífico",
        hora: "12:50pm"
    },
    {
        id: 6,
        tipo: "VA",
        lugar: "Estación del Pacífico",
        hora: "12:50pm"
    },
    {
        id: 7,
        tipo: "VC",
        lugar: "Estación del Pacífico",
        hora: "12:50pm"
    },
    {
        id: 8,
        tipo: "VC",
        lugar: "Estación del Pacífico",
        hora: "12:50pm"
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
                    <Icon as={ChevronLeft} style={{width: 50, height: 50}}/>
                </Box>
    
                <Box style={{flex: 1, top: 0, alignItems: "flex-end"}}>
                    <Text style={styles.appTitulo}>
                        HitchHop
                    </Text>  
                </Box>
            </Box>
            
            <Box style={{left: windowWidth*0.04, marginTop: 15}}>
                <Text style={styles.tituloNotif}>
                    Notificaciones
                </Text>
            </Box>
            <Box style={{width: windowWidth, height: windowHeight*0.86, alignContent: "center", alignItems: "center"}}>
                {notificaciones.length === 0 ? (
                    <Box style={styles.noNotifs}>
                        <Image source={require("@/assets/images/noNotificaciones.png")} style={styles.imagenNoNotis} resizeMode="contain"/>
                        <Text style={{textAlign: "center", fontFamily: "Exo_600SemiBold", fontSize: 24, height: 24, marginTop: 12, color: "black"}}>
                            ¡No hay notificaciones!
                        </Text>
                        <Text style={{textAlign: "center", fontFamily: "Exo_500Medium", fontSize: 18, height: 18, marginTop: 12, color: "black"}}>
                            Las notificaciones aparecen aquí.
                        </Text>
                    </Box>
                ) : (
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 40}} horizontal={false} style={styles.scroll}>
                    <VStack space="lg" style={styles.notifBox}>
                        
                        {notificaciones.map((notif) => {
                            return (
                                <Card key={notif.id} variant="filled" style={styles.cards}>
                                    <Text style={styles.cardHeadFont}>
                                        {notif.tipo === "VA" ? "Viaje aprobado" : "Viaje cancelado"}
                                    </Text>

                                    <HStack space="sm" style={styles.hstackStyle}>
                                        <Icon as={MapPin} size="md" />
                                        <Text size="sm" style={styles.lugarFechaFont}>
                                            {notif.lugar}
                                        </Text>
                                    </HStack>
                                    <HStack space="sm" style={styles.hstackStyle}>
                                        <Icon color="#404040" as={ClockIcon} size="md" />
                                        <Text size="sm" style={styles.horaFont}>
                                            {notif.hora}
                                        </Text>
                                    </HStack>
                                </Card>
                            );
                        })}
                    </VStack>
                </ScrollView>
                )}
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
    imagenNoNotis: {
        height: windowHeight*0.3,
        transform: [{ scale: 2.6 }, { translateX: 0 }, { translateY: -10 }]
    },
    noNotifs: {
        flex: 1,
        position: "fixed",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 28
    },
    scroll: {
        marginTop: 28
    },
    notifBox: {
        justifyContent: "center",
        alignItems: "center"
    },
    cards: {
        width: 345,
        height: 107,
        backgroundColor: "#ECECFF",
        borderRadius: 8,
        position: "relative"
    },
    cardHeadSize: {
    },
    cardHeadFont: {
        height: 22,
        fontSize: 24,
        fontFamily: "Exo_700Bold",
        color: "black"
    },
    lugarFechaFont: {
        fontSize: 18,
        fontFamily: "Exo_500Medium",
        color: "#404040",
        top: 2
    },
    horaFont: {
        fontSize: 14,
        fontFamily: "Exo_500Medium",
        color: "#404040",
        top: 2
    },
    spButtonBox: {
        justifyContent: "flex-end",
        flexDirection: "row",
        alignContent: "center",
        position: "absolute",
        right: 15,
        bottom: 15,
        height: 27,
        width: "auto"
    },
    spButton: {
        backgroundColor: "#7875F8",
        borderRadius: 8,
        height: 27,
        width: 61
    },
    spButtonText: {
        width: 29,
        fontFamily: "Exo_500Medium",
        fontSize: 20,
        color: "white"
    },
    hstackStyle: {
        marginLeft: 6,
        alignContent: "center",
        marginTop: 8
    }
})