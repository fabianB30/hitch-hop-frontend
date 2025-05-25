import { StyleSheet, Image, View, ScrollView, ImageSourcePropType } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import HitchHopHeader from "@/components/shared/HitchHopHeader"
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Users } from 'lucide-react-native'
import { HStack} from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'

type StopProps = {
    carModel: string,
    driver: string,
    avatar: ImageSourcePropType,
    date: string,
    time: string,
    startingPoint: string,
    finishPoint: string,
    stops: string[],
    capacity: number,
    price: number
}

const seleccionRecogida = (props: StopProps) => {
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
              source={props.avatar}
              style={styles.profilePic}
            />
            
            <View>
              <Text style={styles.carInfo}>{props.carModel}</Text>
              <Text style={styles.driverInfo}>{props.driver}</Text>
            </View>

            
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
})

export default seleccionRecogida