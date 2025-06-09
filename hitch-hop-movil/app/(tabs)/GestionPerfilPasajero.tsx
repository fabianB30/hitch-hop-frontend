import { Box } from "@/components/ui/box";
import { Image } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Dimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { StyleSheet } from 'react-native';
import { Icon } from "@/components/ui/icon";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth + 62;
const boxWidth = windowWidth * 0.72;
const boxHeight = windowHeight * 0.4;
const headerHeight = windowHeight * 0.15;

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
        <Box style={{marginTop: windowHeight*0.20, flex: 1, alignItems: "center"}}>
          <Image style={styles.boxTopIcon} source={require("@/assets/images/boxTopIcon.png")}/>
          <Box style={styles.boxHitch}>
            <VStack space="4xl" style={{alignItems: "center", marginTop: 60}}>
              <Button style={styles.buttonHitch} onPress={() => router.push("/ProfileSettings")}>
                <ButtonText style={styles.buttonTextHitch}>Información personal</ButtonText>
              </Button>
              <Button style={styles.buttonHitch} onPress={() => router.push("/home")}>
                <ButtonText style={styles.buttonTextHitch}>Historial de actividad</ButtonText>
              </Button>
              <Button style={styles.buttonHitch} onPress={() => router.push("/VentanaInicial")}>
                <ButtonText style={styles.buttonTextHitch}>Cerrar sesión</ButtonText>
              </Button>
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
    height: 48,
    backgroundColor: "#716EFF",
    borderRadius: 8,
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