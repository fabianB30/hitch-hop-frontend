import { Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Proportions, Users } from 'lucide-react-native'
import { useForm } from './shared/SearchContext'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { router } from 'expo-router'

const {width, height} = Dimensions.get('window')

export type tripDetailProp = {
  _id: string;
  arrival: string;
  costPerPerson: number;
  departure: string;
  driver: any
  startpoint: any
  endpoint: any
  passengers: any[]
  paymethod: string;
  stopPlaces: any[];
  stops: any[];      
};

const TripDetailItem = (props: tripDetailProp) => {

    //console.log(props.driver.photoUrl)

    //Se define la descripción del punto de inicio
    const startingPoint = props.startpoint.description.split(", ")
    const startPointMsg = props.startpoint.name + ", " + startingPoint[startingPoint.length - 1]
    
    return (
    <TouchableOpacity onPress= {() => { router.push({ 
                                            pathname: "/(tabs)/TripJoinInfo/tripInformation",
                                            params: { trip: JSON.stringify(props)} }); }}>
        <HStack style={styles.container}>
            <Image style={styles.image}
                source={{uri: props.driver.photoUrl}}
            />

            <VStack style={styles.tripInfo}>
                <Text style={[styles.driver]}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >{props.driver.name}</Text>
                <Text style={[styles.subtext]}>Punto de Partida:</Text>
                <Text style={[styles.details]}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >{startPointMsg}</Text>
            </VStack>

            <VStack style={styles.rightColumn}>
                <HStack style={{gap: 4, alignItems: 'center'}}>
                    <Users size={16} color='black' strokeWidth={3}/>
                    <Text style={styles.regText}>{props.passengers.length}</Text>
                </HStack>
                <Text style={styles.regText}>&#8353;{props.costPerPerson.toString()}</Text>
                <Text style={styles.regText}>{new Date(props.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </VStack>
        </HStack>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
container: {
    padding: 16,
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: '#ECECFF',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1
},
image: {
    borderRadius: 50,
    width: height * 0.09,
    height: height * 0.09,
    flex: 22
},
regText: {
    fontFamily: 'Exo',
    fontSize: 14,
    fontWeight: 'light'
},
tripInfo: {
    alignContent: 'flex-start',
    flex: 58.5
},
driver: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 'bold'
},
subtext: {
    fontFamily: 'Exo',
    fontSize: 12,
    fontWeight: 'medium',
},
details: {
    fontFamily: 'Exo',
    fontSize: 10,
    fontWeight: 'normal'
},
rightColumn: {
    alignItems: 'flex-end',
    flex: 25
}
})

export default TripDetailItem