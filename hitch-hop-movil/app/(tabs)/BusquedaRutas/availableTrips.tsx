import { ScrollView, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HitchHopHeader from '@/components/shared/HitchHopHeader'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { CalendarDays } from 'lucide-react-native'
import { Clock } from 'lucide-react-native'
import { Search } from 'lucide-react-native'
import { Input, InputSlot } from '@/components/ui/input'
import { ImageBackground } from 'expo-image'
import { useForm } from '@/components/shared/SearchContext'
import { useRouter } from 'expo-router'
import TripDetailItem from '@/components/TripDetailItem'

const { width, height } = Dimensions.get('window')

// Should get this from API
const trips = [
    {avatar: require("@/assets/images/avatar1.png"), driver: "Adrián Zamora", details:  "Parque España, San José Av. 7.", passengers: 4, price: 1500, date: "2025-06-14T16:00:00.000Z"}, // 10:00am → 10:00am local → change to 16:00 UTC (10:00am local)
    {avatar: require("@/assets/images/avatar1.png"), driver: "Carmen Lyra", details:  "Tecnológico de Costa Rica, San José Av. 9.", passengers: 2, price: 2000, date: "2025-06-18T22:30:00.000Z"}, // PM (4:30pm local)
    {avatar: require("@/assets/images/avatar1.png"), driver: "Julián Paredes", details:  "Hospital Calderón Guardia, San José Av. 7.", passengers: 4, price: 1500, date: "2025-06-22T15:45:00.000Z"}, // PM (9:45am → 9:45am local → 15:45 UTC for ~9:45am local)
    {avatar: require("@/assets/images/avatar1.png"), driver: "Marco Ibarra", details:  "Tecnológico de Costa Rica, San José Av. 9.", passengers: 2, price: 1500, date: "2025-06-28T02:15:00.000Z"}, // AM (8:15pm local previous day)
    {avatar: require("@/assets/images/avatar1.png"), driver: "José Farreón", details:  "Tecnológico de Costa Rica, San José Av. 9.", passengers: 1, price: 1000, date: "2025-07-05T20:00:00.000Z"}, // PM (2:00pm local)
    {avatar: require("@/assets/images/avatar1.png"), driver: "Juan Santamaría", details:  "Parque Morazán, San José, Av. 3", passengers: 4, price: 0, date: "2025-07-10T23:20:00.000Z"}, // PM (5:20pm local)
]

const availableTrips = () => {
    const router = useRouter()

    const { date, destination } = useForm()

    const [shownTrips, setShownTrips] = useState(trips)

    // This only filters by pickup point for now
    
    useEffect(() => {
        if(destination !== '' && destination !== undefined) {
            const filteredTrips = trips.filter((trip) => 
                trip.details.includes(destination)
            )
            setShownTrips(filteredTrips)
        }
    }, [])

  return (
         <ImageBackground
        source={require("@/assets/images/pattern-background-main.png")}>
    <SafeAreaView>
            <HitchHopHeader />

            { /* Main View */ }
            <VStack style={styles.container}>
                <Text style={styles.text}>Búsqueda de Rutas</Text>
                <HStack style={styles.data}>
                    <VStack style={{flex: 2.4}}>
                        <Text style={[styles.dataText, styles.text]}>Fecha</Text>
                            <Input style={[styles.dataInput, {maxWidth: width * 0.48}]}
                                pointerEvents='none'
                            >
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ flex: 1, fontSize: 14 }}
                                >
                                    {date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                </Text>
                                <InputSlot>
                                    <CalendarDays size={14} color='black' strokeWidth={3} />
                                </InputSlot>
                            </Input>
                    </VStack>
                    <VStack style={{flex: 1.9}}>
                        <Text style={[styles.dataText, styles.text]}>Hora</Text>
                            <Input style={[styles.dataInput, {maxWidth: width * 0.48}]}
                                pointerEvents='none'
                            >
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ flex: 1, fontSize: 14 }}
                                >
                                    {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ""}
                                </Text>
                                <InputSlot>
                                    <Clock size={14} color='black' strokeWidth={3} />
                                </InputSlot>
                            </Input>
                    </VStack>
                </HStack>

                <VStack>
                    <Text style={[styles.dataText, styles.text]}>Destino</Text>
                        <Input style={styles.dataInputLong} pointerEvents='none' isReadOnly>
                            <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ flex: 1, fontSize: 14 }}
                            >
                                {destination || ""}
                            </Text>
                            <InputSlot>
                                <Search size={14} color='black' strokeWidth={3} />
                            </InputSlot>
                        </Input>
                </VStack>

                <ScrollView
                    style={styles.bottomView}
                    contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    {shownTrips.map((trip, index) => <TripDetailItem key={index} avatar={trip.avatar} driverName={trip.driver} details={trip.details} passengers={trip.passengers} price={trip.price} time={new Date(trip.date)}/>)}
                </ScrollView>
            </VStack>
    </SafeAreaView>
        </ImageBackground>
  )
}

const styles = StyleSheet.create({
container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    backgroundColor: 'white',
},
text: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#262627',
    fontFamily: 'Exo',
},
data: {
    marginTop: 4,
    justifyContent: 'space-between',
    marginBottom: 8.5
},
dataText: {
    fontWeight: 'bold',
    marginBottom: 0.5,
},
dataInput: {
    paddingLeft:12,
    borderRadius: 8,
    paddingRight: 12,
},
dataInputLong: {
    maxWidth: 358,
    marginBottom: 14,
    paddingRight: 12,
    borderRadius: 8,
    paddingLeft: 12
},
bottomView: {
    maxHeight: height * 0.58
}
})

export default availableTrips