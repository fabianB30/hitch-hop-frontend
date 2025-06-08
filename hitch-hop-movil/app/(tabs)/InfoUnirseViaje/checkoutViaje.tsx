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

const {width, height} = Dimensions.get("window")

const checkoutViaje = () => {
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [showAcceptModal, setShowAcceptModal] = useState<boolean>(false);
    
    const router = useRouter()

    const { rideInfo } = useLocalSearchParams()
    const { additionalInfo } = useLocalSearchParams()
    const { selectedStop } = useLocalSearchParams()
    let parsedData
    let additionalParsed
    let parsedStop

    if (typeof rideInfo === 'string') {
      parsedData = JSON.parse(rideInfo)
    } else {
      parsedData = null
    }
    if (typeof additionalInfo === 'string') {
      additionalParsed = JSON.parse(additionalInfo)
    } else {
      additionalParsed = null
    }
  
    if (!parsedData || !additionalParsed) {
      return <Text style={{marginVertical: 'auto'}}>Error: Ride information is missing or invalid.</Text>
    }

    if (typeof selectedStop === 'string') {
      if (selectedStop == '0') {
        parsedStop = additionalParsed.start
      } else {
        parsedStop = additionalParsed.stops[parseInt(selectedStop) - 1]
      }
    } else {
      parsedStop = null
    }
  
    if (!parsedStop) {
      return <Text style={{marginVertical: 'auto'}}>Error: No selected stop or param is invalid.</Text>
    }

    function openLastModal() {
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
              source={additionalParsed.avatar}
              style={styles.profilePic}
            />
            
            <View>
              <Text style={styles.carInfo}>{additionalParsed.carBrand + " " + additionalParsed.carModel + " " + additionalParsed.carColor}</Text>
              <Text style={styles.driverInfo}>{parsedData.driver}</Text>
            </View>
          </HStack>

          <View style={styles.rideDetails}>
            <Text style={{ color: '#171717'}}>{additionalParsed.date}</Text>
            <Text style={{ color: '#171717'}}>{additionalParsed.time}</Text>
          </View>

          <ScrollView style={[styles.stops, {gap: 10}]} showsVerticalScrollIndicator={false}>
            <View style={styles.verticalLine} />
            <RideStopDetail stopType="Partida" detail={additionalParsed.start} isAtEnd={true}/>
            <RideStopDetailIcon stopType="Parada de recogida" detail={parsedStop} isAtEnd={true}/>
            <RideStopDetail stopType="Destino" detail={additionalParsed.end} isAtEnd={true}/>
          </ScrollView>

          <HStack style={{marginTop: 20}}>
            <View style={styles.rideDetails}>
              <HStack style={{gap: 4, alignItems: 'center'}}>
                <Text style={styles.priceText}>&#8353;{parsedData.costPerPerson}</Text>
                <Users size={16} color='black' strokeWidth={3} />
                <Text style={{ color: '#171717'}}>{parsedData.passengers.length}</Text>
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
                    <ButtonText style={{color: "#FFAB00"}}>Volver</ButtonText>
                  </Button>
                  <Button style={[styles.button]} onPress={openLastModal}>
                    <ButtonText>Aceptar</ButtonText>
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
    fontWeight: 'light',
    fontFamily: 'Exo',
    color: '#171717', 
  },
  driverInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Exo',
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
    fontFamily: 'Exo',
    fontSize: 16,
    fontWeight: 'normal'
  },
  modalButtonText: {
    fontFamily: 'Exo',
    fontSize: 14,
    fontWeight: 'medium'
  },
  priceText: {
    marginRight: 10,
    color: '#171717',
    fontFamily: 'Exo',
    fontSize: 18,
    fontWeight: 'semibold'
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#171717',
    fontFamily: 'Exo',
    textAlign: 'center'
  },
  normalText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#262627',
    fontFamily: 'Exo',
    flex: 1
  },
})

export default checkoutViaje