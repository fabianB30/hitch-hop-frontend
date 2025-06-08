import { StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import HitchHopHeader from "@/components/shared/HitchHopHeader"
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Users } from 'lucide-react-native'
import { HStack} from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { Radio, RadioGroup, RadioIndicator, RadioLabel } from '@/components/ui/radio'

const wh = Dimensions.get("window").height

const seleccionRecogida = () => {
  const router = useRouter()

  const [selectedStop, setStop] = useState("0")
  const { rideInfo } = useLocalSearchParams()
  const { additionalInfo } = useLocalSearchParams()
  let parsedData
  let additionalParsed

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

  const stops = additionalParsed.stops
  stops.splice(0, 0, additionalParsed.start)
  
  return (
    <SafeAreaView style={{flex: 1, marginBottom: 50}}>
        <HitchHopHeader />

        <ImageBackground
            source={require("@/assets/images/buttonCardBackground.png")}
            style={styles.container}
            imageStyle={styles.containerImage}
        >
          <Text style={styles.title}>Seleccione una parada</Text>

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

            <ScrollView style={styles.stops} showsVerticalScrollIndicator={false}>
              <RadioGroup value={selectedStop} onChange={setStop}>
                {stops.map((stop: string, index: number) => {
                  return (
                    <Radio value={index.toString()} key={index}>
                      <RadioIndicator 
                        style={{
                          backgroundColor: selectedStop === index.toString() ? '#7875F8' : 'white',
                          borderWidth: 2,
                          borderColor: selectedStop === index.toString() ? '#7875F8' : 'gray'
                        }}
                      />
                      <RadioLabel style={styles.radioText} numberOfLines={1} ellipsizeMode="tail">{stop}</RadioLabel>
                    </Radio>
                  )
                })}
              </RadioGroup>
            </ScrollView>

            <HStack style={{marginTop: 20}}>
              <View style={styles.rideDetails}>
                <HStack style={{gap: 4}}>
                  <Users size={16} color='black' />
                  <Text style={{ color: '#171717'}}>{parsedData.passengers.length}</Text>
                </HStack>
                <Text style={{ color: '#171717'}}>&#8353;{parsedData.costPerPerson}</Text>
              </View>
            </HStack>
            {/* End of Card View */}
          </View>

          <View style={styles.buttons}>
            <Button style={[styles.button, styles.confirmButton]}
              onPress={() => {router.push({
                pathname: "/(tabs)/InfoUnirseViaje/checkoutViaje",
                params: {
                  rideInfo: rideInfo,
                  additionalInfo: additionalInfo,
                  selectedStop: selectedStop
                }
              })}}
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
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
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
    fontFamily: 'Exo',
    fontSize: 24,
    fontWeight: 'semibold',
  },
  confirmText: {
    color: '#FEFEFF'
  },
  cancelText: {
    color: '#7875F8'
  },
  radioText: {
    fontFamily: 'Exo',
    fontSize: 16,
    fontWeight: 'normal',
    flex: 1
  }
})

export default seleccionRecogida