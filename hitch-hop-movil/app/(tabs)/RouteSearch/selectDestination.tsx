import { View, Text, StyleSheet,ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HitchHopHeader from '@/components/shared/HitchHopHeader'
import DestinationItem from '@/components/DestinationItem'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Search, Subtitles } from 'lucide-react-native'
import { ImageBackground } from 'expo-image'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { useForm, Place } from '@/components/shared/SearchContext'
import { useRouter } from 'expo-router'
import { getAllPlacesRequest } from '../../../interconnection/place'

const { width, height } = Dimensions.get('window')

export type DestinationType = {
    title: string,
    subtitle: string
}

// Should get this from API
const destinations = [
    {title: "Tecnológico de Costa Rica", subtitle: "Avenida 9, Barrio Amón, San José"},
    {title: "Instituto Nacional de Seguros", subtitle: "Avenida 7, Calle 9, San José"},
    {title: "Hospital Calderón Guardia", subtitle: "Avenida 7, Aranjuez, San José"},
    {title: "Parque España", subtitle: "Avenida 7, Calles 9, C. 11, San José"},
    {title: "Parque Morazán", subtitle: "Avenida 3,Calles 9 y, C. 5, San José"},
    {title: "Parque Nacional", subtitle: "Avenida 3, Calles 15 y, C. 19, San José"},
]

const selectDestination = () => {
    const router = useRouter()

    const { setDestination } = useForm()
    const [allDestinations, setAllDestinations] = useState<Place[]>([])
    const [shownDestination, setShownDestinations] = useState<Place[]>([])

    const handleDestintationSelect = (dest: Place) => {
        setDestination(dest)
        //const varas = dest.description.split(", ")
        //dest.name + ", " + varas[varas.length - 1]
        router.back()
    }

    function normalizeString(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const handleSearch = (text: string) => {
        if (text === "") {
            setShownDestinations(allDestinations)
        } else {
            const query = normalizeString(text)
            const filteredDestinations = allDestinations.filter((dest) => 
                normalizeString(dest.name).includes(query) ||
                normalizeString(dest.description).includes(query))
            setShownDestinations(filteredDestinations)
        }
    }

    useEffect(() => {
        async function fetchPlaces() {
            const data = await getAllPlacesRequest();
            
            if (data){
                setAllDestinations(data);
                setShownDestinations(data)
            }
        }
        fetchPlaces()
    }, [])

  return (
         <ImageBackground
        source={require("@/assets/images/pattern-background-main.png")}>
    <SafeAreaView>
            <HitchHopHeader />

            <View style={styles.container}>
                <Text style={styles.text}>Punto de Partida</Text>

                <Input style={styles.dataInputLong}>
                    <InputField onChangeText={handleSearch}/>
                    <InputSlot>
                        <Search size={14} color='black' strokeWidth={3} />
                    </InputSlot>
                </Input>

                <ScrollView style={styles.bottomView} showsVerticalScrollIndicator={false}>
                    {shownDestination.map((dest, index) => <DestinationItem key={index} title={dest.name} subtitle={dest.description} onPress={() => handleDestintationSelect(dest)}/>)}
                </ScrollView>
            </View>
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
dataInputLong: {
    maxWidth: 358,
    marginBottom: 20,
    paddingRight: 12,
    borderRadius: 8
},
bottomView: {
    maxHeight: height * 0.69
}
})

export default selectDestination