import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Font from 'expo-font';
import { useAuth } from '../Context/auth-context';
import { getTripsByUserRequest } from '@/interconnection/trip';

/*Esta página muestra una lista de los viajes hechos por un usuario
* Está hecha de forma genérica de tal forma que se le pasa por parametro si se quieren ver los viajes hechos como pasajero o los hehcos como conductor
* Se puede seleccionar uno de los viajes en la lista mostrada a través del botón de "Detalles"
* Si no se encuentra ningún viaje se muestra en pantalla un mensaje indicando esto
*
* Una vez se selleciona se pasa a la página /(tabs)/Historial/detalleHistorial para mostrar el detalle del viaje seleccionado
* A dicha página se le debe pasar por parámetro si el usuario es el conductor o un pasajero
*
* Esta página puede ser accesada desde /(tabs)/HistorialMain
*
* Esta página fue trabajada por:
* 	Laura Amador
* 	Óscar Obando
* 	Mariano Mayorga
*
* */

export default function Historial() {
  const router = useRouter();
  const { user } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [viajes, setViajes] = useState<any[]>([]); 
  const { isDriver } = useLocalSearchParams();
  //Por alguna razon los parametrops son automaticamente convertidos a string
  //Entonces estoy haciendo esto
  const isDriverBool = isDriver === "true";
 
  useEffect(() => {
    Font.loadAsync({
      'Exo-Bold': require('@/assets/fonts/Exo-Bold.otf'),
      'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
      'Exo-SemiBold': require('@/assets/fonts/Exo-SemiBold.otf'),
      'exo.medium': require('@/assets/fonts/exo.medium.otf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    const fetchViajes = async () => {
      const trips = await getTripsByUserRequest(user._id, isDriverBool, "all");
      setViajes(trips);
      //console.log("Viajes del conductor:", trips);
    }
    fetchViajes();
  },[user]);

  if (!fontsLoaded) return null;

  return (
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
      <View style={styles.content}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/HistorialMain")}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.titulo}>Historial</Text>
	    {isDriverBool ? (
              <Text style={styles.subtitulo}>Conductor</Text>
	    ) : (
	      <Text style={styles.subtitulo}>Pasajero</Text>
            )
	    }
          </View>
        </View>
        
        {(viajes.length != 0)? (

        /* Lista de viajes */
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>

            {viajes.map((viaje, idx) => {
              const departureDate = new Date(viaje.departure);
              const fecha = departureDate.toLocaleDateString('es-CR');
              const hora = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <View key={idx} style={styles.card}>
                  {/* Barra lateral */}
                  <View style={styles.sideBar} />

                  {/* Texto del viaje */}
                  <View style={{ flex: 1, marginLeft: 19 }}>
                    <Text style={styles.viajeTexto}>
                      Viaje del {fecha || "ERROR"} a las {hora || "ERROR"}
                    </Text>
                  </View>

                  {/* Botón Detalles */}
                  <TouchableOpacity
                    style={styles.boton}
                    onPress={() => router.push({
			    pathname: "/(tabs)/Historial/detalleHistorial",
			    params: {id: viaje._id, isDriver: isDriver},
		    })}
                  >
                    <Text style={styles.botonTexto}>Detalles</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView> 
        ) : (
          /* Imagen del personaje */
         <View style={{ flex: 1, alignItems: 'center' }}>
  <Image
    source={require('@/assets/images/gatoautosConductor.png')}
    style={{
      width: 500,
      height: 500,
      marginVertical: 16,
      marginTop: 0,
      marginLeft: 10,
    }}
    resizeMode="contain"
  />
  { isDriverBool? (
     <Text style={[styles.emptyText, { marginTop: -130, paddingHorizontal: 40 }]}>
       No hay viajes registrados como conductor
     </Text>
  ):(
    <Text style={[styles.emptyText, { marginTop: -130, paddingHorizontal: 40 }]}>
      No hay viajes registrados como pasajero
    </Text>
  )}
  
</View> 
        )}  
      </View>
      

    </View> 
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
    marginRight: 32,
  },
  titulo: {
    fontSize: 28,
    color: '#181718',
    fontFamily: 'Exo-Bold',
  },
  subtitulo: {
    fontSize: 18,
    color: '#181718',
    marginTop: -4,
    fontFamily: 'Exo-SemiBold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFCF2',
    marginHorizontal: 24,
    marginBottom: 14,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },
  sideBar: {
    width: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#FFAB00',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  viajeTexto: {
    fontSize: 13,
    color: '#181718',
    fontFamily: 'exo.medium',
  },
  boton: {
    height: 40,
    borderWidth: 1,
    borderColor: '#FFAB00',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginLeft: 8,
    justifyContent: 'center',
  },
  botonTexto: {
    color: '#FFAB00',
    fontFamily: 'exo.medium',
    fontSize: 13,
  },
    emptyText: {
    fontSize: 20,
    color: '#181718',
    textAlign: 'center',
    fontFamily: 'Exo-Regular',
    marginTop: 8,
  },
});
