import { StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import HitchHopHeader from "@/components/shared/HitchHopHeader"
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Users } from 'lucide-react-native'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { Radio, RadioGroup, RadioIndicator, RadioLabel } from '@/components/ui/radio'
import * as Font from 'expo-font';

/**
 * This page allows the user to select a pickup point for their trip.
 * It displays all available stops, including the starting point, allowing the user to choose where they will board the vehicle.
 * 
 * This page was worked on by:
 *   Rubén Hurtado
 *   Andrey Calvo
 */

const wh = Dimensions.get("window").height

const selectPickupPoint = () => {
  const router = useRouter()

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedStop, setStop] = useState("0")
  const [stopsList, setStopsList] = useState<string[]>([])
  const params = useLocalSearchParams()

  const trip = JSON.parse(params.trip as string)

  const vehicleInformation = JSON.parse(params.additionalInfo as string)

  useEffect(() => {
    /**
     * This effect initializes the stop list and loads required fonts on component mount.
     * It combines the trip's starting point and all additional stops into a single list of available pickup points.
     */
    const stopList = [
      ...trip.stopPlaces.map((stop: any) => ({
        _id: stop._id,
        name: stop.name
      }))
    ]
    setStopsList(stopList)

    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-Medium': require('@/assets/fonts/exo.medium.otf'),
      'Exo-Semibold': require('@/assets/fonts/Exo-SemiBold.otf'),
      'Exo_Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <HitchHopHeader />

      <ImageBackground
        source={require("@/assets/images/buttonCardBackground.png")}
        style={styles.container}
        imageStyle={styles.containerImage}
      >
        <Text style={styles.title}>Seleccione una parada</Text>

        <View style={styles.card}>
          <HStack style={{ gap: 10 }}>
            <Image
              source={
                trip?.driver?.photoUrl
                  ? { uri: trip.driver.photoUrl }
                  : require('@/assets/images/iconPrimary.png')
              }
              style={styles.profilePic}
            />

            <View>
              <Text style={styles.carInfo}>
                {vehicleInformation?.brand && vehicleInformation?.model && vehicleInformation?.color
                  ? `${vehicleInformation.brand} ${vehicleInformation.model} ${vehicleInformation.color}`
                  : "Información del vehículo no disponible"}
              </Text>
              <Text style={styles.driverInfo}>{trip.driver.name}</Text>
            </View>
          </HStack>

          <View style={styles.rideDetails}>
            <Text style={[styles.detailText, { marginTop: 10 }]}>{new Date(trip.arrival).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
            <Text style={styles.detailText}>{new Date(trip.arrival).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>

          <ScrollView style={styles.stops} showsVerticalScrollIndicator={false}>
            <RadioGroup value={selectedStop} onChange={setStop}>
              {stopsList.map((stop: any, index: number) => {
                return (
                  <Radio style={{ marginBottom: 20 }} value={index.toString()} key={index}>
                    <RadioIndicator
                      style={{
                        backgroundColor: selectedStop === index.toString() ? '#7875F8' : 'white',
                        borderWidth: 2,
                        borderColor: selectedStop === index.toString() ? '#7875F8' : 'gray'
                      }}
                    />
                    <RadioLabel style={styles.radioText} numberOfLines={1} ellipsizeMode="tail">{stop.name}</RadioLabel>
                  </Radio>
                )
              })}
            </RadioGroup>
          </ScrollView>

          <HStack style={{ marginTop: 20 }}>
            <View style={styles.rideDetails}>
              <HStack style={{ gap: 4 }}>
                <Users strokeWidth={2.5} size={18} color='black' />
                <Text style={styles.detailText}>{trip.passengerLimit}</Text>
              </HStack>
              <Text style={styles.detailText}>{(trip.costPerPerson === 0) ? "Gratis" : <>&#8353; {trip.costPerPerson.toString()}</>}</Text>
            </View>
          </HStack>
          {/* End of Card View */}
        </View>

        <View style={styles.buttons}>
          <Button style={[styles.button, styles.confirmButton]}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/TripJoinInfo/checkoutTrip",
                params: {
                  trip: params.trip,
                  additionalInfo: params.additionalInfo,
                  stopList: JSON.stringify(stopsList),
                  selectedStop: JSON.stringify(selectedStop)
                }
              })
            }}
          >
            <ButtonText style={[styles.confirmText, styles.text]}>Confirmar</ButtonText>
          </Button>
          <Button style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <ButtonText style={[styles.cancelText, styles.text]}>Cancelar</ButtonText>
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 32,
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
    marginTop: 19,
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
    maxHeight: wh * 0.42
  },
  detailText: {
    color: '#000000',
    fontFamily: 'Exo-Medium',
    fontWeight: 500,
    fontSize: 18,
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
  title: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Exo_Bold',
    zIndex: 1,
    marginHorizontal: 'auto',
    marginTop: 15,
    textShadowColor: '#7875F8',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  stops: {
    marginTop: 15,
    marginLeft: 10,
  },
  buttons: {
    marginTop: 'auto',
    marginBottom: 30,
    gap: 15,
    alignContent: 'center',
  },
  button: {
    width: '100%',
    height: 52,
    borderRadius: 8
  },
  confirmButton: {
    backgroundColor: '#7875F8'
  },
  cancelButton: {
    backgroundColor: '#FBFBFB',
  },
  text: {
    fontFamily: 'Exo-SemiBold',
    fontSize: 24,
  },
  confirmText: {
    color: '#FEFEFF'
  },
  cancelText: {
    color: '#7875F8'
  },
  radioText: {
    fontFamily: 'Exo-Regular',
    fontSize: 16,
    fontWeight: 400,
    flex: 1
  }
})

export default selectPickupPoint