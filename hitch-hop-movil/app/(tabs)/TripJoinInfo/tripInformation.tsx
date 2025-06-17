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

/*
const getCarInfo = (id:string) => {
  // API call to get car data
  let carData
  if (id === "6802c4cf2736f21b6f4b5a8b") {
    carData = {
      "msg": "Vehiculo obtenido exitosamente.",
      "data": {
          "_id": "6802c4cf2736f21b6f4b5a8b",
          "model": "Corolla",
          "brand": "Toyota",
          "color": "Red",
          "plate": "XYZ123",
          "createdAt": "2025-04-18T21:31:59.863Z",
          "updatedAt": "2025-04-18T21:31:59.863Z",
          "__v": 0
      }
    }
  } else {
    carData = {"msg": "Something went wrong", "data": {}}
  }

  if (carData.msg === "Vehiculo obtenido exitosamente.") {
    return {
      "model": carData.data.model,
      "brand": carData.data.brand,
      "color": carData.data.color
    }
  } else {
    return null
  }
}

const getPlaceInfo = (id:string) => {
  // API call to get place info
  let placeData
  if (id === "67fd0e1e0e35fdaf46b59b54") {
    placeData = {
      "msg": "Lugar obtenido exitosamente.",
      "data": {
          "_id": "67fd0e1e0e35fdaf46b59b54",
          "name": "Parque La Sabana",
          "description": "Parque urbano en San José, Costa Rica",
          "longitude": -84.1012,
          "latitude": 9.9381,
          "createdAt": "2025-04-14T13:31:10.228Z",
          "updatedAt": "2025-04-14T13:31:10.228Z",
          "__v": 0
      }
    }
  } else if (id === "682dfede7a73dff4edfa9bb0") {
    placeData = {
      "msg": "Lugar obtenido exitosamente.",
      "data": {
          "_id": "682dfede7a73dff4edfa9bb0",
          "name": "Parque San Isidro Coronado",
          "description": "Parque urbano en Vazquez de Coronado",
          "longitude": 2,
          "latitude": 4,
          "createdAt": "2025-05-21T16:27:10.658Z",
          "updatedAt": "2025-05-21T16:27:10.658Z",
          "__v": 0
      }
    }
  } else if (id === "682e00bfb0a1ebb111c51a24") {
    placeData = {
      "msg": "Lugar obtenido exitosamente.",
      "data": {
          "_id": "682e00bfb0a1ebb111c51a24",
          "name": "Mall San Pedro",
          "description": "Un mall",
          "longitude": 5,
          "latitude": 6,
          "createdAt": "2025-05-21T16:35:11.363Z",
          "updatedAt": "2025-05-21T16:35:11.363Z",
          "__v": 0
      }
    }
  } else {
    placeData = {"msg": "Something went wrong", "data": {}}
  }

  if (placeData.msg === "Lugar obtenido exitosamente.") {
    return placeData.data.name
  } else {
    return null
  }
}

const getStops = (idArr:string[]) => {
  let stopsArr: string[] = []
  idArr.forEach((id) => {
    let stopInfo = getPlaceInfo(id)
    if (stopInfo != null) {
      stopsArr.push(stopInfo)
    }
  })

  if (stopsArr.length > 0) {
    return stopsArr
  } else {
    return null
  }
}

const getDate = (dateString:string) => {
  const dateObj = new Date(dateString)

  const date = dateObj.toISOString().slice(2, 10).split("-").reverse().join("/")

  let hours = dateObj.getUTCHours()
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const time = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`

  return [date, time]
}

const apiData = {
    "msg": "Viaje obtenido exitosamente.",
    "data": {
        "_id": "681bebf354d5dfd2f7e01a3e",
        "startpoint": "67fd0e1e0e35fdaf46b59b54", // Assuming this is an ID
        "endpoint": "682e00bfb0a1ebb111c51a24", // Assuming this is an ID
        "departure": "2025-04-11T11:45:00.000Z",
        "arrival": "2020-07-03T06:00:00.000Z",
        "stops": ["682dfede7a73dff4edfa9bb0"], // Assuming this is an array of IDs
        "passengers": ["Passenger 1", "Passenger 2", "Passenger 3", "Passenger 4"], // Assuming array of strings since there's no get-user in api
        "driver": "Driver Name", // Assuming string since there's no get-user in api
        "costPerPerson": 1500,
        "createdAt": "2025-05-07T23:25:39.501Z",
        "updatedAt": "2025-05-07T23:25:39.501Z",
        "__v": "6802c4cf2736f21b6f4b5a8b" // Assuming this is a vehicle ID
    }
}

let rideInfo
if (apiData.msg === "Viaje obtenido exitosamente."){
  rideInfo = apiData.data
} else {
  rideInfo = {}
}

let carInfo = getCarInfo(apiData.data.__v)
let startInfo = getPlaceInfo(apiData.data.startpoint)
let endInfo = getPlaceInfo(apiData.data.endpoint)
let stopsInfo = getStops(apiData.data.stops)
let date = getDate(apiData.data.departure)

let additionalInfo

if (carInfo == null || startInfo == null || endInfo == null || stopsInfo == null ||
    carInfo == undefined || startInfo == undefined || endInfo == undefined || stopsInfo == undefined) {
  console.log(carInfo+"\t"+startInfo+"\t"+endInfo+"\t"+stopsInfo)
  additionalInfo = {}
} else {
  additionalInfo = {
    // avatar info is here since API doesn't offer a way to obtain it yet
    avatar: require("@/assets/images/avatar1.png"),
    start: startInfo,
    end: endInfo,
    stops: stopsInfo,
    date: date[0],
    time: date[1],
    carBrand: carInfo.brand,
    carModel: carInfo.model,
    carColor: carInfo.color
  }
}
*/
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
        'Exo-Medium': require('@/assets/fonts/exo.medium.otf'),
      }).then(() => setFontsLoaded(true));
  }, [])

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{flex: 1}}>
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
            <Text style={{ color: '#171717'}}>{new Date(trip.arrival).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
            <Text style={{ color: '#171717'}}>{new Date(trip.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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
                <Users size={16} color='black' />
                <Text style={{ color: '#171717'}}>{trip.passengers.length}</Text>
              </HStack>
              <Text style={{ color: '#171717'}}>{(trip.costPerPerson === 0) ? "Gratis" : <>&#8353; {trip.costPerPerson.toString()}</>}</Text>
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

export default tripInformation