import { StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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

const checkoutViaje = () => {
    const router = useRouter()

    const [imageHeight, setImageHeight] = useState(0)

    const { rideInfo } = useLocalSearchParams()
    const { selectedStop } = useLocalSearchParams()
    let parsedData
  
    if (typeof rideInfo === 'string') {
      parsedData = JSON.parse(rideInfo)
    } else {
      parsedData = null
    }
  
    if (!parsedData) {
      return <Text style={{marginVertical: 'auto'}}>Error: Ride information is missing or invalid.</Text>
    }

    let parsedStop
    if (typeof selectedStop === 'string') {
      if (selectedStop == '0') {
        parsedStop = parsedData.startingPoint
      } else {
        parsedStop = parsedData.stops[parseInt(selectedStop) - 1]
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
        onLayout={(e) => {setImageHeight(e.nativeEvent.layout.height)}}
      >
        <View style={[styles.card, {maxHeight: imageHeight * 0.6}]}>
          <HStack style={{gap: 10}}>
            <Image 
              source={parsedData.avatar}
              style={styles.profilePic}
            />
            
            <View>
              <Text style={styles.carInfo}>{parsedData.carModel}</Text>
              <Text style={styles.driverInfo}>{parsedData.driver}</Text>
            </View>
          </HStack>

          <View style={styles.rideDetails}>
            <Text style={{ color: '#171717'}}>{parsedData.date}</Text>
            <Text style={{ color: '#171717'}}>{parsedData.time}</Text>
          </View>

          <ScrollView style={[styles.stops, {gap: 10}]} showsVerticalScrollIndicator={false}>
            <View style={styles.verticalLine} />
            <RideStopDetail stopType="Partida" detail={parsedData.startingPoint} isAtEnd={true}/>
            <RideStopDetailIcon stopType="Parada de recogida" detail={parsedStop} isAtEnd={false}/>
            <RideStopDetail stopType="Destino" detail={parsedData.finishPoint} isAtEnd={true}/>
          </ScrollView>

          <HStack style={{marginTop: 20}}>
            <View style={styles.rideDetails}>
              <HStack style={{gap: 4}}>
                <Users size={16} color='black' />
                <Text style={{ color: '#171717'}}>{parsedData.capacity}</Text>
              </HStack>
              <Text style={{ color: '#171717'}}>&#8353;{parsedData.price}</Text>
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
    left: 11.5,
    top: 12,
    bottom: 30,
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