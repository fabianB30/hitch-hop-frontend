import { Box } from "@/components/ui/box";
import { Image } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Dimensions, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { StyleSheet } from 'react-native';
import { Icon } from "@/components/ui/icon";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getParameterByNameRequest } from "@/interconnection/paremeter";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth + 62;
const boxWidth = windowWidth * 0.72;
const boxHeight = windowHeight * 0.4;
const headerHeight = windowHeight * 0.15;

// const [tiposId, setTiposId] = useState<string[]>([]);

//  useEffect(() => {
//     async function fetchTiposId() {
//       try {
//         const param = await getParameterByNameRequest("Tipo de identificación");
//         if (param) {setTiposId(param.parameterList); console.log(param.parameterList);};
//       } catch (error) {
//         console.error("Error al obtener tipos de identificación:", error);
//       }
//     }
//     fetchTiposId();
//   }, []);

export default function GestionPerfil(){
  const router = useRouter();
    return(
<Box style={{ flex: 1, backgroundColor: "#fff" }}>
      <Box style={{height: 30}}/> 

      <Box style={styles.header}>
          <Box style={{position: "absolute", top: windowHeight*0.04, left: windowWidth*0.06}}>
            <Icon as={ChevronLeft} style={{width: 50, height: 50}}/>
          </Box>

          <Box style={styles.fotoPerfilFondo}>
            <Image
              source={require("@/assets/images/iconPrimary.png")}
              style={styles.iconPrimary}
            />
          </Box>

          <Box style={{flex: 1, top: 0, alignItems: "flex-end"}}>
            <Text style={styles.appTitulo}>
              HitchHop
            </Text>  
          </Box>
      </Box>

      <Box style={{flex: 1, top: 0, left: 0, zIndex: 1}}>
        <Image style={styles.fondo} source={require("@/assets/images/gestionPerfilFondo.png")} resizeMode="contain"/>
        <Box style={{marginTop: windowHeight*0.18, flex: 1, alignItems: "center"}}>
          <Image style={styles.boxTopIcon} source={require("@/assets/images/boxTopIcon.png")}/>
          <Box style={styles.boxHitch}>
            <VStack style={{gap: 20, alignItems: "center", marginTop: 40}}>
              <TouchableOpacity style={styles.buttonHitch} onPress={() => router.push("/ProfileSettings")}>
                <Text style={styles.buttonTextHitch}>Información personal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonHitch} onPress={() => router.push("/HistorialMain")}>
                <Text style={styles.buttonTextHitch}>Historial de actividad</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonHitch} onPress={() => router.replace("/VentanaInicial")}>
                <Text style={styles.buttonTextHitch}>Cerrar sesión</Text>
              </TouchableOpacity>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
    );
}

const styles = StyleSheet.create({
  buttonHitch: {
    width: boxWidth - 65,
    height: 55,
    backgroundColor: "#716EFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonTextHitch: {
    fontFamily: "Exo_600SemiBold",
    fontSize: 16,
    textAlign: "center",
    color: "white"
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
  fondo: {
    zIndex:0,
    position: "absolute",
    width: windowWidth+62,
    height: undefined,
    aspectRatio: 460/775,
    top: 0,
    left: -31
  },
  boxTopIcon: {
    width: 231,
    height: 231,
    position: "absolute",
    top: -136,
    zIndex: 3
  },
  iconPrimary: {
    left: -30.5,
    top: -10,
    width: 157,
    height: 157
  },
  header: {
    height: windowHeight*0.11,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 16,
    position: "relative",
    zIndex: 2
  },
  fotoPerfilFondo:{
    position: "absolute",
    left: windowWidth / 2 - 48,
    top: 20,
    width: 96,
    height: 96,
    alignContent: "center",
    backgroundColor: "#ECECFF",
    borderRadius: 9999,
    overflow: "hidden"
  },
  appTitulo:{
    fontSize: 24,
    height: 24,
    top: 0,
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000"
  }
});