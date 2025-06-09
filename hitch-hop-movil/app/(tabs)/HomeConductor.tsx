import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, View, Text, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import {registerTripRequest} from '../../interconnection/trip';

export default function HomeConductor() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  const dataPrueba = {
    startpoint: "68462f9accc5871f7e93839b",  // Usando el mismo ID para prueba
    endpoint: "68462f9accc5871f7e93839b",
    departure: "2025-07-01T10:00:00.000Z",
    arrival: "2025-07-01T14:00:00.000Z",
    stops: [],
    passengers: [],
    driver: "68462f9accc5871f7e93839b",
    paymethod: "Gratuito",
    costPerPerson: 0,
  };

  useEffect(() => {
    Font.loadAsync({
      'Exo-Medium': require('@/assets/fonts/exo.medium.otf'),
      'Montserrat-ExtraBold': require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('@/assets/images/pattern-background-main.png')}
      style={styles.background}
      resizeMode="repeat"
      imageStyle={styles.backgroundImageStyle}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.logo}>HitchHop</Text>
        <Text style={styles.title}>¿Qué hará hoy?</Text>

        <Text style={styles.sectionTitle}>Conductor</Text>

        {/* Publicar ruta */}
        <View style={{ position: 'relative', alignItems: 'center', marginBottom: 50 }}>
          <View style={styles.firstCard}>
            <Text style={styles.firstCardText}>Publicar</Text>
            <Text style={styles.firstCardText}>una ruta</Text>
          </View>
          <Image source={require('@/assets/images/car.png')} style={styles.firstCharacter} />
          <Pressable
            onPress={() => { }}
            style={{
              position: 'absolute',
              top: 0,
              width: 342,
              height: 185,
              borderRadius: 30,
              zIndex: 10,
            }}
          >
            <View />
          </Pressable>
        </View>

        {/* Ver viajes programados */}
        <View style={{ position: 'relative', alignItems: 'center', marginBottom: 30, height: 185 }}>
          <View style={styles.secondCard}>
            <Text style={styles.secondCardText}>Ver viajes</Text>
            <Text style={styles.secondCardText}>programados</Text>
          </View>
          <Image source={require('@/assets/images/trips.png')} style={styles.secondCharacter} />
          <Pressable
            onPress={() => router.push('/ViajesConductor')}
            style={{
              position: 'absolute',
              top: 0,
              width: 342,
              height: 185,
              borderRadius: 30,
              zIndex: 10,
            }}
          >
            <View />
          </Pressable>
        </View>

        <Text style={styles.sectionTitle2}>Pasajero</Text>

        {/* Buscar nueva ruta */}
        <View style={{ position: 'relative', alignItems: 'center', marginBottom: 50 }}>
          <View style={styles.firstCard}>
            <Text style={styles.firstCardText}>Buscar una</Text>
            <Text style={styles.firstCardText}>nueva ruta</Text>
          </View>
          <Image source={require('@/assets/images/search.png')} style={styles.thirdCharacter} />
          <Pressable
            onPress={() => { }}
            style={{
              position: 'absolute',
              top: 0,
              width: 342,
              height: 185,
              borderRadius: 30,
              zIndex: 10,
            }}
          >
            <View />
          </Pressable>
        </View>

        {/* Ver viajes solicitados */}
        <View style={{ position: 'relative', alignItems: 'center', marginBottom: 50 }}>
          <View style={styles.finalCard}>
            <Text style={styles.secondCardText}>Ver viajes</Text>
            <Text style={styles.secondCardText}>solicitados</Text>
          </View>
          <Image source={require('@/assets/images/viewtrips.png')} style={styles.fourthCharacter} />
          <Pressable
            onPress={() => router.push('/ViajesPasajero')}
            style={{
              position: 'absolute',
              top: 0,
              width: 342,
              height: 185,
              borderRadius: 30,
              zIndex: 10,
            }}
          >
            <View />
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImageStyle: {
    opacity: 0.15,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  logo: {
    marginTop: 30,
    marginRight: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#000',
    alignSelf: 'flex-end',
  },
  title: {
    position: 'absolute',
    top: 80,
    left: 65,
    fontSize: 36,
    fontFamily: 'Exo-Medium',
    fontWeight: '700',
    color: '#171717',
  },
  sectionTitle: {
    fontSize: 36,
    fontFamily: 'Exo-Medium',
    fontWeight: '600',
    color: '#171717',
    marginTop: 80,
    marginLeft: 30,
    marginBottom: 30,
  },
  sectionTitle2: {
    fontSize: 36,
    fontFamily: 'Exo-Medium',
    fontWeight: '600',
    color: '#171717',
    marginLeft: 30,
    marginBottom: 50,
  },
  firstCard: {
    width: 342,
    height: 185,
    backgroundColor: 'rgba(120, 117, 248, 0.72)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 180,
    alignSelf: 'center',
  },
  firstCardText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Exo-Medium',
  },
  secondCard: {
    width: 342,
    height: 185,
    backgroundColor: 'rgba(255, 171, 0, 0.6)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 25,
    alignSelf: 'center',
  },
  finalCard: {
    width: 342,
    height: 185,
    backgroundColor: 'rgba(255, 171, 0, 0.6)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 25,
    alignSelf: 'center',
  },
  secondCardText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Exo-Medium',
    maxWidth: 190,
    textAlign: 'left',
  },
  firstCharacter: {
    position: 'absolute',
    top: 18,
    left: 12,
    width: 197,
    height: 193,
    resizeMode: 'contain',
  },
  secondCharacter: {
    position: 'absolute',
    top: -85,
    left: 180,
    width: 218,
    height: 277,
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }],
  },
  thirdCharacter: {
    position: 'absolute',
    top: -65,
    left: -39,
    width: 262,
    height: 262,
    resizeMode: 'contain',
  },
  fourthCharacter: {
    position: 'absolute',
    top: -80,
    left: 133,
    width: 292,
    height: 292,
    resizeMode: 'contain',
  },
});
