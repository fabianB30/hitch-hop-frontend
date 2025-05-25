import { StyleSheet, Image, View, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import HitchHopHeader from "@/components/shared/HitchHopHeader"
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Users } from 'lucide-react-native'
import { HStack} from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { Radio, RadioGroup, RadioIndicator, RadioLabel } from '@/components/ui/radio'

const seleccionRecogida = () => {
  const router = useRouter()

  const [scrollHeight, setScrollHeight] = useState(0)
  const [cardY, setCardY] = useState<number | null>(null)
  const [buttonY, setButtonY] = useState<number | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number | null>(null)
  const [detailHeight, setDetailHeight] = useState<number | null>(null)
  const [footerHeight, setFooterHeight] = useState<number | null>(null)
  const layoutTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const calculateScrollHeigth = () => {
    if (cardY != null && buttonY != null && headerHeight != null && detailHeight != null && footerHeight != null) {
      const availableHeight = buttonY - cardY - 50
      const usedSpace = headerHeight + detailHeight + footerHeight + 50
      const scrollSpace = availableHeight - usedSpace
      setScrollHeight(scrollSpace > 0 ? scrollSpace : 0)
    }
  }

  const scheduleLayoutCalculation = () => {
    if (layoutTimeout.current) {
      clearTimeout(layoutTimeout.current)
    }

    layoutTimeout.current = setTimeout(() => {
      if (cardY != null && buttonY != null && headerHeight != null && detailHeight != null && footerHeight != null) {
        calculateScrollHeigth()
      }
    }, 50)
  }

  useEffect(() => {
    return () => {
      if (layoutTimeout.current) {
        clearTimeout(layoutTimeout.current)
      }
    }
  }, [])

  const [selectedStop, setStop] = useState("")
  const { rideInfo } = useLocalSearchParams()
  let parsedData

  if (typeof rideInfo === 'string') {
    parsedData = JSON.parse(rideInfo)
  } else {
    parsedData = null
  }

  if (!parsedData) {
    return <Text style={{marginVertical: 'auto'}}>Error: Ride information is missing or invalid.</Text>
  }

  const stops = parsedData.stops
  stops.splice(0, 0, parsedData.startingPoint)
  
  return (
    <SafeAreaView style={{flex: 1, marginBottom: 50}}>
        <HitchHopHeader />

        <ImageBackground
            source={require("@/assets/images/buttonCardBackground.png")}
            style={styles.container}
            imageStyle={styles.containerImage}
        >
          <Text style={styles.title}>Seleccione una parada</Text>

          <View style={styles.card} onLayout={(e) => {setCardY(e.nativeEvent.layout.y); scheduleLayoutCalculation()}}>
            <HStack style={{gap: 10}} onLayout={(e) => {setHeaderHeight(e.nativeEvent.layout.height); scheduleLayoutCalculation()}}>
              <Image 
                source={parsedData.avatar}
                style={styles.profilePic}
              />

              <View>
                <Text style={styles.carInfo}>{parsedData.carModel}</Text>
                <Text style={styles.driverInfo}>{parsedData.driver}</Text>
              </View>
            </HStack>

            <View style={styles.rideDetails} onLayout={(e) => {setDetailHeight(e.nativeEvent.layout.height); scheduleLayoutCalculation()}}>
              <Text style={{ color: '#171717'}}>{parsedData.date}</Text>
              <Text style={{ color: '#171717'}}>{parsedData.time}</Text>
            </View>

            <ScrollView style={[styles.stops, {height: scrollHeight}]} showsVerticalScrollIndicator={false}>
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

            <HStack style={{marginTop: 20}} onLayout={(e) => {setFooterHeight(e.nativeEvent.layout.height); scheduleLayoutCalculation()}}>
              <View style={styles.rideDetails}>
                <HStack style={{gap: 4}}>
                  <Users size={16} color='black' />
                  <Text style={{ color: '#171717'}}>{parsedData.capacity}</Text>
                </HStack>
                <Text style={{ color: '#171717'}}>&#8353;{parsedData.price}</Text>
              </View>
            </HStack>
            {/* End of Card View */}
          </View>

          <View style={styles.buttons} onLayout={(e) => {setButtonY(e.nativeEvent.layout.y); scheduleLayoutCalculation()}}>
            <Button style={[styles.button, styles.confirmButton]}

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