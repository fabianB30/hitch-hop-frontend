import { BackHandler } from 'react-native';
import { useState, useEffect } from "react";
import { StyleSheet, Image, View, ScrollView, Dimensions } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import HitchHopHeader from "@/components/shared/HitchHopHeader"
import RideStopDetail from '@/components/RideStopDetail'
import RideStopDetailIcon from '@/components/RideStopDetailIcon'
import { ImageBackground } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Users } from 'lucide-react-native'
import { HStack} from '@/components/ui/hstack'
import { VStack } from "@/components/ui/vstack";
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { Modal, ModalBackdrop, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"
import * as Font from 'expo-font';
import { addUserToStop, addPassengerToTripRequest } from '../../../interconnection/trip'
import { useAuth } from '../Context/auth-context'

const {width, height} = Dimensions.get("window")

const checkoutTrip = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);
    
    const { user } = useAuth()
    const router = useRouter()

    const params = useLocalSearchParams()

    const trip = JSON.parse(params.trip as string)
    const vehicleInformation = JSON.parse(params.additionalInfo as string)
    const selectedStop = JSON.parse(params.selectedStop as string)
    const stopList = JSON.parse(params.stopList as string);

    console.log(stopList[Number(selectedStop)])

    async function openLastModal() {
      const addStop = await addUserToStop(trip._id, stopList[Number(selectedStop)]._id, user._id)
      if(addStop){
        const addPassenger = await addPassengerToTripRequest(trip._id, user._id);
        console.log(addPassenger)
      }
      console.log(addStop)
      setShowConfirmationModal(false);
      setShowAcceptModal(true);
    }
    
    useEffect(() => {
      if (showAcceptModal) {
        const backAction = () => {
          return true;
        };

        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );

        return () => backHandler.remove();
      }
    }, [showAcceptModal]);

    useEffect(() => {
      Font.loadAsync({
        'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
        'Exo-Medium': require('@/assets/fonts/exo.medium.otf'),
        'Exo-Semibold': require('@/assets/fonts/Exo-SemiBold.otf'),
        'Exo_Bold': require('@/assets/fonts/Exo-Bold.otf'),
      }).then(() => setFontsLoaded(true));
    } , []);

    if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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
            <Text style={[styles.detailText, {marginTop: 10}]}>{new Date(trip.arrival).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit', timeZone: 'UTC' })}</Text>
            <Text style={styles.detailText}>{new Date(trip.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}</Text>
          </View>

          <ScrollView style={[styles.stops, {gap: 10}]} showsVerticalScrollIndicator={false}>
            <View style={styles.verticalLine} />
            <RideStopDetail stopType="Partida" detail={trip.startpoint.name} isAtEnd={true}/>
            <RideStopDetailIcon stopType="Parada de recogida" detail={stopList[Number(selectedStop)].name}/>
            <RideStopDetail stopType="Destino" detail={trip.endpoint.name} isAtEnd={true}/>
          </ScrollView>

          <HStack style={{marginTop: 20}}>
            <View style={styles.rideDetails}>
              <HStack style={{gap: 4, alignItems: 'center'}}>
                <Text style={styles.priceText}>{(trip.costPerPerson === 0) ? "Gratis" : <>&#8353; {trip.costPerPerson.toString()}</>}</Text>
                <Users strokeWidth={2.5} size={18} color='black'/>
                <Text style={styles.detailText}>{trip.passengerLimit}</Text>
              </HStack>    
            </View>     
            <Button onPress={() => setShowConfirmationModal(true)} style={[styles.button, styles.joinButton]}>
              <ButtonText style={styles.buttonText}>Unirse</ButtonText>
            </Button>

            {/* Código para el Modal de confirmación */}
            <Modal isOpen={showConfirmationModal} onClose={() => { setShowConfirmationModal(false) }} size="md">
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Text style={styles.boldText} >
                    ¿Confirma que desea unirse al viaje?
                  </Text>
                </ModalHeader>
                <ModalBody>
                  <Text style={styles.normalText}>
                    Por favor, verifique que todos los datos estén correctos antes de aceptar.
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button style={[styles.button, styles.modalBackButton]} variant="outline" onPress={() => { setShowConfirmationModal(false) }}>
                    <ButtonText style={{color: "#FFAB00", fontFamily: 'Exo-Medium', fontSize: 14}}>Volver</ButtonText>
                  </Button>
                  <Button style={[styles.button]} onPress={openLastModal}>
                    <ButtonText style={{fontFamily: 'Exo-Medium', fontSize: 14}}>Aceptar</ButtonText>
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>   
            {/* Fin del Modal de confirmación */}

            {/* Código para el Modal una vez confirmado */}
            <Modal isOpen={showAcceptModal} onClose={() => { setShowAcceptModal(false) }} closeOnOverlayClick={false} size="lg">
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Text style={styles.boldText}>
                    Su solicitud ha sido enviada y está en espera de aprobación.
                  </Text>
                </ModalHeader>
                <ModalBody>
                  <Image source={require('@/assets/images/nana.png')} style={styles.modalImg} />
                </ModalBody>
                <ModalFooter>
                  <VStack className="mx-auto">
                    <Button style={[styles.button]} className="mb-5" onPress={() => {}}>
                      <ButtonText style={styles.modalButtonText}>Ver mis solicitudes pendientes</ButtonText>
                    </Button  >
                    <Button style={[styles.button, styles.modalBackButton]} variant='outline' className="mb-2" onPress={() => {setShowAcceptModal(false)}}>
                      <ButtonText style={[styles.modalButtonText, {color: "#FFAB00"}]}>Volver al menú principal</ButtonText>
                    </Button>
                  </VStack>
                </ModalFooter>
              </ModalContent>
            </Modal>   
            {/* Fin del Modal una vez confirmado */}

          </HStack>
          {/* End of Card View */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

//Estilos usados para los componentes
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
    padding: 10 ,
    maxHeight: height * 0.6 
  },
  detailText: {
    color: '#000000',
    fontFamily: 'Exo-Medium',
    fontWeight: 500,
    fontSize: 18,
  },
  profilePic: {
    width: 72,
    height: 72,
    borderRadius: 50
  },
  modalImg: {
    height: height * 0.5,
    width: '100%',
  },
  carInfo: {
    fontSize: 14,
    fontWeight: 300,
    fontFamily: 'Exo-Light',
    color: '#171717', 
  },
  driverInfo: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: 'Exo-Bold',
    color: '#171717',
  },
  rideDetails: {
    marginLeft: 10,
  },
  stops: {
    marginTop: 5,
    maxHeight: 250,
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
    height: 36,
    borderRadius: 8,
    backgroundColor: '#7875F8',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  modalBackButton: {
    backgroundColor: 'white',
    borderColor: '#FFAB00',
  },
  joinButton: {
    width: '40%',
    marginBottom: 20,
    marginTop: -5,
    marginLeft: 'auto',
    marginRight: 21,  
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Exo-Medium',
    fontSize: 16,
  },
  modalButtonText: {
    fontFamily: 'Exo-Medium',
    fontSize: 14,
    fontWeight: 500
  },
  priceText: {
    marginRight: 10,
    color: '#171717',
    fontFamily: 'Exo-Medium',
    fontWeight: 500,
    fontSize: 18,
  },
  boldText: {
    fontSize: 16,
    color: '#171717',
    fontFamily: 'Exo-Bold',
    textAlign: 'center',
    fontWeight: 800
  },
  normalText: {
    fontSize: 14,
    color: '#262627',
    fontFamily: 'Exo-Regular',
    flex: 1
  },
})

export default checkoutTrip