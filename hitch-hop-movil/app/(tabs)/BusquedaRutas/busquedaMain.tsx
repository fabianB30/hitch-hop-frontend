import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
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

const {width, height} = Dimensions.get("window")

const busquedaMain = () => {
    const router = useRouter()
    const {date, setDate, destination} = useForm()

    const [mode, setMode] = useState<'date' | 'time'>('date')
    const [show, setShow] = useState(false)


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

  return (
    <SafeAreaView style={{flex:1}}>
        <ImageBackground
        source={require("@/assets/images/pattern-background-main.png")}>
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
                    <Text style={[styles.dataText, styles.text]}>Destino</Text>
                    <TouchableOpacity
                        onPress= {() => {
                            router.push('/BusquedaRutas/selectDestination')
                        }}
                    >
                        <Input style={styles.dataInputLong} pointerEvents='none'>
                            <InputField 
                                value={destination}
                                editable={false}
                                pointerEvents='none'
                            />
                            <InputSlot>
                                <Search size={14} color='black' strokeWidth={3} />
                            </InputSlot>
                        </Input>
                    </TouchableOpacity>
                </VStack>

                <Image 
                source={require("@/assets/images/conductorFlorSquare.png")}
                style={styles.charaImage}/>
                
                <Text style={[styles.charaText, styles.text]}>¿A dónde quieres ir?</Text>
                <Text style={[styles.charaSubtext, styles.text]}>¡Encuentre su próximo viaje con nosotros!</Text>

                <Button style={styles.button}>
                    <ButtonText style={[styles.text, {color: 'white'}]}>Buscar Rutas</ButtonText>
                </Button>
            </VStack>
        </ImageBackground>
    </SafeAreaView>
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
    borderRadius: 8
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
})

export default busquedaMain