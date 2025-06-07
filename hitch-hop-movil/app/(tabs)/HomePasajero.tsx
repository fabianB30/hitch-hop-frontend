import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import * as Font from 'expo-font';

export default function HomePasajero() {
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
      <Text style={styles.logo}>HitchHop</Text>
      <Text style={styles.title}>¿Qué hará hoy?</Text>

      <View style={styles.firstCard}>
        <Text style={styles.firstCardText}>Buscar una</Text>
        <Text style={styles.firstCardText}>nueva ruta</Text>
      </View>
      <Image source={require('@/assets/images/search.png')} style={styles.firstCharacter} />

      <View style={styles.secondCard}>
        <Text style={styles.secondCardText}>Ver viajes</Text>
        <Text style={styles.secondCardText}>solicitados</Text>
      </View>
      <Image source={require('@/assets/images/viewtrips.png')} style={styles.secondCharacter} />
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
  logo: {
    position: 'absolute',
    top: 30,
    right: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#000'
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
  firstCard: {
    position: 'absolute',
    top: 210,
    left: 25.81,
    width: 342,
    height: 185,
    backgroundColor: 'rgba(120, 117, 248, 0.72)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 180
  },
  firstCardText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Exo-Medium'
  },
  firstCharacter: {
    position: 'absolute',
    top: 135,
    left: -39,
    width: 262,
    height: 262,
    resizeMode: 'contain'
  },
  secondCard: {
    position: 'absolute',
    top: 460,
    left: 25.81,
    width: 342,
    height: 185,
    backgroundColor: 'rgba(255, 171, 0, 0.6)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 25
  },
  secondCardText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Exo-Medium',
    paddingBottom: 10,
    maxWidth: 160,      
    textAlign: 'left'
  },
  secondCharacter: {
    position: 'absolute',
    top: 385,
    left: 133,
    width: 292,
    height: 292,
    resizeMode: 'contain'
  },
});
