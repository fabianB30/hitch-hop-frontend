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
import {useAuth} from '../Context/auth-context'
import * as Font from 'expo-font';
import { getPathWithConventionsCollapsed } from 'expo-router/build/fork/getPathFromState-forks'

/**
 * This page allows the user to search for routes.
 * Users can search based on a specified date, time and starting point.
 * 
 * This page was worked on by:
 *   Rubén Hurtado
 *   Andrey Calvo
 */

const {width, height} = Dimensions.get("window")

const searchMain = () => {
    const router = useRouter()

    const { user } = useAuth()
    
    const { date, setDate, destination} = useForm()
    
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const [mode, setMode] = useState<'date' | 'time'>('date')
    const [show, setShow] = useState(false)
    const [msgError, setMsgError] = useState(false)


    const [destinationMsg, setDestinationMsg] = useState<string>("")
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [shownTrips, setShownTrips] = useState<any[]>([])

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
        /**
         * This function handles how changes in date and time should behave
         * Sets date while preserving time or sets time preserving date based on the current mode
         * 
         * Function inputs:
         *   event: not used for anything insinde this funciton
         *   selectedDate: new date to replace the old one
         */
        if (selectedDate) {
            if (mode === 'date') {
                const newDate  = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                )
                //const newDateUtcLiteral = pickerDateToUtcLiteral(combinedDate);
                setDate(newDate);
            } else if (mode === 'time') {
                const newDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    selectedDate.getHours(),
                    selectedDate.getMinutes(),
                    selectedDate.getSeconds()
                )
                //const newDateUtcLiteral = pickerDateToUtcLiteral(combinedDate);
                setDate(newDate);
            }
        }
        setShow(false)
    }
    const showMode = (currentMode: 'date' | 'time') => {
        /**
         * This function shows the date or time pickers based on the current mode
         * 
         * Funtion inputs:
         *  currentMode: mode used to display the date or time picker
         */
        setShow(true)
        setMode(currentMode)
    }
    const showDatepicker = () => {
        /**
         * This function calls showMode with 'date' as the parameter
         */
        showMode('date')
    }
    const showTimepicker = () => {
        /**
         * This function calls showMode with 'time' as the parameter
         */
        showMode('time')
    }

    const searchTrips = async () => {
        /**
         * This function handles API requests to search for trips based on current user variables
         * It sets the start date and end date to be 30 minutes before and after the selected time respectively
         * It then sets the data of the query based on current user variables before making a request to the API
         * If trips are found they are filtered and shown, else a dialog notifying the user appears instead
         */
        setMsgError(false)
        //const utcDate = dateToUtcDate(date)
        const StartDate = new Date(date.getTime() - 30 * 60 * 1000)
        const EndDate = new Date(date.getTime() + 30 * 60 * 1000)
        const queryData = {
            "startDate": StartDate,
            "endDate": EndDate,
            "institutionId": user.institutionId, 
            "endpoint": destination._id
        }

        const data = await getTripsParams(queryData);
 
        const availableTrips = data.filter((trip:any) => 
            trip.passengers.length < trip.passengerLimit && 
            trip.passengers.every((passenger:any) => passenger.user !== user._id)
        );

        if(availableTrips && availableTrips.length > 0){
            setShownTrips(availableTrips); 
        } else{
            setShowConfirmationModal(true);
        }   
        
    }

    const checkInputs = () => {
        /**
         * This function verifies that all required inputs are filled and if so searches for trips
         */
        (!destination.name) ? setMsgError(true) : searchTrips(); 
    }

    const dateToUtcDate = (pickerDate: Date): Date => {
        /**
         * Sets date to UTC format
         * 
         * Funtion inputs:
         *  pickerDate: current picker's date
         * 
         * Function outputs:
         *  date in UTC format
         */
        const offset = pickerDate.getTimezoneOffset();
        return new Date(pickerDate.getTime() - offset * 60 * 1000);
    }

    
    const roundDate = (date: Date) => {
        /**
         * Rounds date to only increment in 15 minute intervals
         * 
         * Function inputs:
         *  date: date to be rounded
         * 
         * Function outputs:
         *  rounded date
         */
        const minutes = date.getMinutes();
        const remainder = minutes % 15;
        const diff = remainder === 0 ? 0 : 15 - remainder;

        const roundedDate = new Date(date);
        roundedDate.setMinutes(minutes + diff);
        roundedDate.setSeconds(0);
        roundedDate.setMilliseconds(0);

        return roundedDate;
    }
    
    useEffect(() => {
        /**
         * Runs whenever the selected destination changes.
         * If a destination is selected, formats a user-friendly message combining:
         *   - Destination name
         *   - The last element of the description, usually the region
         */
        if(destination.name){
            const description = destination.description.split(", ")
            setDestinationMsg(destination.name + ", " + description[description.length - 1])
        }

    }, [destination])

    useEffect(() => {
        /**
         * Runs on component mount to:
         *   - Round the selected date to the nearest 15-minute interval
         *   - Update the date state with the rounded UTC literal value
         */
       const roundedDate = roundDate(date); // redondea en UTC literal

        setDate(roundedDate);

        Font.loadAsync({
        'Exo-Medium': require('@/assets/fonts/exo.medium.otf'),
        'Exo-Semibold': require('@/assets/fonts/Exo-SemiBold.otf'),
        'Exo_Bold': require('@/assets/fonts/Exo-Bold.otf'),
        }).then(() => setFontsLoaded(true));
      }, [])

    if (!fontsLoaded) return null;

    return (
      <ImageBackground
      source={require("@/assets/images/pattern-background-main.png")}>
            <SafeAreaView>
            <HitchHopHeader />

            {/* Main view */}
            <VStack style={styles.container}>
                <Text style={[styles.text, {fontFamily: 'Exo-SemiBold'}]}>Búsqueda de Rutas</Text>

                <HStack style={styles.data}>
                    <VStack style={{flex: 2.4}}>
                        <Text style={[styles.text, styles.dataText]}>Fecha</Text>
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
                        <Text style={[styles.text, styles.dataText]}>Hora</Text>
                        <TouchableOpacity
                            onPress={() => showTimepicker()}
                        >
                            <Input style={[styles.dataInput, {maxWidth: width * 0.48}]}
                                pointerEvents='none'
                            >
                                <InputField 
                                    value={date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
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
                        minuteInterval={15}
                    />
                )}

                <VStack>
                    <Text style={[styles.text, styles.dataText, msgError && {color: 'red'}]}>Destino</Text>
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
                                {destinationMsg || ""}
                            </Text>
                            <InputSlot>
                                <Search size={14} color='black' strokeWidth={3} />
                            </InputSlot>
                        </Input>
                    </TouchableOpacity>
                </VStack>
                
                {msgError && <Text style={{color: 'red', marginTop: -15}}>Algunos campos se encuentran vacíos*</Text>}

                {/*Inicio del ScrollView para las tarjetas*/}
                <ScrollView
                    style={styles.bottomView}
                    contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                {shownTrips.length > 0 ? (shownTrips.map((trip, index) => (
                <TripDetailItem key={index} {...trip}/>))):
                (<>
                    <Image source={require("@/assets/images/conductorFlorSquare.png")} style={styles.charaImage}/>
                    <Text style={[styles.text, styles.charaText]}>¿A dónde quieres ir?</Text>
                    <Text style={[styles.charaSubtext]}>¡Encuentre su próximo viaje con nosotros!</Text>
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
                        <ButtonText style={{fontFamily: 'Exo-Medium', fontWeight: 500, color: "#7875F8"}} >Regresar</ButtonText>
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
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Exo-Medium',
},
boldText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#171717',
    fontFamily: 'Exo-Medium',
    textAlign: 'center'
},
normalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#262627',
    fontFamily: 'Exo-Medium',
    textAlign: 'center'
},
data: {
    marginTop: 10,
    justifyContent: 'space-between',
    marginBottom: 8.5
},
dataText: {
    marginBottom: 0.5,
    fontWeight: '700',
    fontFamily: 'Exo_Bold',
},
dataInput: {
    borderRadius: 8,
    paddingRight: 12,
    borderColor: '#A5A3A3'
},
dataInputLong: {
    maxWidth: 358,
    marginBottom: 20,
    paddingRight: 12,
    borderRadius: 8,
    paddingLeft: 12,
    borderColor: '#A5A3A3'
},
charaImage: {
    marginHorizontal: 'auto',
    width: width * 0.44, 
    height: width * 0.44,
    marginBottom: 10
},
charaText: {
    marginHorizontal: 'auto',
    fontSize: 24,
    fontFamily: 'Exo-SemiBold',
    fontWeight: '600'
},
charaSubtext: {
    marginHorizontal: 'auto',
    fontSize: 18,
    fontFamily: 'Exo-Medium',
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
    marginTop: -15
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