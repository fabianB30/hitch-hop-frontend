// app/index.tsx
import { Box } from "@/components/ui/box";
import { Image } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Dimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { Svg, Text as SvgText } from "react-native-svg";


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const imageHeight = windowHeight * 0.75;
const imageWidth = windowWidth + 22;
const titleSize = windowHeight * 0.067;

export default function VentanaIncial() {
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
                  top: "60%",
                  borderRadius: 30,
                  width: windowWidth}}>
        <VStack  style={{alignContent: "center"}}>
          <Text style={{color: "black",
                        marginTop: 52,
                        marginLeft: 23,
                        width: 263, height: 50,
                        fontFamily: "Exo_700Bold",
                        fontSize: 32, lineHeight: 30}}>
            Bienvenido (a)
          </Text>

          <Text style={{textAlign:"left",
                        color:"black",
                        marginLeft: 27,
                        width: 314,
                        height: 81,
                        fontFamily: "Exo_500Medium",
                        fontSize: 22,
                        lineHeight: 30}}>
            Regístrese para poder disfrutar de sus viajes a un salto de distancia
          </Text>

          <HStack space="md" style={{justifyContent:"center", gap: 13, marginTop: 35}}>
            <Button variant="outline" action="secondary"
                    style={{borderColor: "#7875F8", width: 164, height: 48, borderRadius: 8}}>
              <ButtonText style={{color:"#7875F8", fontFamily: "Exo_500Medium", fontWeight: 500, fontSize: 18}}>
                Iniciar sesión
              </ButtonText>
            </Button>
            <Button variant="solid" action="primary"
              style={{backgroundColor:"#7875F8", width: 164, height: 48, borderRadius: 8}}>
              <ButtonText style={{fontFamily: "Exo_500Medium", fontWeight: 500, fontSize: 18}}>
                Registrarse
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
