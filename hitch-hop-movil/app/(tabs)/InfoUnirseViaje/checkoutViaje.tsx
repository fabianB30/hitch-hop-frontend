import { StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import HitchHopHeader from "@/components/shared/HitchHopHeader"
import RideStopDetail from '@/components/RideStopDetail'
import RideStopDetailIcon from '@/components/RideStopDetailIcon'
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Users } from 'lucide-react-native'
import { HStack} from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'

const wh = Dimensions.get("window").height

const checkoutViaje = () => {
    const router = useRouter()

    const { rideInfo } = useLocalSearchParams()
    const { additionalInfo } = useLocalSearchParams()
    const { selectedStop } = useLocalSearchParams()
    let parsedData
    let additionalParsed
    let parsedStop
  
    if (typeof rideInfo === 'string') {
      parsedData = JSON.parse(rideInfo)
    } else {
      parsedData = null
    }
    if (typeof additionalInfo === 'string') {
      additionalParsed = JSON.parse(additionalInfo)
    } else {
      additionalParsed = null
    }
  
    if (!parsedData || !additionalParsed) {
      return <Text style={{marginVertical: 'auto'}}>Error: Ride information is missing or invalid.</Text>
    }

    if (typeof selectedStop === 'string') {
      if (selectedStop == '0') {
        parsedStop = additionalParsed.start
      } else {
        parsedStop = additionalParsed.stops[parseInt(selectedStop) - 1]
      }
    } else {
      parsedStop = null
    }
  
    if (!parsedStop) {
      return <Text style={{marginVertical: 'auto'}}>Error: No selected stop or param is invalid.</Text>
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
              source={additionalParsed.avatar}
              style={styles.profilePic}
            />
            
            <View>
              <Text style={styles.carInfo}>{additionalParsed.carBrand + " " + additionalParsed.carModel + " " + additionalParsed.carColor}</Text>
              <Text style={styles.driverInfo}>{parsedData.driver}</Text>
            </View>
          </HStack>

          <View style={styles.rideDetails}>
            <Text style={{ color: '#171717'}}>{additionalParsed.date}</Text>
            <Text style={{ color: '#171717'}}>{additionalParsed.time}</Text>
          </View>

          <ScrollView style={[styles.stops, {gap: 10}]} showsVerticalScrollIndicator={false}>
            <View style={styles.verticalLine} />
            <RideStopDetail stopType="Partida" detail={additionalParsed.start} isAtEnd={true}/>
            <RideStopDetailIcon stopType="Parada de recogida" detail={parsedStop} isAtEnd={false}/>
            <RideStopDetail stopType="Destino" detail={additionalParsed.end} isAtEnd={true}/>
          </ScrollView>

          <HStack style={{marginTop: 20}}>
            <View style={styles.rideDetails}>
              <HStack style={{gap: 4}}>
                <Users size={16} color='black' />
                <Text style={{ color: '#171717'}}>{parsedData.passengers.length}</Text>
              </HStack>
              <Text style={{ color: '#171717'}}>&#8353;{parsedData.costPerPerson}</Text>
            </View>

            <Button style={styles.button}>
              <ButtonText style={styles.buttonText}>Unirse</ButtonText>
            </Button>
          </HStack>
          {/* End of Card View */}
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
    maxHeight: wh * 0.6
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
    top: 20,
    bottom: 20,
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

export default checkoutViaje