import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as Font from 'expo-font';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getTripByIdRequest } from '@/interconnection/trip';
import { getPlaceByIdRequest } from '@/interconnection/place'; 
import { getVehicleByIdRequest } from '@/interconnection/vehicle';

/*Esta página muestra el detalle de un solo viaje individual
* Esto es para cumplir el requisito de tener un registro de todos los viajes hechos y que el usuario pueda ver sus propios viajes registrados
* Está generalizada, es decir que se usa en el caso de ser conductor o poasajero, esta información se le pasa por parámetro a la página
* La página se adapta dependiendo de este parámetro
* También toma como parámetro un id que corresponde al específico viaje que se está visualizando
*
* Se puede acceder a esta desde /(tabs)/Historial/historialLLeno
*
* Esta página fue trabajada por:
*	Laura Amador
*	Óscar Obando
*	Mariano Mayorga
*
*
* */

export default function detalleHistorial() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { id, isDriver } = useLocalSearchParams(); //Obtenemos la id del viaje desde los parametros y si  es o no conductor
  const isDriverBool = isDriver === "true";
  const [tripLoaded, setTripLoaded] = useState(false);
  
  const [trip, setTrip] = useState<any>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [tripDate, setTripDate] = useState<{dia: number, mes:string, ano:number, hora:string}|null>(null);
  const [passengersPickup, setPassengersPickup] = useState<{name: string, location:string, photo?:string}[]>([]);
  const [driver, setDriver] = useState<{name: string, photo?: string} | null>(null);


  useEffect(() => {
    Font.loadAsync({
      'Exo-Regular': require('@/assets/fonts/Exo-Light.otf'),
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

 
  useEffect(()=>{
    const fetchTrip = async () => {
	try {
	  //Se trae los detalles del viaje
	  const algoTrip = await getTripByIdRequest(id);
	  setTrip(algoTrip);

	  //Nos traemos al conductor
	  const algoDriver = {
	  	name: algoTrip.driver.name + " " + algoTrip.driver.firstSurname + " " + algoTrip.driver.secondSurname || "",
		photo: algoTrip.driver.photoKey
	  };
	  setDriver(algoDriver);
	  
	  //Nos traemos el vehiculo del viaje
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
          <TouchableOpacity onPress={() => router.push({
		  pathname: '/(tabs)/Historial/historialLleno',
		  params: {isDriver: isDriverBool}
	  })}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.subtitleCentered}>Viaje del {tripDate?.dia} de {tripDate?.mes} del {tripDate?.ano} a las {tripDate?.hora}</Text>
	    
	    {/*Si el usuario es el conductor se muestra el titulo de "Conductor", si no mostyramos al conductor y su foto correcpondiente*/}
	    {isDriverBool? (
		    <Text style={styles.title}>Conductor</Text>
	    ) : (
	      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>

                <Image
                  source={
			  driver.photo
			  ? {uri: driver.photo}
			  : require('@/assets/images/avatar1.png')}
                  style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8, marginLeft: 0, zIndex: 1 }}
                />
                <View>
                  <Text style={styles.subtitle}>Conductor</Text>
                  <Text style={styles.text}>{driver.name}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
	{/*Si el usuario es el conductor se muestra punto de inicio y destino, si no lo es simplemente se omite este bloque*/}
	{ isDriverBool && ( 
	  <View>
            <Text style={styles.label}>Punto de Inicio</Text>
  	    {/*No se si los lugares deberian ser: [name, description] o solo [name]*/}
            <Text style={styles.text}>{trip.startpoint.name}</Text>

            <Text style={styles.label}>Destino</Text>
            <Text style={styles.text}>{trip.endpoint.name}</Text>
          </View>
	)}
          
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

	  {/*Mostramos la foto, nombre y lugar de recogida de cada pasajero*/}
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
      <View style={{flex:1, alignItems: 'center'}}>
       <Image
        source={require('@/assets/images/gatoautosConductor.png')}
        style={{
          width: 500,
          height: 500,
          marginVertical: 16,
          marginTop: 100,
        }}
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
