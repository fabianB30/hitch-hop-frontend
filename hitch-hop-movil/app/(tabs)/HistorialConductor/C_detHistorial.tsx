import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as Font from 'expo-font';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getTripByIdRequest } from '@/interconnection/trip';
import { getPlaceByIdRequest } from '@/interconnection/place'; 
import { getVehicleByIdRequest } from '@/interconnection/vehicle';

export default function C_detHistorial() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { id } = useLocalSearchParams(); //Obtenemos la id del viaje desde los parametros
  const [tripLoaded, setTripLoaded] = useState(false);
  
  const [trip, setTrip] = useState<any>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [tripDate, setTripDate] = useState<{dia: number, mes:string, ano:number, hora:string}|null>(null);
  const [passengersPickup, setPassengersPickup] = useState<{name: string, location:string, photo?:string}[]>([]);


  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Light.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

 
  useEffect(()=>{
    const fetchTrip = async () => {
	try {
	  const algoTrip = await getTripByIdRequest(id);
	  setTrip(algoTrip);
	  
	  const algoVehicle = await getVehicleByIdRequest(algoTrip.vehicle);
	  setVehicle(algoVehicle);

	  //Combinamos cada pasajero con su parada respectiva
	  const pickUp: {name: string, location:string}[] = [];

	  /*No se como lo puedo hacer mas rapido, esto esta haciendo la arga lenta*/
	  for(const stop of algoTrip.stops){
	    for (const passengerId of stop.passengersId){
	      const passenger = algoTrip.passengers.find(p => p.user._id === passengerId);
	      if (passenger) {
		pickUp.push({
		  name: passenger.user.name + " " + passenger.user.firstSurname + " " + passenger.user.secondSurname || "",
		  location: stop.place.name || "Ubicación desconocida",
		  photo: passenger.user.photoKey,
		});
	      }
	    }
	  }
	  console.log("pisk up:", pickUp);
	  setPassengersPickup(pickUp);

	} catch (error) {
          console.error('Error while capturing a trip: ', error);
	}
    };
    fetchTrip();
  },[id]);

  useEffect(() => {
      if (trip && vehicle && passengersPickup){
        //Para obtener los datos del trip
        const mesesAno = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
	];
        const departureDate = new Date(trip.departure);
        const dia = departureDate.getDate();
        const mes = mesesAno[departureDate.getMonth()];
        const ano = departureDate.getFullYear();
        const hora = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	setTripDate({dia, mes, ano, hora});
	setTripLoaded(true);
      }
  }, [trip, vehicle]);
 
  //Esto DEBE ir luego de todos los useEffect para que siempre haga los mismos
  //Si no se hace por alguna razon da error
  if (!fontsLoaded) return null; 
  
  return tripLoaded? (
    <View style={{ flex: 1, backgroundColor: '#f5f3ff' }}>
      {/* Fondo superior con logo */}
      <View style={{ width: '100%', height: 140, position: 'absolute', top: 0, left: 0 }}>
        <Image
          source={require('@/assets/images/HHlogo.png')}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          resizeMode="cover"
        />
        <Image
          source={require('@/assets/images/HHLogoDisplay.png')}
          style={{ width: 120, height: 36, position: 'absolute', top: 16, right: 16 }}
          resizeMode="contain"
        />
      </View>

      {/* Contenido principal */}
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/HistorialConductor/C_historialLleno')}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.subtitleCentered}>Viaje del {tripDate?.dia} de {tripDate?.mes} del {tripDate?.ano} a las {tripDate?.hora}</Text>
            <Text style={styles.title}>Conductor</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.label}>Punto de Inicio</Text>
	  {/*No se si los lugares deberian ser: [name, description] o solo [name]*/}
          <Text style={styles.text}>{trip.startpoint.name}</Text>

          <Text style={styles.label}>Destino</Text>
          <Text style={styles.text}>{trip.endpoint.name}</Text>

          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>Detalles del Auto</Text>
              <Text style={styles.text}>{vehicle.brand}, {vehicle.model}</Text>
              <Text style={styles.text}>{vehicle.plate}</Text>
              <Text style={styles.text}>{vehicle.color}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.label}>Costo</Text>
              <Text style={styles.text}>₡{trip.costPerPerson}</Text>
            </View>
          </View>

          <Text style={styles.label}>Pasajeros</Text>
          <View style={styles.passengerHeader}>
            <Text style={[styles.label, { width: 180 }]}>Nombre</Text>
            <Text style={styles.label}>Lugar de recogida</Text>
          </View>

          {passengersPickup.map((p, idx) => (
            <View key={idx} style={styles.passengerRow}>
              <Image
                source={
		  p.photo
		  ? {uri: p.photo}
		  : require('@/assets/images/avatar1.png')
		}
                style={styles.avatar}
              />
              <Text style={[styles.text, { width: 128 }]}>{p.name}</Text>
              <Text style={[styles.text, { flex: 1, paddingLeft: 8 }]}>{p.location}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  ) : (
    /*Dura un poco en cargar esta pagina entonces puse esto, no se si esta bien puesto*/ 
    <View style={styles.contatiner}>
      
      {/* Fondo superior con logo */}
      <View style={{ width: '100%', height: 140, position: 'absolute', top: 0, left: 0 }}>
        <Image
          source={require('@/assets/images/HHlogo.png')}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          resizeMode="cover"
        />
        <Image
          source={require('@/assets/images/HHLogoDisplay.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/*Imagen del personaje*/}
      <View>
        <Image
          source={require('@/assets/images/gatoautosConductor.png')}
          style={{ width: 500, height: 600, marginVertical: 16, marginTop: 100, marginLeft: 10 }}
          resizeMode="contain"
        />
          
        {/* Texto vacío */}
        <Text style={[styles.emptyText, { marginTop: -130, paddingHorizontal: 40 }]}>
          Cargando Viaje...
	</Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
  },
  subtitleCentered: {
    fontSize: 13,
    fontFamily: 'Exo-Bold',
    color: '#181718',
    textAlign: 'center',
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Exo-Bold',
    color: '#181718',
    marginTop: -4,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Exo-Bold',
    marginBottom: 2,
    color: '#181718',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Exo-Regular',
    color: '#181718',
    marginBottom: 8,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  passengerHeader: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 20,
    color: '#181718',
    textAlign: 'center',
    fontFamily: 'Exo-Regular',
    marginTop: 8,
  },
})
