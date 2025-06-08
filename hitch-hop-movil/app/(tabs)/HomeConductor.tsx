import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import * as Font from 'expo-font';

export default function HomeConductor() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

        {/* Tarjeta: Publicar ruta */}
        <View style={styles.firstCard}>
          <Text style={styles.firstCardText}>Publicar una ruta</Text>
        </View>
        <Image source={require('@/assets/images/car.png')} style={styles.firstCharacter} />

        {/* Tarjeta: Ver viajes programados */}
        <View style={styles.secondCard}>
          <Text style={styles.secondCardText}>Ver viajes</Text>
          <Text style={styles.secondCardText}>programados</Text>
        </View>
        <Image source={require('@/assets/images/trips.png')} style={styles.secondCharacter} />

        <Text style={styles.sectionTitle2}>Pasajero</Text>

        {/* Tarjeta pasajero: Buscar nueva ruta */}
        <View style={styles.firstCard}>
          <Text style={styles.firstCardText}>Buscar una nueva ruta</Text>
        </View>
        <Image source={require('@/assets/images/search.png')} style={styles.thirdCharacter} />

        {/* Tarjeta pasajero: Ver viajes solicitados */}
        <View style={styles.finalCard}>
          <Text style={styles.secondCardText}>Ver viajes solicitados</Text>
        </View>
        <Image source={require('@/assets/images/viewtrips.png')} style={styles.fourthCharacter} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 393,
    height: 852,
    position: 'relative',
    backgroundColor: 'white'
  },
  backgroundImageStyle: {
    opacity: 0.15,
  },
  scrollContent: {
    paddingBottom: 100,
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
    fontWeight: 700,
    color: '#171717'
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
    marginBottom: 50,
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
    marginBottom: 30,
  },
  finalCard: {
    width: 342,
    height: 185,
    backgroundColor: 'rgba(255, 171, 0, 0.6)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 25,
    alignSelf: 'center',
    marginBottom: 50,
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
    top: 237.5,
    left: 17,
    width: 197,
    height: 193,
    resizeMode: 'contain'
  },
  secondCharacter: {
    position: 'absolute',
    top: 365,
    left: 180,
    width: 218,
    height: 277,
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }]
  },
  thirdCharacter: {
    position: 'absolute',
    top: 690,
    left: -39,
    width: 262,
    height: 262,
    resizeMode: 'contain'
  },
  fourthCharacter: {
    position: 'absolute',
    top: 920,
    left: 133,
    width: 292,
    height: 292,
    resizeMode: 'contain'
  },
});
