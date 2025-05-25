import { StyleSheet, Image, View, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import HitchHopHeader from "@/components/shared/HitchHopHeader"
import RideStopDetail from '@/components/RideStopDetail'
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Users } from 'lucide-react-native'
import { HStack} from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'

const informacionViaje = () => {

  const router = useRouter()

  const rideInfo = {
    carModel: "Toyota Camry Blanco",
    driver: "Adrián Zamora",
    avatar: require("@/assets/images/avatar1.png"),
    date: "11/4/25",
    time: "11:55 AM",
    startingPoint: "Tecnológico de Costa Rica, San José Av. 9.",
    finishPoint: "Tecnológico de Costa Rica, Cartago",
    stops: ["Barrio Otoya, San José, Calle 15", "Universidad de Costa Rica, San Pedro"],
    capacity: 4,
    price: 1500
  }

  return (
    <SafeAreaView style={{flex: 1, marginBottom: 50}}>
      <HitchHopHeader />

      <ImageBackground
        source={require("@/assets/images/buttonCardBackground.png")}
        style={styles.container}
        imageStyle={styles.containerImage}
      >
        <View style={styles.card}>
          <HStack style={{gap: 10}}>
            <Image 
              source={rideInfo.avatar}
              style={styles.profilePic}
            />
            
            <View>
              <Text style={styles.carInfo}>{rideInfo.carModel}</Text>
              <Text style={styles.driverInfo}>{rideInfo.driver}</Text>
            </View>
          </HStack>

          <View style={styles.rideDetails}>
            <Text style={{ color: '#171717'}}>{rideInfo.date}</Text>
            <Text style={{ color: '#171717'}}>{rideInfo.time}</Text>
          </View>

          <ScrollView style={styles.stops} showsVerticalScrollIndicator={false}>
            <View style={styles.verticalLine} />
            <RideStopDetail stopType="Partida" detail={rideInfo.startingPoint} isAtEnd={true}/>
            {rideInfo.stops.map((stop, index) => <RideStopDetail key={index} stopType="Parada" detail={stop} isAtEnd={false}/>)}
            <RideStopDetail stopType="Destino" detail={rideInfo.finishPoint} isAtEnd={true}/>
          </ScrollView>

          <HStack style={{marginTop: 20}}>
            <View style={styles.rideDetails}>
              <HStack style={{gap: 4}}>
                <Users size={16} color='#171717' />
                <Text style={{ color: '#171717'}}>{rideInfo.capacity}</Text>
              </HStack>
              <Text style={{ color: '#171717'}}>&#8353;{rideInfo.price}</Text>
            </View>

            <Button style={styles.button}
              onPress={() => {router.push("/(tabs)/UnirseViaje/seleccionRecogida")}}
            >
              <ButtonText style={styles.buttonText}>Unirse</ButtonText>
            </Button>
          </HStack>
          {/* End of Card View*/}
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    backgroundColor: 'white',
  },
  containerImage: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  card: {
    marginVertical: 'auto',
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
  },
  profilePic: {
    width: 72,
    height: 72,
    borderRadius: 50
  },
  carInfo: {
    fontSize: 14,
    fontWeight: 'light',
    fontFamily: 'Exo',
    color: '#171717', 
  },
  driverInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: '#171717',
  },
  rideDetails: {
    marginLeft: 10,
  },
  stops: {
    marginTop: 5,
    maxHeight: 250,
  },
  verticalLine: {
    position: 'absolute',
    left: 11.57,
    top: 12,
    bottom: 32,
    width: 1,
    backgroundColor: '#171717',
  },
  button: {
    borderRadius: 8,
    marginLeft: 'auto',
    marginRight: 21,
    marginBottom: 20,
    height: 33,
    width: 106,
    backgroundColor: '#7875F8',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Exo',
    fontSize: 16,
    fontWeight: 'normal'
  }
})

export default informacionViaje