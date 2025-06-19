import { StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import HitchHopHeader from "@/components/shared/HitchHopHeader"
import RideStopDetail from '@/components/RideStopDetail'
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Users } from 'lucide-react-native'
import { HStack} from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { useLocalSearchParams } from 'expo-router';
import { getBrandVehicleRequest } from '@/interconnection/vehicle'
import * as Font from 'expo-font';

const wh = Dimensions.get("window").height

const tripInformation = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [vehicleInformation, setVehicleInformation] = useState<any>({})

  const router = useRouter()
  
  const params = useLocalSearchParams();
  const trip = JSON.parse(params.trip as string);

  /*
  if (Object.keys(rideInfo).length == 0 || Object.keys(additionalInfo).length == 0) {
    return <Text style={{marginVertical:'auto'}}>Error: Couldn't not load data.</Text>
  }
*/
  useEffect(() => {
      async function fetchVehicleInformation() {
          const data = await getBrandVehicleRequest(trip.vehicle);
          
          if (data){
              setVehicleInformation(data);
          }
      }
      fetchVehicleInformation()

      Font.loadAsync({
        'Exo-Light': require('@/assets/fonts/Exo-Light.otf'),
        'Exo-Medium': require('@/assets/fonts/exo.medium.otf'),
        'Exo-Semibold': require('@/assets/fonts/Exo-SemiBold.otf'),
        'Exo_Bold': require('@/assets/fonts/Exo-Bold.otf'),
      }).then(() => setFontsLoaded(true));
  }, [])

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <HitchHopHeader />

      <ImageBackground
        source={require("@/assets/images/buttonCardBackground.png")}
        style={styles.container}
        imageStyle={styles.containerImage}
      >
        <View style={styles.card}>
          <HStack style={{gap: 10}}>
            <Image 
              source={{uri: trip.driver.photoUrl}}
              style={styles.profilePic}
            />
            
            <View>
              <Text style={styles.carInfo}>{vehicleInformation.brand + " " + vehicleInformation.model + " " + vehicleInformation.color}</Text>
              <Text style={styles.driverInfo}>{trip.driver.name}</Text>
            </View>
          </HStack>

          <View style={styles.rideDetails}>
            <Text style={[styles.detailText, {marginTop: 10}]}>{new Date(trip.arrival).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit', timeZone: 'UTC' })}</Text>
            <Text style={styles.detailText}>{new Date(trip.arrival).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}</Text>
          </View>

          <ScrollView style={[styles.stops, {gap: 10}]} showsVerticalScrollIndicator={false}>
            <View style={styles.verticalLine} />
            <RideStopDetail stopType="Partida" detail={trip.startpoint.name} isAtEnd={true}/>
            {trip.stopPlaces.length > 0 && trip.stopPlaces.map((stop: any, index: any) => <RideStopDetail key={index} stopType="Parada" detail={stop.name} isAtEnd={false}/>)}
            <RideStopDetail stopType="Destino" detail={trip.endpoint.name} isAtEnd={true}/>
          </ScrollView>

          <HStack style={{marginTop: 20}}>
            <View style={styles.rideDetails}>
              <HStack style={{gap: 4}}>
                <Users strokeWidth={2.5} size={18} color='black' />
                <Text style={styles.detailText}>{trip.passengerLimit}</Text>
              </HStack>
              <Text style={styles.detailText}>{(trip.costPerPerson === 0) ? "Gratis" : <>&#8353; {trip.costPerPerson.toString()}</>}</Text>
            </View>

            <Button style={styles.button}
              onPress={() => {router.push({
                pathname: "/(tabs)/TripJoinInfo/selectPickupPoint",
                params: {
                  trip: params.trip,
                  additionalInfo: JSON.stringify(vehicleInformation)
                }
              })}}
            >
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
    fontWeight: 300,
    fontFamily: 'Exo-Light',
    color: '#171717', 
  },
  driverInfo: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: 'Exo-Bold',
    color: '#171717',
  },
  rideDetails: {
    marginLeft: 10,
  },
  stops: {
    marginTop: 5,
  },
  detailText: {
    color: '#000000',
    fontFamily: 'Exo-Medium',
    fontWeight: 500,
    fontSize: 18,
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
    fontFamily: 'Exo-Medium',
    fontSize: 16,
  }
})

export default tripInformation