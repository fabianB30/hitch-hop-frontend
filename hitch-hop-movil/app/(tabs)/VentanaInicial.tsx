// app/index.tsx
import { Box } from "@/components/ui/box";
import { Image, TouchableOpacity } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Dimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { Svg, Text as SvgText } from "react-native-svg";
import { useRouter } from "expo-router";


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const imageHeight = windowHeight * 0.75;
const imageWidth = windowWidth + 22;
const titleSize = windowHeight * 0.067;

export default function VentanaIncial() {
  const router = useRouter();
  return (
    <Box style={{flex: 1, backgroundColor:"white"}}>
      <Box style={{alignItems:"center", position: "absolute", zIndex: 0, top: 0, left: 0, right: 0}}>
        <Image style={{position: "absolute",  height: imageHeight, width: imageWidth, top: 0, left: -11}}
          source={require("@/assets/images/fondo.png")}
          alt="HitchHop Fondo"
          resizeMode="contain"
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          top: windowHeight * 0.10,
          left: 0,
          right: 0,
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Svg height={titleSize+30} width={windowWidth}>
          <SvgText
            stroke="#8886D7"
            strokeWidth={3}
            fill="white"
            fontSize={titleSize}
            fontFamily="Montserrat_800ExtraBold"
            x={windowWidth / 2}
            y={titleSize}
            textAnchor="middle"
          >
            HitchHop
          </SvgText>
        </Svg>
      </Box>
      <Box style={{backgroundColor: "#fff",
                  position: "absolute",
                  zIndex: 1,
                  left: 0,
                  top: "65%",
                  borderRadius: 30,
                  width: windowWidth}}>
        <VStack  style={{alignContent: "center"}}>
          <Text style={{color: "black",
                        marginTop: 52,
                        marginLeft: 23,
                        width: 263, height: 50,
                        fontFamily: "Exo_700Bold",
                        fontSize: windowWidth*0.09,
                        lineHeight: windowWidth*0.09 + 2}}>
            Bienvenido (a)
          </Text>

          <Text style={{textAlign:"left",
                        color:"black",
                        marginTop:15,
                        marginLeft: 27,
                        width: 314,
                        height: 81,
                        fontFamily: "Exo_500Medium",
                        fontSize: windowWidth*0.053,
                        lineHeight: windowWidth*0.053 + 6}}>
            Regístrese para poder disfrutar de sus viajes a un salto de distancia
          </Text>

          <HStack space="md" style={{justifyContent:"center", gap: 13, marginTop: 20}}>
            <TouchableOpacity
                    style={{borderColor: "#7875F8", borderWidth: 2, width: windowWidth*0.4, height: 48, borderRadius: 8, alignItems: "center", justifyContent: "center"}}
                    onPress={() => router.push("/InicioSesion/login")}>
              <Text style={{color:"#7875F8", fontFamily: "Exo_500Medium", fontSize: windowWidth*0.042, lineHeight: windowHeight*0.055}}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor:"#7875F8", width: windowWidth*0.4, height: windowHeight*0.055, borderRadius: 8, alignItems: "center", justifyContent: "center"}}
              onPress={() => router.push("/Register/register")}>
              <Text style={{color:"white", fontFamily: "Exo_500Medium", fontSize: windowWidth*0.042, lineHeight: windowHeight*0.055}}>
                Registrarse
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
