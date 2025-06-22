import { Box } from "@/components/ui/box";
import { Image, TouchableOpacity } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Dimensions } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { StyleSheet } from 'react-native';
import { ClockIcon, Icon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { MapPin, Calendar} from "lucide-react-native"
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "./Context/auth-context";
import { User, getNotificationsByUserRequest } from "@/interconnection/user";

//Medidas de ancho y alto de la ventana para componentes
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const boxWidth = windowWidth * 0.72;
const boxHeight = windowHeight * 0.5;

type Notification = User["notifications"][number];

export default function NotificacionesConductor (){
    const { user } = useAuth() as {user: User | null};

    const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
    const userId = user?._id;

    // Conseguir notificaciones de usuario
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!userId) return;
            const result = await getNotificationsByUserRequest(userId);
            if (result) {
                setNotificaciones(result);
            } else {
                setNotificaciones([]);
            }
        };
        fetchNotifications();
    }, [userId]);

    // Formateo para la hora
    const formatHour = (tripDate: string) => {
        const date = new Date(tripDate);
        return date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit', timeZone: 'UTC'});
    };

    // Formateo para la fecha
    const formatFecha = (tripDate: string) => {
        const date = new Date(tripDate);
        const opcionesFecha: Intl.DateTimeFormatOptions = {
            weekday: "short",
            day: "2-digit",
            month: "long",
            year: "numeric"
        };

        let fecha = date.toLocaleDateString("es-CR",opcionesFecha);
        fecha = fecha.charAt(0).toUpperCase() + fecha.slice(1);
        if (!fecha.endsWith(".")) fecha += ".";
        return fecha;

    }


    const router = useRouter();

    return(
        //Fondo de ventana
        <Box style={{ flex: 1, backgroundColor: "#fff" }}>
            <Box style={styles.contenedorFondo}>
                <Image style={styles.fondo} source={require("@/assets/images/fondoNotificaciones.png")} resizeMode="cover"/>
            </Box>

            {/* Espacio para barra de notificaciones sin obstrucciones visuales */}
            <Box style={{height: 30}}/>  

            {/* Titulo HitchHop */}
            <Box style={styles.header}>
                <Box style={{flex: 1, top: 0, alignItems: "flex-end"}}>
                    <Text style={styles.appTitulo}>
                        HitchHop
                    </Text>  
                </Box>
            </Box>
            
            {/* Titulo de Notificaciones */}
            <Box style={{left: windowWidth*0.04, marginTop: 15}}>
                <Text style={styles.tituloNotif}>
                    Notificaciones
                </Text>
            </Box>

            {/* Cartas de las notificaciones */}
            <Box style={{width: windowWidth, height: windowHeight*0.86, alignContent: "center", alignItems: "center"}}>

                {/* Ver si hay o no hay notificaciones para mostrar */}
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
                // Contenedor scroll de las notificaciones
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 110}} horizontal={false} style={styles.scroll}>

                    {/* Contenedor vertical de las notificaciones */}
                    <VStack space="lg" style={styles.notifBox}>
                        
                        {/* Metodo para mostrar notificaciones */}
                        {notificaciones.map((notif) => {
                            return (
                            <Card key={notif.timestamp} variant="filled" style={styles.cards}>

                                    <Text style={styles.cardHeadFont}>
                                        {/* Titulo de notificacion segun tipo de notificacion */}
                                        {notif.type === "SP" ? "Solicitud pendiente" : "Viaje cancelado"}
                                    </Text>

                                {/* Diferente manera de mostrar si es solicitud pendiente o viaje cancelado */}
                                {notif.type === "SP" ? (
                                // Cuerpo de carta de solicitud pendiente
                                <>
                                    <HStack space="sm" style={styles.hstackStyle}>
                                        <Icon as={Calendar} size="md" />
                                        <Text size="sm" style={styles.lugarFechaFont}>
                                            {formatFecha(notif.tripDate || "")}
                                        </Text>
                                    </HStack>
                                    <HStack space="sm" style={styles.hstackStyle}>
                                        <Icon color="#404040" as={ClockIcon} size="md" />
                                        <Text size="sm" style={styles.horaFont}>
                                            {formatHour(notif.tripDate || "")}
                                        </Text>
                                    </HStack>
                                    <Box style={styles.spButtonBox}>
                                        <TouchableOpacity  style={styles.spButton} onPress={() => router.push("/(tabs)/ViajesConductor/verViajesPendientes")}>
                                            <Text style={styles.spButtonText}>Ver</Text>
                                        </TouchableOpacity>
                                    </Box>
                                </>
                                ) : (
                                // Cuerpo de carta de viaje cancelado
                                <>
                                    <HStack space="sm" style={styles.hstackStyle}>
                                        <Icon as={MapPin} size="md" />
                                        <Text size="sm" style={styles.lugarFechaFont}>
                                            {notif.place}
                                        </Text>
                                    </HStack>
                                    <HStack space="sm" style={styles.hstackStyle}>
                                        <Icon color="#404040" as={ClockIcon} size="md" />
                                        <Text size="sm" style={styles.horaFont}>
                                            {formatHour(notif.tripDate || "")}
                                        </Text>
                                    </HStack>
                                </>
                                )}
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

//Estilos utilizados para cada componente
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
        width: windowWidth*0.82,
        height: 107,
        backgroundColor: "#ECECFF",
        borderRadius: 8,
        position: "relative"
    },
    cardHeadFont: {
        height: 25,
        fontSize: 20,
        fontFamily: "Exo_700Bold",
        color: "black"
    },
    lugarFechaFont: {
        fontSize: 16,
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
        alignItems: "center",
        justifyContent: "center",
        height: windowWidth*0.064,
        width: 61
    },
    spButtonText: {
        width: windowWidth*0.04 + 9,
        fontFamily: "Exo_500Medium",
        fontSize: windowWidth*0.04,
        lineHeight: windowWidth*0.04,
        textAlign: "center",
        color: "white"
    },
    hstackStyle: {
        marginLeft: 6,
        alignContent: "center",
        marginTop: 8
    }
})