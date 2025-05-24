import {ImageBackground, StyleSheet, Text, ScrollView, Dimensions, View, Image } from 'react-native';
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from 'expo-router';

export default function sinViajes() {

  const router = useRouter();
  const { width } = Dimensions.get('window');

   return (
    <ImageBackground
      source={require('@/assets/images/fondoDefault.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <Pressable
        onPress={() => router.push('/(tabs)')}
        style={styles.backArrow}
      >
        <Image
          source={require('@/assets/images/backArrow.png')}
          style={{ width: 30, height: 30 }}
        />
      </Pressable>
      
      <Text style={styles.hitchhopText}>HitchHop</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image
            source={require('@/assets/images/image9.png')}
            style={{ width: width * 1, height: width * 0.7,  marginBottom: 20 }} 
            resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>¡No se encontraron viajes solicitados!</Text>
          <Text style={styles.subtitle}>¡Encuentre su próximo viaje con nosotros!</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => console.log('Buscar Viajes')}
        >
          <Text style={styles.buttonText}>Buscar Viajes</Text>
        </Pressable>
      </ScrollView>
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)', 
    zIndex: 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
    paddingBottom: 40,
    width: '100%',
    zIndex: 1,
  },
  textContainer: {
    width: 361,
    alignItems: 'center',
    gap: 15,
    marginBottom: 60,
    zIndex: 3,
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontFamily: 'Exo',
    fontWeight: '600',
  },
  subtitle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontFamily: 'Exo',
    fontWeight: '500',
  },
  button: {
    width: 141,
    height: 36,
    backgroundColor: '#7875F8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FEFEFF',
    fontSize: 20,
    fontFamily: 'Exo',
    fontWeight: '500',
  },
});