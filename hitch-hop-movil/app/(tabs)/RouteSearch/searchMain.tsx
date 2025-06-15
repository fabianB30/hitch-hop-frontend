import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HitchHopHeader from '@/components/shared/HitchHopHeader'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { CalendarDays } from 'lucide-react-native'
import { Clock } from 'lucide-react-native'
import { Search } from 'lucide-react-native'
import { ImageBackground } from 'expo-image'
import { Button, ButtonText } from '@/components/ui/button'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useForm } from '@/components/shared/SearchContext'
import { useRouter } from 'expo-router'
import { Modal, ModalBackdrop, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"
import TripDetailItem from '@/components/TripDetailItem'
import { getAllTripsRequest, getTripsParams } from '../../../interconnection/trip'

const {width, height} = Dimensions.get("window")

const trips = [
    {avatar: require("@/assets/images/avatar1.png"), driver: "Adrián Zamora", details:  "Parque España, San José Av. 7.", passengers: 4, price: 1500, date: "2025-06-14T16:00:00.000Z"}, // 10:00am → 10:00am local → change to 16:00 UTC (10:00am local)
    {avatar: require("@/assets/images/avatar1.png"), driver: "Carmen Lyra", details:  "Tecnológico de Costa Rica, San José Av. 9.", passengers: 2, price: 2000, date: "2025-06-18T22:30:00.000Z"}, // PM (4:30pm local)
    {avatar: require("@/assets/images/avatar1.png"), driver: "Julián Paredes", details:  "Hospital Calderón Guardia, San José Av. 7.", passengers: 4, price: 1500, date: "2025-06-22T15:45:00.000Z"}, // PM (9:45am → 9:45am local → 15:45 UTC for ~9:45am local)
    {avatar: require("@/assets/images/avatar1.png"), driver: "Marco Ibarra", details:  "Tecnológico de Costa Rica, San José Av. 9.", passengers: 2, price: 1500, date: "2025-06-28T02:15:00.000Z"}, // AM (8:15pm local previous day)
    {avatar: require("@/assets/images/avatar1.png"), driver: "José Farreón", details:  "Tecnológico de Costa Rica, San José Av. 9.", passengers: 1, price: 1000, date: "2025-07-05T20:00:00.000Z"}, // PM (2:00pm local)
    {avatar: require("@/assets/images/avatar1.png"), driver: "Juan Santamaría", details:  "Parque Morazán, San José, Av. 3", passengers: 4, price: 0, date: "2025-07-10T23:20:00.000Z"}, // PM (5:20pm local)
]

type Trip = {
  avatar: any;
  driver: string;
  details: string;
  passengers: number;
  price: number;
  date: string;
};

const searchMain = () => {
    const router = useRouter()
    const { date, setDate, destination } = useForm()

    const [mode, setMode] = useState<'date' | 'time'>('date')
    const [show, setShow] = useState(false)
    const [msgError, setMsgError] = useState(false)

    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [shownTrips, setShownTrips] = useState<Trip[]>([])

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
        if (selectedDate) {
            if (mode === 'date') {
                const newDate = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                )
                setDate(newDate)
            } else if (mode === 'time') {
                const newDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    selectedDate.getHours(),
                    selectedDate.getMinutes(),
                    selectedDate.getSeconds()
                )
                setDate(newDate)
            }
        }
        setShow(false)
    }
    const showMode = (currentMode: 'date' | 'time') => {
        setShow(true)
        setMode(currentMode)
    }
    const showDatepicker = () => {
        showMode('date')
    }
    const showTimepicker = () => {
        showMode('time')
    }

    const searchTrips = async () => {
        //Aquí se llama la API para obtener los viajes
        //Hay que obtener el id de la institución, y el id del destino
        const validData = {
            "endDate": date,
            "institutionId": "6841390cb2cce04f89706f02",
            "endpoint": "684b8255c0f8aa8f4dfa3e5f"
        }

        const data = await getTripsParams(validData);
        if (data) console.log(data[0]);
        //Aquí solo hay que manipular los datos y ya, estaría el backend

        //router.push("/(tabs)/RouteSearch/availableTrips")
        setMsgError(false)
        const filteredTrips = trips.filter((trip) => 
            trip.details.includes(destination)
        )
        
        if(filteredTrips.length > 0){
            setShownTrips(filteredTrips); 
        } else{
            setShowConfirmationModal(true);
        }   
    }

    const checkInputs = () => {
        (!destination) ? setMsgError(true) : searchTrips(); 
    }

    /*
    useEffect(() => {
        async function fetchTrips() {
            const data = await getAllTripsRequest();
            
            console.log(data[0].startpoint);
        }
        
        fetchTrips();

    }, [destination])

    */

  return (
      <ImageBackground
      source={require("@/assets/images/pattern-background-main.png")}>
            <SafeAreaView>
            <HitchHopHeader />

            {/* Main view */}
            <VStack style={styles.container}>
                <Text style={styles.text}>Búsqueda de Rutas</Text>

                <HStack style={styles.data}>
                    <VStack style={{flex: 2.4}}>
                        <Text style={[styles.dataText, styles.text]}>Fecha</Text>
                        <TouchableOpacity
                            onPress={() => showDatepicker()}
                        >
                            <Input style={[styles.dataInput, {maxWidth: width * 0.48}]}
                                pointerEvents='none'
                            >
                                <InputField 
                                    value={date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                    editable={false}
                                    pointerEvents='none'
                                />
                                <InputSlot>
                                    <CalendarDays size={14} color='black' strokeWidth={3} />
                                </InputSlot>
                            </Input>
                        </TouchableOpacity>
                    </VStack>
                    <VStack style={{flex: 1.9}}>
                        <Text style={[styles.dataText, styles.text]}>Hora</Text>
                        <TouchableOpacity
                            onPress={() => showTimepicker()}
                        >
                            <Input style={[styles.dataInput, {maxWidth: width * 0.48}]}
                                pointerEvents='none'
                            >
                                <InputField 
                                    value={date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    editable={false}
                                    pointerEvents='none'
                                />
                                <InputSlot>
                                    <Clock size={14} color='black' strokeWidth={3} />
                                </InputSlot>
                            </Input>
                        </TouchableOpacity>
                    </VStack>
                </HStack>

                {show && (
                    <DateTimePicker
                        value={date}
                        mode={mode}
                        is24Hour={false}
                        onChange={onDateChange}
                        minimumDate={new Date()}
                    />
                )}

                <VStack>
                    <Text style={[styles.dataText, styles.text, msgError && {color: 'red'}]}>Destino</Text>
                    <TouchableOpacity
                        onPress= {() => {
                            router.push('/RouteSearch/selectDestination')
                        }}>
                        <Input style={[styles.dataInputLong, msgError && {borderColor: 'red'}]} pointerEvents='none' isReadOnly>
                            <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ flex: 1 }}
                            >
                                {destination || ""}
                            </Text>
                            <InputSlot>
                                <Search size={14} color='black' strokeWidth={3} />
                            </InputSlot>
                        </Input>
                    </TouchableOpacity>
                </VStack>
                
                {msgError && <Text style={{color: 'red'}}>Algunos campos se encuentran vacíos*</Text>}

                {/*Inicio del ScrollView para las tarjetas*/}
                <ScrollView
                    style={styles.bottomView}
                    contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                {shownTrips.length > 0 ? (shownTrips.map((trip, index) => (
                <TripDetailItem key={index} 
                                avatar={trip.avatar} 
                                driverName={trip.driver} 
                                details={trip.details} 
                                passengers={trip.passengers} 
                                price={trip.price} 
                                time={new Date(trip.date)}/>))):
                (<><Image 
                        source={require("@/assets/images/conductorFlorSquare.png")}
                            style={styles.charaImage}/>
                    <Text style={[styles.charaText, styles.text]}>¿A dónde quieres ir?</Text>
                    <Text style={[styles.charaSubtext, styles.text]}>¡Encuentre su próximo viaje con nosotros!</Text>
                </>)}
                </ScrollView>
                {/*Fin del ScrollView para las tarjetas*/}

                <Button style={styles.button} onPress={checkInputs}>
                    <ButtonText style={[styles.text, {color: 'white'}]}>Buscar Rutas</ButtonText>
                </Button>
            </VStack>

            {/* Código para el Modal de no se encontraron rutas */}
            <Modal isOpen={showConfirmationModal} onClose={() => { setShowConfirmationModal(false) }} size="lg">
                <ModalBackdrop />
                <ModalContent>
                <ModalHeader>
                    <Text style={styles.boldText}>No se encontraron rutas disponibles.</Text>
                </ModalHeader>
                <ModalBody>
                    <Image source={require('@/assets/images/gatoautos.png')} style={styles.modalImg} />
                    <Text style={styles.normalText}>Intenta modificar el horario o la ruta elegida.</Text>
                </ModalBody>
                <ModalFooter className="mx-auto">
                    <Button variant='outline' style={styles.modalBackButton} onPress={() => { setShowConfirmationModal(false)}}>
                        <ButtonText style={{color: "#7875F8"}} >Regresar</ButtonText>
                    </Button>   
                </ModalFooter>
                </ModalContent>
            </Modal>   
            {/* Fin del Modal de confirmación */}
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
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#262627',
    fontFamily: 'Exo',
},
boldText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#171717',
    fontFamily: 'Exo',
    textAlign: 'center'
},
normalText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#262627',
    fontFamily: 'Exo',
    textAlign: 'center'
},
data: {
    marginTop: 10,
    justifyContent: 'space-between',
    marginBottom: 8.5
},
dataText: {
    fontWeight: 'bold',
    marginBottom: 0.5,
},
dataInput: {
    borderRadius: 8,
    paddingRight: 12,
},
dataInputLong: {
    maxWidth: 358,
    marginBottom: 20,
    paddingRight: 12,
    borderRadius: 8,
    paddingLeft: 12
},
charaImage: {
    marginHorizontal: 'auto',
    width: width * 0.44, 
    height: width * 0.44,
    marginBottom: 18
},
charaText: {
    marginHorizontal: 'auto',
    fontSize: 24,
    fontWeight: 'bold'
},
charaSubtext: {
    marginHorizontal: 'auto',
    fontSize: 18,
    textAlign: 'center'
},
button: {
    height: 39,
    borderRadius: 8,
    backgroundColor: '#7875F8',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    fontWeight: 'medium',
    marginLeft: 17,
    marginRight: 17,
    marginTop: 30
},
modalBackButton: {
    height: 36,
    width: '50%',
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#7875F8',
},
modalImg: {
    height: 180 ,
    width: 150,
    margin: 'auto',
},
bottomView: {
    maxHeight: height * 0.4
}
})

export default searchMain