import { Image } from 'expo-image';
import { ImageBackground, Platform, StyleSheet, Text } from 'react-native';
import { Box } from "@/components/ui/box"; 
import { Pressable } from "@/components/ui/pressable";

export default function Index() {
  return (
    <ImageBackground
      source={require('@/assets/images/fondoDefault.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        source={require('@/assets/images/backArrow.png')}
        style={styles.backArrow}
      />

      <Text style={styles.hitchhopText}>HitchHop</Text>

      <Box
        style={{ width: '100%', gap: 71, flexDirection: 'column', alignItems: "center", justifyContent: "flex-start", marginTop: 70 }}
      >
        {/* Card 1 */}
        <Pressable onPress={() => { console.log('Card 1 Pressed'); }}>
          <Box
            style={{
              height: 240,
              width: 340,
              maxWidth: '90%',
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: '#B8B7FB',
              alignSelf: "center"
            }}
          >
            <ImageBackground
              source={require('@/assets/images/buttonCardBackground.png')}
              style={{
                flex: 1,
                alignItems: 'center',
              }}
              imageStyle={{
                borderRadius: 8,
                width: '260%',   
                height: '260%',
                alignSelf: 'center',
              }}
              resizeMode="cover"
            >
              <Image
                source={require('@/assets/images/image18.png')}
                style={{ width: 220, height: 220 }} 
              />
              <Text
                style={{
                  position: 'absolute',
                  width: '100%',
                  textAlign: 'center',
                  color: '#FEFEFF',
                  fontSize: 30,
                  fontFamily: 'Exo',
                  fontWeight: '700',
                  letterSpacing: 0.2,
                  textShadowColor: 'rgba(0,0,0,0.2)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                  marginTop: 120,
                }}
              >
                Viajes Programados Aprobados
              </Text>
            </ImageBackground>
          </Box>
         </Pressable> 

        {/* Card 2 */}
        <Pressable onPress={() => { console.log('Card 2 Pressed'); }}>
          <Box
            style={{
              height: 240,
              width: 340,
              maxWidth: '90%',
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: '#B8B7FB',
              alignSelf: "center"
            }}
          >
            <ImageBackground
              source={require('@/assets/images/buttonCardBackground.png')}
              style={{
                flex: 1,
                alignItems: 'center',
              }}
              imageStyle={{
                borderRadius: 8,
                width: '260%',   
                height: '260%',
                alignSelf: 'center',
              }}
              resizeMode="cover"
            >
              <Image
                source={require('@/assets/images/image19.png')}
                style={{ width: 260, height: 260, marginTop: -20 }}
                contentFit="contain" 
              />
              <Text
                style={{
                  position: 'absolute',
                  width: '100%',
                  textAlign: 'center',
                  color: '#FEFEFF',
                  fontSize: 30,
                  fontFamily: 'Exo',
                  fontWeight: '700',
                  letterSpacing: 0.2,
                  textShadowColor: 'rgba(0,0,0,0.2)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                  marginTop: 120,
                }}
              >
                Viajes Pendientes de Aprobación
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backArrow: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 30,
    height: 30,
    zIndex: 11,
  },
  hitchhopText: {
    position: 'absolute',
    top: 40,
    right: 24,
    color: 'black',
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: '800',
    textAlign: 'right',
    zIndex: 10,
  }
});
