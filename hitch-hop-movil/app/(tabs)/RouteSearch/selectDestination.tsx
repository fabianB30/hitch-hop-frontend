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
import * as Font from 'expo-font';

/**
 * This page allows the user to select a destination from a list of available places.
 * Users can search through destinations using a text input.
 * Once a destination is selected, the app navigates back to the previous screen.
 * 
 * This page was worked on by:
 *   Rubén Hurtado
 *   Andrey Calvo
 */

const { width, height } = Dimensions.get('window')

export type DestinationType = {
    title: string,
    subtitle: string
}

const selectDestination = () => {
    const router = useRouter()
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const { setDestination } = useForm()
    const [allDestinations, setAllDestinations] = useState<Place[]>([])
    const [shownDestination, setShownDestinations] = useState<Place[]>([])

    const handleDestintationSelect = (dest: Place) => {
        /**
         * Handles user selection of a destination from the list.
         * Sets the selected destination in global state and navigates back.
         * 
         * Function inputs:
         *   dest: Place object representing the selected destination
         */
        setDestination(dest)
        router.back()
    }

    function normalizeString(str: string): string {
        /**
         * Normalizes and simplifies a string for consistent search comparisons.
         * Removes accents and converts the string to lowercase.
         * 
         * Function inputs:
         *   str: string to normalize
         * 
         * Function outputs:
         *   normalized string without accents in lowercase
         */
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const handleSearch = (text: string) => {
        /**
         * Handles real-time search logic for filtering available destinations.
         * If the search text is empty, resets the shown destinations to all destinations.
         * Otherwise, filters based on normalized name or description containing the search query.
         * 
         * Function inputs:
         *   text: user-provided search string
         */
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
        /**
         * Runs on component mount to:
         *   - Fetch all available destinations for the user
         *   - Set the list of shown destinations to all destinations by default
         */
        async function fetchPlaces() {
            const data = await getAllPlacesRequest();
            
            if (data){
                setAllDestinations(data);
                setShownDestinations(data)
            }
        }
        fetchPlaces()
        Font.loadAsync({
        'Exo_Bold': require('@/assets/fonts/Exo-Bold.otf'),
        }).then(() => setFontsLoaded(true));
    }, [])

    
    if (!fontsLoaded) return null;

  return (
    <ImageBackground
        source={require("@/assets/images/pattern-background-main.png")}>
    <SafeAreaView>
            <HitchHopHeader />

            <View style={styles.container}>
                <Text style={styles.text}>Punto de Partida</Text>

                <Input style={styles.dataInputLong}>
                    <InputField placeholder="Ingresa el punto de partida" onChangeText={handleSearch}/>
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
    fontWeight: '700',
    color: '#171717',
    fontFamily: 'Exo_Bold',
},
dataInputLong: {
    maxWidth: 358,
    marginBottom: 20,
    paddingRight: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#535252',
},
bottomView: {
    maxHeight: height * 0.69
}
})

export default selectDestination